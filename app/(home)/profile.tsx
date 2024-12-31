import React from "react";
import Container from "@/components/container";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/features/user/store/useAuthStore";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { logout } = useAuthStore();
  return (
    <Container>
      <VStack>
        <Box>
          <Button
            onPress={logout}
            variant="outline"
            className="border-red-500 "
          >
            <ButtonText className="text-red-500">Sign Out</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;
