import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";

type EditInfoProps = {};

const EditInfo = (props: EditInfoProps) => {
  return (
    <ProfileContainer>
      <ProfileHeader />
    </ProfileContainer>
  );
};

export default EditInfo;
