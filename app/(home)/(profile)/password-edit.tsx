import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import { VStack } from "@/components/ui/vstack";
import Input from "@/components/form/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import KeyboardAvoidingBox from "@/components/keyboard-avoiding-box";
import { usePasswordEdit } from "@/features/profile/hook/useProfileMutate";

type PasswordEditProps = {};

const PasswordEdit = (props: PasswordEditProps) => {
  const { control, errors, handleSubmit, isLoading, onSubmit } =
    usePasswordEdit();

  return (
    <ProfileContainer>
      <KeyboardAvoidingBox>
        <ProfileHeader main={false} title="Change Password" />

        <VStack className="flex-1 justify-between py-5">
          <VStack className="mt-7" space="xl">
            <Input
              errors={errors}
              control={control}
              name="old_password"
              label="Old Password"
              placeholder="Confirm your old password"
              type="password"
              classNames={{ inputC: "border-background-200 rounded-lg" }}
            />

            <Input
              errors={errors}
              control={control}
              name="new_password"
              label="New Password"
              placeholder="Atleast 8 characters"
              type="password"
              classNames={{ inputC: "border-background-200 rounded-lg" }}
            />
          </VStack>

          <Button onPress={handleSubmit(onSubmit)} className="h-12 bg-black">
            <ButtonText>Save</ButtonText>
            {isLoading && <ButtonSpinner />}
          </Button>
        </VStack>
      </KeyboardAvoidingBox>
    </ProfileContainer>
  );
};

export default PasswordEdit;
