import React from "react";
import { Slot, Stack } from "expo-router";

type ProfileLayoutProps = {};

const ProfileLayout = (props: ProfileLayoutProps) => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ProfileLayout;
