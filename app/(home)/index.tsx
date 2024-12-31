import { View, Text } from "react-native";
import React from "react";
import Container from "@/components/container";
import useAuthStore from "@/features/user/store/useAuthStore";

type HomeProps = {};

const Home = (props: HomeProps) => {
  const { session } = useAuthStore();
  return (
    <Container>
      <View>
        <Text>Home {session.profile.username}</Text>
      </View>
    </Container>
  );
};

export default Home;
