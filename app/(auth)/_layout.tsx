import React from "react";
import { router, Stack } from "expo-router";
import useAuthStore from "@/features/user/store/useAuthStore";

type AuthRootProps = {};

const AuthRoot = (props: AuthRootProps) => {
  const { session } = useAuthStore();

  if (session.isAuth) {
    router.replace("/(home)");
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthRoot;
