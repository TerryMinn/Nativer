import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = (props: {}) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="font-heading text-9xl text-[#09090B]">V</Text>
      <Button onPress={() => router.push("/login")}>
        <ButtonText>Let's Start 🚀</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default Home;
