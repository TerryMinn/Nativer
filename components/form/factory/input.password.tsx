import React, { useState } from "react";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { FormProps } from "../input";
import { Controller, FieldValues, Path } from "react-hook-form";
import Label from "./label";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import IsInvalid from "./isInvalid";

const InputPassword = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  errors,
  classNames = { inputC: "", labelC: "" },
}: FormProps<T>) => {
  const { inputC, labelC } = classNames!;

  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Label labelText={label} />

      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input className={`pr-3 pl-1 h-12 ${inputC}`}>
            <InputField
              onChangeText={onChange}
              onBlur={onBlur}
              type={show ? "text" : "password"}
              value={value}
              placeholder={placeholder}
            />

            <InputSlot onPress={setShow.bind(null, !show)}>
              <FontAwesome5
                name={show ? "eye" : "eye-slash"}
                size={18}
                color="black"
              />
            </InputSlot>
          </Input>
        )}
      />

      <IsInvalid errors={errors} name={name as Path<T>} />
    </>
  );
};

export default InputPassword;
