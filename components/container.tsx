import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "./ui/box";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <Box className="flex-1 px-5 pt-3">{children}</Box>
    </SafeAreaView>
  );
};

export default Container;
