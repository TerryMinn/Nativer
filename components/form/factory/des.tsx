import { View, Text } from "react-native";
import React from "react";
import { FormProps } from "../input";

const Des = ({
  areaProps,
  count_number,
}: {
  areaProps?: FormProps["areaProps"];
  count_number: number;
}) => {
  if (!areaProps) {
    return null;
  }

  if (areaProps.count_limit) {
    return (
      <View>
        <Text className="text-xs text-background-800 mt-1">
          {" "}
          You've used {count_number} out of {areaProps.count_limit} characters.{" "}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-xs text-background-800 mt-1">{areaProps.des}</Text>
    </View>
  );
};

export default Des;
