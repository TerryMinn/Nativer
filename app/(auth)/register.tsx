import Container from "@/components/container";
import Input from "@/components/form/input";
import KeyboardAvoidingBox from "@/components/keyboard-avoiding-box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Header from "@/features/user/components/header";
import { registerService } from "@/features/user/service/auth.service";
import useAuthStore from "@/features/user/store/useAuthStore";
import { IRegister } from "@/features/user/types/user.type";
import { registerSchema } from "@/features/user/utils/schema";
import useToaster from "@/hooks/useToaster";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { HttpStatusCode } from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import colors from "tailwindcss/colors";

const Register = () => {
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
    try {
      const raw = await registerService(data);
      if ((raw.data.statusCode = HttpStatusCode.Created)) {
        router.replace("/login");
        toaster("success", "Account created successfully");
      }
    } catch (errors) {
      if (axios.isAxiosError(errors)) {
        toaster("error", errors.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingBox>
        <VStack className="h-full  justify-between">
          <VStack className=" h-full ">
            <Header />
            <Heading size="xl" className="mt-5 mb-8">
              Create your account
            </Heading>

            <VStack className="flex-1 justify-between">
              <VStack space="xl">
                <Input
                  errors={errors}
                  name="first_name"
                  control={control}
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                />

                <Input
                  errors={errors}
                  name="last_name"
                  control={control}
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                />

                <Input
                  errors={errors}
                  name="email"
                  control={control}
                  label="Email"
                  placeholder="Email address"
                  type="text"
                />

                <Input
                  errors={errors}
                  name="password"
                  control={control}
                  label="Password"
                  placeholder="Minimum 8 characters"
                  type="password"
                />

                <Input
                  type="checkbox"
                  classNames={{ containerC: "mt-3" }}
                  errors={errors}
                  name="accept_rule"
                  control={control}
                  label={"I agree to the Terms and Conditions"}
                />
              </VStack>

              <VStack>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  className="h-16 rounded-full mt-3"
                  isDisabled={selectedValues.length === 0}
                >
                  {loading && <ButtonSpinner color={colors.gray[400]} />}
                  <ButtonText className="text-lg">Continue</ButtonText>
                </Button>

                <Text className="text-sm text-center mt-3">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <LinkText className="text-sm no-underline">
                    Privacy Policy
                  </LinkText>{" "}
                  an <LinkText className="text-sm no-underline">Terms</LinkText>{" "}
                  of Service apply.
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </KeyboardAvoidingBox>
    </Container>
  );
};

export default Register;
