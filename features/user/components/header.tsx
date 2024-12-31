import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box } from "../../../components/ui/box";
import { router } from "expo-router";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box className="w-full my-5">
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </Pressable>
    </Box>
  );
};

export default Header;
