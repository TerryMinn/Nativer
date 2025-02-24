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

  const { profile } = session;

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
              <ProfileLink
                path="/(profile)/account-info"
                icon={User}
                title={"Account info"}
              />
              <ProfileLink
                path="/(profile)/password-edit"
                icon={Lock}
                title={"Password settings"}
              />
              <ProfileLink
                path="/(profile)/edit-info"
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
              {new Date(session.profile.created_at!).toLocaleString("default", {
                month: "long",
              }) + " "}
              {new Date(session.profile.created_at!).getDate() + " "}
              {new Date(session.profile.created_at!).getFullYear()}
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
