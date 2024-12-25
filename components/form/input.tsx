import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Box } from "../ui/box";
import { FormControl } from "../ui/form-control";
import InputText from "./factory/input.text";
import InputPassword from "./factory/input.password";
import InputCheckbox from "./factory/input.checkbox";

// Make FormProps generic
export type FormProps<T extends FieldValues = FieldValues> = {
  type?: "text" | "password" | "email" | "checkbox";
  label?: string;
  errors: FieldErrors<T>;
  control?: Control<T>;
  name: keyof T;
  placeholder?: string;
  classNames?: {
    inputC?: string;
    labelC?: string;
    errorC?: string;
    containerC?: string;
  };
};

const Input = <T extends FieldValues>({
  errors,
  name,
  type,
  ...formProps
}: FormProps<T>) => {
  const renderInput = ({ type, ...props }: FormProps<T>) => {
    switch (type) {
      case "password":
        return <InputPassword {...props} />;
      case "checkbox":
        return <InputCheckbox {...props} />;
      default:
        return <InputText {...props} />;
    }
  };

  return (
    <Box>
      <FormControl isInvalid={!!errors[name.toString()]}>
        {renderInput({ type, errors, name, ...formProps })}
      </FormControl>
    </Box>
  );
};

export default Input;
