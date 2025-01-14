import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

type InfoSlideProps = {
  icon: LucideIcon;
  title: string;
};

const InfoSlide = ({ icon, title }: InfoSlideProps) => {
  return (
    <VStack className="gap-3 mt-5">
      <HStack className="items-center gap-3">
        {React.createElement(icon, { size: 20, color: "black" })}
        <Text className="font-black">{title}</Text>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default InfoSlide;
