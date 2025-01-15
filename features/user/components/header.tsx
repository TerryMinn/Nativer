import { Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box } from "../../../components/ui/box";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Platform, Linking, BackHandler } from "react-native";

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();

  const handleBack = () => {
    const routes = navigation.getState()?.routes!; // Get the navigation stack
    const previousRoute = routes[routes.length - 2];

    if (previousRoute) {
      router.back();
    } else {
      if (Platform.OS === "android") {
        BackHandler.exitApp();
      } else {
        return;
        // Yes Ios can't exit app from programatically
      }
    }
  };

  return (
    <Box className="w-full my-5">
      <Pressable onPress={handleBack}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </Pressable>
    </Box>
  );
};

export default Header;
