import React from "react";
import Container from "@/components/container";
import Header from "@/module/user/components/header";
import { Heading } from "@/components/ui/heading";
import { useForm, Controller } from "react-hook-form";
import { ILogin } from "@/module/user/types/user";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/module/user/utils/schema";
import Input from "@/components/form/input";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILogin) => {
    console.log(data);
  };

  return (
    <Container>
      <Header />
      <Heading size="xl">Sign In to your account</Heading>

      {/* Login Panel */}

      <VStack space="xl">
        <Input<ILogin>
          errors={errors}
          control={control}
          name="email"
          type="email"
          placeholder="you@exmample.com"
          label="Email"
        />

        <Input<ILogin>
          errors={errors}
          control={control}
          name="password"
          type="password"
          placeholder="Atleast 8 characters"
          label="Password"
        />

        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Sign In</ButtonText>
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;
