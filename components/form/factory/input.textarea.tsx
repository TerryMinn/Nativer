import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { FormProps } from "../input";
import { Controller, FieldValues, Path } from "react-hook-form";
import Label from "./label";
import IsInvalid from "./isInvalid";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Text } from "@/components/ui/text";
import Des from "./des";

const InputTextarea = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  errors,
  classNames = { inputC: "", labelC: "" },
  areaProps,
}: FormProps<T>) => {
  const [count, setCount] = React.useState(0);
  const { inputC, labelC } = classNames!;
  return (
    <>
      <Label labelText={label} labelC={labelC} />

      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <Textarea className={`pr-3 pl-1 ${inputC}`}>
            <TextareaInput
              onChangeText={(e) => {
                onChange(e), setCount(e.length);
              }}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
            />
          </Textarea>
        )}
      />

      <Des areaProps={areaProps} count_number={count} />

      <IsInvalid errors={errors} name={name as Path<T>} />
    </>
  );
};

export default InputTextarea;
