import React from "react";
import { Box } from "./ui/box";
import { ButtonSpinner } from "./ui/button";
import { Center } from "./ui/center";
import { ActivityIndicator } from "react-native";

type LoadingProps = {};

const Loading = (props: LoadingProps) => {
  return (
    <Center className="flex-1">
      <ActivityIndicator size={"large"} />
    </Center>
  );
};

export default Loading;
