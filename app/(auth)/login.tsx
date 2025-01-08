import React, { useState } from "react";
import Container from "@/components/container";
import Header from "@/features/user/components/header";
import { Heading } from "@/components/ui/heading";
import { useForm } from "react-hook-form";
import { ILogin } from "@/features/user/types/user.type";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/user/utils/schema";
import Input from "@/components/form/input";
import { HStack } from "@/components/ui/hstack";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import KeyboardAvoidingBox from "@/components/keyboard-avoiding-box";
import { loginService } from "@/features/user/service/auth.service";
import colors from "tailwindcss/colors";
import axios, { HttpStatusCode } from "axios";
import useToaster from "@/hooks/useToaster";
import useAuthStore from "@/features/user/store/useAuthStore";

const Login = () => {
  const { setSession } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const { toaster } = useToaster();

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    try {
      const raw = await loginService(data);
      if (raw.data.statusCode === HttpStatusCode.Created) {
        const {
          user: { profile, name, email },
          token,
        } = raw.data.data;
        setSession({
          isAuth: true,
          token: token,
          profile: {
            picture: profile.picture,
            username: name,
            email: email,
          },
        });
        router.replace("/(home)");
      }
    } catch (errors) {
      console.log(errors);
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
          <VStack>
            <Header />
            <Heading size="xl" className="mt-5 mb-8">
              Sign In to your account
            </Heading>
            <VStack space="xl">
              <Input
                errors={errors}
                control={control}
                name="email"
                type="email"
                placeholder="you@exmample.com"
                label="Email"
              />

              <Input
                errors={errors}
                control={control}
                name="password"
                type="password"
                placeholder="Atleast 8 characters"
                label="Password"
              />

              <Button
                className="h-14 rounded-lg mt-3"
                onPress={handleSubmit(onSubmit)}
              >
                {loading && <ButtonSpinner color={colors.gray[400]} />}
                <ButtonText>Sign In</ButtonText>
              </Button>
            </VStack>
            <HStack className="justify-between mt-5">
              <Link>
                <LinkText className="no-underline text-sm">
                  Privacy and Policy
                </LinkText>
              </Link>

              <Link>
                <LinkText className="no-underline text-sm">
                  Forgot password?
                </LinkText>
              </Link>
            </HStack>
          </VStack>

          <VStack>
            <Text className="font-heading uppercase text-center">Or</Text>
            <Button
              onPress={() => {
                router.push("/register");
              }}
              className="h-14 rounded-lg mt-3 bg-neutral-200 "
            >
              <ButtonText className="text-black">Create an account</ButtonText>
            </Button>

            <Text className="text-sm text-center mt-3">
              This site is protected by reCAPTCHA and the Google{" "}
              <LinkText className="text-sm no-underline">
                Privacy Policy
              </LinkText>{" "}
              an <LinkText className="text-sm no-underline">Terms</LinkText> of
              Service apply.
            </Text>
          </VStack>
        </VStack>
      </KeyboardAvoidingBox>
    </Container>
  );
};

export default Login;
