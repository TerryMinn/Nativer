import React, { useState } from "react";
import Container from "@/components/container";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/features/user/store/useAuthStore";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";
import { Upload } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { logout, session } = useAuthStore();
  const [image, setImage] = useState<string | null>(null);

  const { profile } = session;

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result);
    }
  };

  return (
    <Container>
      <VStack className="justify-between h-full">
        {/* Profile */}
        <VStack className="mt-10">
          <Center className="gap-2">
            <Avatar size="xl">
              <AvatarFallbackText>Jane Doe</AvatarFallbackText>
              <AvatarImage
                source={
                  profile?.picture
                    ? { uri: profile.picture }
                    : require("@/assets/images/user_placeholder.jpg")
                }
              />
              <Pressable
                onPress={handlePickImage}
                className="absolute bottom-0 right-1"
              >
                <Box className="bg-white p-1 rounded-full border border-gray-400">
                  <Upload color={"black"} size={12} />
                </Box>
              </Pressable>
            </Avatar>
            <Center>
              <Heading className="font-heading text-3xl">
                {profile.username}
              </Heading>
              <Text className="font-body text-sm">{profile.email}</Text>
            </Center>
          </Center>
        </VStack>
        {/* Sign Out */}
        <Box>
          <Button
            onPress={logout}
            variant="solid"
            className="bg-black rounded-full h-14"
          >
            <ButtonText className="text-white text-lg">Sign Out</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;
