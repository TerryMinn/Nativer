import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import Loading from "@/components/loading";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import InfoSlide from "@/features/profile/components/info-slide";
import { useProfileQuery } from "@/features/profile/hook/useProfileQuery";
import { router } from "expo-router";

type AccountInfoProps = {};

const AccountInfo = (props: AccountInfoProps) => {
  const { data, isLoading } = useProfileQuery();

  if (isLoading || !data) {
    return <Loading />;
  }

  const { email, name, profile } = data!.data.data;

  return (
    <ProfileContainer>
      <ProfileHeader
        main={false}
        title="Account Info"
        btnText="Edit"
        handleAction={() => {
          router.push("/(home)/(profile)/edit-info");
        }}
      />

      <Box className="w-full max-h-[230px] mt-7">
        <Image
          size="md"
          className="w-full h-full object-cover rounded-xl"
          source={
            profile?.picture
              ? { uri: profile.picture }
              : require("@/assets/images/user_placeholder.jpg")
          }
          alt="profile.png"
        />
      </Box>

      <VStack className="mt-2 space-y-3">
        <InfoSlide label="Username" value={name} />
        <InfoSlide label="Email" value={email} />
        <InfoSlide
          label="Phone"
          value={profile?.phone || "No phone number provided"}
        />

        <InfoSlide
          label="Bio"
          value={profile?.bio || "No date of birth number provided"}
          area={true}
        />
      </VStack>
    </ProfileContainer>
  );
};

export default AccountInfo;
