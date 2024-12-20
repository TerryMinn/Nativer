import { View, Text } from "react-native";
import React from "react";
import { FormProps } from "../input";
import {
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";

type IsInvalidProps = {} & Pick<FormProps, "errors" | "name">;

const IsInvalid = ({ errors, name }: IsInvalidProps) => {
  return (
    <FormControlError>
      <FormControlErrorText>
        {typeof errors[name]?.message === "string" ? errors[name]?.message : ""}
      </FormControlErrorText>
    </FormControlError>
  );
};

export default IsInvalid;
