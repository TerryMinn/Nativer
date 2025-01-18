import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";

type PasswordEditProps = {};

const PasswordEdit = (props: PasswordEditProps) => {
  return (
    <ProfileContainer>
      <ProfileHeader />
    </ProfileContainer>
  );
};

export default PasswordEdit;
