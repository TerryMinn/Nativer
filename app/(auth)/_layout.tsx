import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type AuthRootProps = {};

const AuthRoot = (props: AuthRootProps) => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthRoot;
