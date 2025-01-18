import React, { useState } from "react";
import Container from "@/components/container";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/features/user/store/useAuthStore";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { AlertCircle, Edit, FileText, Lock, User } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPhotos } from "@/service/media.service";
import axios, { HttpStatusCode } from "axios";
import useToaster from "@/hooks/useToaster";
import { updateProfile } from "@/features/user/service/user.service";
import ProfileHeader from "@/features/profile/components/profile-header";
import { withErrorHandling } from "@/utils/error-handler";
import ProfileLink from "@/features/profile/components/profile-link";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { logout, session, setSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { profile } = session;

  const { toaster } = useToaster();

  const handlePickImage = async () => {
    setIsLoading(true);
    withErrorHandling(
      async () => {
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
      },
      toaster,
      (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.statusCode === HttpStatusCode.Unauthorized) {
            logout();
          }
        }
      }
    ).finally(() => {
      setIsLoading(false);
    });
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
            </Avatar>
            <Center>
              <Heading className="font-heading text-3xl">
                {profile.username}
              </Heading>
              <Text className="font-body text-sm">{profile.email}</Text>
            </Center>
          </Center>

          <VStack className="mt-5">
            <Text className="font-semibold text-black text-lg mb-2">
              Profile settings
            </Text>
            <VStack className="w-full  bg-white  rounded-lg">
              <ProfileLink path="/profile" icon={User} title={"Account info"} />
              <ProfileLink
                path="/profile"
                icon={Lock}
                title={"Password settings"}
              />
              <ProfileLink
                path="/profile"
                icon={Edit}
                title="Edit info"
                isDivider={false}
              />
            </VStack>
          </VStack>

          <VStack className="mt-5">
            <Text className="font-semibold text-black text-lg mb-2">
              Other settings
            </Text>
            <VStack className="w-full  bg-white  rounded-lg">
              <ProfileLink
                path="/profile"
                icon={AlertCircle}
                title={"FAQ/Support"}
              />
              <ProfileLink
                path="/profile"
                icon={FileText}
                title={"Terms and conditions"}
                isDivider={false}
              />
            </VStack>
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
