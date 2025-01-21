import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { ILogin, IRegister } from "../types/user.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../utils/user.schema";
import { withErrorHandling } from "@/utils/error-handler";
import { router } from "expo-router";
import useToaster from "@/hooks/useToaster";
import { loginService, registerService } from "../service/auth.service";
import { HttpStatusCode } from "axios";

export const useLoginMutate = () => {
  const { setSession } = useAuthStore();
  const { toaster } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    withErrorHandling(async () => {
      const raw = await loginService(data);
      if (raw.data.statusCode === HttpStatusCode.Created) {
        const {
          user: { profile, name, email, createdAt },
          token,
        } = raw.data.data;

        setSession({
          isAuth: true,
          token: token,
          profile: {
            picture: profile.picture,
            username: name,
            email: email,
            created_at: createdAt,
          },
        });
        router.replace("/(home)");
      }
    }, toaster).finally(() => {
      setLoading(false);
    });
  };

  return { errors, control, handleSubmit, onSubmit, loading };
};

export const useRegisterMutate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegister>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const { toaster } = useToaster();
  const selectedValues = watch("accept_rule", []);

  const onSubmit = async (data: IRegister) => {
    setLoading(true);
    withErrorHandling(async () => {
      const raw = await registerService(data);
      if ((raw.data.statusCode = HttpStatusCode.Created)) {
        router.replace("/login");
        toaster("success", "Account created successfully");
      }
    }, toaster).finally(() => {
      setLoading(false);
    });
  };

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
    loading,
    selectedValues,
  };
};
