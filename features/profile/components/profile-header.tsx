import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { X } from "lucide-react-native";

type ProfileHeaderProps = {
  main?: boolean;
  title?: string;
  btnText?: string;
  handleAction?: () => void;
};

const ProfileHeader = ({
  main = true,
  title,
  btnText,
  handleAction,
}: ProfileHeaderProps) => {
  if (main) {
    return (
      <HStack className="w-full justify-between">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
      </HStack>
    );
  } else {
    return (
      <HStack className="w-full justify-between">
        <Pressable onPress={() => router.back()}>
          <X size={24} color={"black"} />
        </Pressable>
        <Text className="font-semibold text-black">{title}</Text>
        <Pressable onPress={handleAction}>
          <Text className="text-black">{btnText}</Text>
        </Pressable>
      </HStack>
    );
  }
};

export default ProfileHeader;
