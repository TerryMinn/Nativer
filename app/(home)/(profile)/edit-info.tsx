import React, { useEffect, useState } from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import KeyboardAvoidingBox from "@/components/keyboard-avoiding-box";
import { Box } from "lucide-react-native";
import { useProfileQuery } from "@/features/profile/hook/useProfileQuery";
import Loading from "@/components/loading";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  useInfoEdit,
  usePictureMutate,
} from "@/features/profile/hook/useProfileMutate";
import Input from "@/components/form/input";
import * as ImagePicker from "expo-image-picker";
import { withErrorHandling } from "@/utils/error-handler";
import { uploadPhotos } from "@/service/media.service";
import axios, { HttpStatusCode } from "axios";
import useToaster from "@/hooks/useToaster";
import useAuthStore from "@/features/user/store/useAuthStore";

type EditInfoProps = {};

const EditInfo = (props: EditInfoProps) => {
  const { control, data, errors, handleSubmit, isLoading, onSubmit, setValue } =
    useInfoEdit();
  const { handlePickImage, tempImg, isUploadLoading } =
    usePictureMutate(setValue);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <ProfileContainer>
      <KeyboardAvoidingBox>
        <ProfileHeader
          main={false}
          title="Edit Info"
          btnText="Save"
          handleAction={handleSubmit(onSubmit)}
        />

        <VStack className="w-full max-h-[230px] mt-7 relative">
          <Image
            size="md"
            className="w-full h-full object-cover rounded-xl"
            source={
              tempImg
                ? { uri: tempImg }
                : require("@/assets/images/user_placeholder.jpg")
            }
            alt="profile.png"
            blurRadius={isUploadLoading ? 20 : 0}
          />
          {isUploadLoading && (
            <Center className="absolute w-full h-full top-0 left-0">
              <ButtonSpinner />
            </Center>
          )}
        </VStack>

        <Center className="mt-3">
          <Button onPress={handlePickImage}>
            <ButtonText>Change picture</ButtonText>
          </Button>
        </Center>

        <VStack className="mt-5 " space="xl">
          <Input
            errors={errors}
            control={control}
            name="first_name"
            label="First name"
            placeholder="Enter your first name"
            type="text"
            classNames={{ inputC: "border-background-200 rounded-lg" }}
          />
          <Input
            errors={errors}
            control={control}
            name="last_name"
            label="Last name"
            placeholder="Enter your last name"
            type="text"
            classNames={{ inputC: "border-background-200 rounded-lg" }}
          />
          <Input
            errors={errors}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
            classNames={{ inputC: "border-background-200 rounded-lg" }}
          />

          <Input
            errors={errors}
            control={control}
            name="phone"
            label="Phone"
            placeholder="Enter your phone"
            type="text"
            classNames={{ inputC: "border-background-200 rounded-lg" }}
          />

          <Input
            errors={errors}
            control={control}
            name="bio"
            label="Bio"
            placeholder="Enter your bio"
            type="textarea"
            areaProps={{ count_limit: 100 }}
            classNames={{ inputC: "border-background-200 rounded-lg" }}
          />
        </VStack>
      </KeyboardAvoidingBox>
    </ProfileContainer>
  );
};

export default EditInfo;
