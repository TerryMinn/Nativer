import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Settings } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";

type ProfileHeaderProps = {};

const ProfileHeader = (props: ProfileHeaderProps) => {
  return (
    <HStack className="w-full justify-between">
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </Pressable>
      <Pressable>
        <Settings color={"black"} />
      </Pressable>
    </HStack>
  );
};

export default ProfileHeader;
