import React, { useCallback } from "react";
import Container from "@/components/container";
import { useFocusEffect, useNavigation } from "expo-router";

type ProfileContainerProps = {
  children: React.ReactNode;
};

const ProfileContainer = ({ children }: ProfileContainerProps) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "flex",
            backgroundColor: "#f8f8f8",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            paddingTop: 10,
            height: 85,
          },
        });
      };
    }, [navigation])
  );

  return <Container>{children}</Container>;
};

export default ProfileContainer;
