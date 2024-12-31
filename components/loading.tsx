import React from "react";
import { Box } from "./ui/box";
import { ButtonSpinner } from "./ui/button";

type LoadingProps = {};

const Loading = (props: LoadingProps) => {
  return (
    <Box className="flex-1 justify-center items-center">
      <ButtonSpinner />
    </Box>
  );
};

export default Loading;
