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
import { Alert, Pressable } from "react-native";
import { Upload } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPhotos } from "@/service/media.service";
import axios, { HttpStatusCode } from "axios";
import useToaster from "@/hooks/useToaster";
import { updateProfile } from "@/features/user/service/user.service";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { logout, session, setSession } = useAuthStore();

  const { profile } = session;

  const { toaster } = useToaster();

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const formData = new FormData();

        console.log(result.assets[0].uri.split("/").pop());

        formData.append("file", {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].uri.split("/").pop(),
        } as unknown as Blob);

        const { data } = await uploadPhotos(formData);

        if (data.statusCode === HttpStatusCode.Ok) {
          // @TODO: gender and dateofbirth for profile setting up
          const profile = {
            // gender: session.profile.gender,
            // date_of_birth: session.profile.date_of_birth,
            picture: data.data.original,
          };

          const res = await updateProfile({ profile });

          if (res.data.statusCode === HttpStatusCode.Created) {
            setSession({
              ...session,
              profile: {
                ...session.profile,
                picture: data.data.original,
              },
            });
            toaster("success", "Profile updated successfully");
          }
        }
      }
    } catch (errors) {
      if (axios.isAxiosError(errors)) {
        console.log(errors.response?.data.message);
        toaster("error", errors.response?.data.message);
      }
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
