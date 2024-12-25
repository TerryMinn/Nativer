import React from "react";
import { FormProps } from "../input";
import { Controller, FieldValues, Path } from "react-hook-form";
import Label from "./label";
import IsInvalid from "./isInvalid";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

const InputCheckbox = <T extends FieldValues>({
  label,
  name = "",
  control,
  errors,
  classNames = { inputC: "", labelC: "" },
}: FormProps<T>) => {
  const { inputC, labelC, containerC } = classNames!;

  return (
    <Box className={containerC}>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CheckboxGroup value={value} onChange={(keys) => onChange(keys)}>
            <Checkbox
              className={`${inputC}`}
              size="md"
              isInvalid={false}
              isDisabled={false}
              value={name as string}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>
                <Label labelText={label} labelC={labelC} />
              </CheckboxLabel>
            </Checkbox>
          </CheckboxGroup>
        )}
      />

      <IsInvalid errors={errors} name={name as Path<T>} />
    </Box>
  );
};

export default InputCheckbox;
