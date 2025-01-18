import React from "react";
import ProfileContainer from "@/features/profile/components/profile-container";
import ProfileHeader from "@/features/profile/components/profile-header";
import useSWR from "swr";
import api_client from "@/service/api-service";
import Loading from "@/components/loading";
import { IProfile } from "@/features/user/types/user.type";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import InfoSlide from "@/features/profile/components/info-slide";

type AccountInfoProps = {};

const AccountInfo = (props: AccountInfoProps) => {
  const { isLoading, data } = useSWR<IProfile>("/user/profile", api_client);

  if (isLoading) {
    return <Loading />;
  }

  const {
    data: { email, name, profile },
  } = data!.data;

  return (
    <ProfileContainer>
      <ProfileHeader main={false} title="Account Info" btnText="Edit" />

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
        <InfoSlide
          label="Phone"
          value={profile?.phone || "No phone number provided"}
        />
        <InfoSlide
          label="Date Of Birth"
          value={profile?.date_of_birth || "No date of birth number provided"}
        />
        <InfoSlide
          label="Bio"
          value={profile?.date_of_birth || "No date of birth number provided"}
          area={true}
        />
      </VStack>
    </ProfileContainer>
  );
};

export default AccountInfo;
