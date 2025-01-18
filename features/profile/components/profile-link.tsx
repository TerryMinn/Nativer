import { Text } from "@/components/ui/text";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Pressable } from "react-native";
import { router, RelativePathString } from "expo-router";

type InfoSlideProps = {
  icon: LucideIcon;
  title: string;
  path: string;
  isDivider?: boolean;
};

const ProfileLink = ({
  icon,
  title,
  path,
  isDivider = true,
}: InfoSlideProps) => {
  return (
    <Pressable onPress={() => router.push(path as RelativePathString)}>
      <VStack className="mt-5 ">
        <HStack className=" gap-3  px-5">
          {React.createElement(icon, { size: 20, color: "black" })}
          <VStack className="flex-1 gap-5">
            <HStack className="justify-between">
              <Text className="font-semibold">{title}</Text>
              <ChevronRight color={"black"} />
            </HStack>
            {isDivider ? <Divider className="" /> : <Box />}
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default ProfileLink;
