import React from "react";
import { Stack } from "expo-router";

type ProfileLayoutProps = {};

const ProfileLayout = (props: ProfileLayoutProps) => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="account-info"
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="password-edit"
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="edit-info"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default ProfileLayout;
