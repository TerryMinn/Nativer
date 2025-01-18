import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

type InfoSlideProps = { label: string; value: string; area?: boolean };

const InfoSlide = ({ label, value, area = false }: InfoSlideProps) => {
  return (
    <VStack className="mt-5">
      <Text className="font-semibold mb-1">{label}</Text>
      <Box
        className={`border border-background-200 rounded-lg px-2 py-3 
        }`}
        style={{ height: !area ? "auto" : 100 }}
      >
        <Text>{value}</Text>
      </Box>
    </VStack>
  );
};

export default InfoSlide;
