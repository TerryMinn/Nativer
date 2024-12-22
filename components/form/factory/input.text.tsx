import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { FormProps } from "../input";
import { Controller, FieldValues, Path } from "react-hook-form";
import Label from "./label";
import IsInvalid from "./isInvalid";

const InputText = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  errors,
  classNames = { inputC: "", labelC: "" },
}: FormProps<T>) => {
  const { inputC, labelC } = classNames!;
  return (
    <>
      <Label labelText={label} labelC={labelC} />

      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input className={`pr-3 pl-1 h-12 ${inputC}`}>
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
