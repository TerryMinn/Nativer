import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import { VStack } from "@/components/ui/vstack";
import { useForm } from "react-hook-form";
import { IPasswordEdit } from "@/features/profile/types/profile.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordEditSchema } from "@/features/profile/utils/schema";
import Input from "@/components/form/input";

type PasswordEditProps = {};

const PasswordEdit = (props: PasswordEditProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordEdit>({
    defaultValues: { ConfirmPassword: "", NewPassword: "" },
    resolver: zodResolver(passwordEditSchema),
  });

  return (
    <ProfileContainer>
      <ProfileHeader
        main={false}
        title="Change Password"
        btnText="Save"
        handleAction={() => {}}
      />

      <VStack className="mt-2" space="xl"></VStack>
    </ProfileContainer>
  );
};

export default PasswordEdit;
