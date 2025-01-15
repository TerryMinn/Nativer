import React, { useState } from "react";
import Container from "@/components/container";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/features/user/store/useAuthStore";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Alert, Pressable } from "react-native";
import { Mail, Newspaper, Phone, Upload, User } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPhotos } from "@/service/media.service";
import axios, { HttpStatusCode } from "axios";
import useToaster from "@/hooks/useToaster";
import { updateProfile } from "@/features/user/service/user.service";
import ProfileHeader from "@/features/profile/components/profile-header";
import InfoSlide from "@/features/profile/components/info-slide";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { logout, session, setSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { profile } = session;

  const { toaster } = useToaster();

  const handlePickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const formData = new FormData();

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ProfileHeader />
      <VStack className="justify-between h-full">
        {/* Profile */}
        <VStack className="mt-10">
          <Center className="gap-2">
            <Avatar size="2xl">
              <AvatarFallbackText>{profile.username}</AvatarFallbackText>
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
                {isLoading ? (
                  <Box className="bg-white p-3 rounded-full border border-gray-400">
                    <ButtonSpinner size={1} />
                  </Box>
                ) : (
                  <Box className="bg-white p-1 rounded-full border border-gray-400">
                    <Upload color={"black"} size={14} />
                  </Box>
                )}
              </Pressable>
            </Avatar>
            <Center>
              <Heading className="font-heading text-3xl">
                {profile.username}
              </Heading>
              <Text className="font-body text-sm">{profile.email}</Text>
            </Center>
          </Center>

          <VStack className="mt-5">
            <InfoSlide
              icon={Newspaper}
              title={"This user hasn't added a bio yet."}
            />
            <InfoSlide icon={User} title={profile.username as string} />
            <InfoSlide icon={Mail} title={profile.email as string} />
            <InfoSlide icon={Phone} title={"Add your phone number"} />
          </VStack>
        </VStack>
        {/* Sign Out */}
        <Box>
          <Center>
            <Text className="text-sm font-light">
              Joined on{" "}
              {new Date().toLocaleString("default", { month: "long" }) + " "}
              {new Date().getDate() + " "}
              {new Date().getFullYear()}
            </Text>
          </Center>
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
