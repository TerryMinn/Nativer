import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { FormProps } from "../input";
import { Controller, FieldValues, Path } from "react-hook-form";
import Label from "./label";
import IsInvalid from "./IsInvalid";

const InputText = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  errors,
}: FormProps<T>) => {
  return (
    <>
      <Label labelText={label} />

      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input>
            <InputField
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
            />
          </Input>
        )}
      />

      <IsInvalid errors={errors} name={name as Path<T>} />
    </>
  );
};

export default InputText;
