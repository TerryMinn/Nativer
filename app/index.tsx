import Container from "@/components/container";
import { ButtonSpinner } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import React from "react";

const Home = (props: {}) => {
  return (
    <Container>
      <Center className="h-full">
        <ButtonSpinner />
      </Center>
    </Container>
  );
};

export default Home;
