import useAuthStore from "@/features/user/store/useAuthStore";
import useToaster from "@/hooks/useToaster";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { IPasswordEdit, IProfileEdit } from "../types/profile.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { infoEditSchema, passwordEditSchema } from "../utils/profile.schema";
import { changePassword, editInfo } from "../service/profile.service";
import { router } from "expo-router";
import { HttpStatusCode, isAxiosError } from "axios";
import { useProfileQuery } from "./useProfileQuery";
import { Alert } from "react-native";
import { withErrorHandling } from "@/utils/error-handler";
import { uploadPhotos } from "@/service/media.service";
import * as ImagePicker from "expo-image-picker";

export const usePasswordEdit = () => {
  const ploice = useProfileQuery();
  const { logout } = useAuthStore();
  const { toaster } = useToaster();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordEdit>({
    defaultValues: { new_password: "", old_password: "" },
    resolver: zodResolver(passwordEditSchema),
  });

  const onSubmit = async (data: IPasswordEdit) => {
    setIsLoading(true);
    withErrorHandling(
      async () => {
        const res = await changePassword(data);
        console.log(res.data);
        if (res.data.statusCode === HttpStatusCode.Created) {
          router.back();
        }
      },
      toaster,
      (errors) => {
        if (isAxiosError(errors)) {
          if (
            errors.response?.data.statusCode === HttpStatusCode.Unauthorized
          ) {
            logout();
          }
        }
      }
    ).finally(() => {
      setIsLoading(false);
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  };
};

export const useInfoEdit = () => {
  const { logout } = useAuthStore();
  const { data, isLoading: ProfileLoading } = useProfileQuery();
  const { toaster } = useToaster();
  const { setSession, session } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(ProfileLoading);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IProfileEdit>({
    defaultValues: {
      bio: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      picture: "",
    },
    resolver: zodResolver(infoEditSchema),
  });

  const onSubmit: SubmitHandler<IProfileEdit> = async (data: IProfileEdit) => {
    setIsLoading(true);
    withErrorHandling(
      async () => {
        const payload = {
          name: data.first_name + " " + data.last_name,
          email: data.email,
          profile: {
            bio: data.bio,
            phone: data.phone,
            picture: data.picture,
          },
        };

        const res = await editInfo(payload);
        if (res.data.statusCode === HttpStatusCode.Created) {
          router.back();
          setSession({
            ...session,
            profile: {
              ...session.profile,
              picture: data.picture,
            },
          });
        }
      },
      toaster,
      (errors) => {
        if (isAxiosError(errors)) {
          if (
            errors.response?.data.statusCode === HttpStatusCode.Unauthorized
          ) {
            logout();
          }
        }
      }
    ).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    reset({
      bio: data?.data.data.profile?.bio,
      email: data?.data.data.email,
      first_name: data?.data.data.name.split(" ")[0],
      last_name: data?.data.data.name.split(" ")[1],
      phone: data?.data.data.profile?.phone,
    });
  }, [reset]);

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    data,
    setValue,
  };
};

export const usePictureMutate = (setValue: UseFormSetValue<IProfileEdit>) => {
  const { logout } = useAuthStore();
  const [tempImg, setTempImg] = useState<string | null>();
  const { data } = useProfileQuery();
  const { toaster } = useToaster();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data?.data) {
      setTempImg(data?.data.data.profile?.picture);
    }
  }, [data]);

  const handlePickImage = async () => {
    setIsUploadLoading(true);

    withErrorHandling(
      async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images", "videos"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          const formData = new FormData();
          formData.append("file", {
            name: "file",
            type: "image/jpeg",
            uri: result.assets[0].uri,
          } as unknown as Blob);

          const res = await uploadPhotos(formData);

          if (res.data.statusCode === HttpStatusCode.Ok) {
            setTempImg(res.data.data.original);
            setValue("picture", res.data.data.original, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
      },
      toaster,
      (error) => {
        if (isAxiosError(error)) {
          if (error.response?.data.statusCode === HttpStatusCode.Unauthorized) {
            logout();
          }
        }
      }
    ).finally(() => {
      setIsUploadLoading(false);
    });
  };

  return {
    handlePickImage,
    isUploadLoading,
    tempImg,
  };
};
