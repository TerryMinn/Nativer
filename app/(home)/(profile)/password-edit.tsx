import React, { useState } from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import { VStack } from "@/components/ui/vstack";
import { useForm } from "react-hook-form";
import { IPasswordEdit } from "@/features/profile/types/profile.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordEditSchema } from "@/features/profile/utils/profile.schema";
import Input from "@/components/form/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import KeyboardAvoidingBox from "@/components/keyboard-avoiding-box";
import { Alert } from "react-native";
import { changePassword } from "@/features/profile/service/profile.service";
import { HttpStatusCode, isAxiosError } from "axios";
import useToaster from "@/hooks/useToaster";
import useAuthStore from "@/features/user/store/useAuthStore";
import { router } from "expo-router";

type PasswordEditProps = {};

const PasswordEdit = (props: PasswordEditProps) => {
  const { toaster } = useToaster();
  const { logout } = useAuthStore();
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
    try {
      const res = await changePassword(data);
      console.log(res.data);
      if (res.data.statusCode === HttpStatusCode.Created) {
        router.back();
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.data.statusCode === HttpStatusCode.BadRequest) {
          toaster("error", e.response?.data.message);
        } else if (
          e.response?.data.statusCode === HttpStatusCode.Unauthorized
        ) {
          logout();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <KeyboardAvoidingBox>
        <ProfileHeader main={false} title="Change Password" />

        <VStack className="flex-1 justify-between py-5">
          <VStack className="mt-7" space="xl">
            <Input
              errors={errors}
              control={control}
              name="old_password"
              label="Old Password"
              placeholder="Confirm your old password"
              type="password"
              classNames={{ inputC: "border-background-200 rounded-lg" }}
            />

            <Input
              errors={errors}
              control={control}
              name="new_password"
              label="New Password"
              placeholder="Atleast 8 characters"
              type="password"
              classNames={{ inputC: "border-background-200 rounded-lg" }}
            />
          </VStack>

          <Button onPress={handleSubmit(onSubmit)} className="h-12 bg-black">
            <ButtonText>Save</ButtonText>
            {isLoading && <ButtonSpinner />}
          </Button>
        </VStack>
      </KeyboardAvoidingBox>
    </ProfileContainer>
  );
};

export default PasswordEdit;
