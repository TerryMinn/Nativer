import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Box } from "../ui/box";
import { FormControl } from "../ui/form-control";
import InputText from "./factory/input.text";
import InputPassword from "./factory/input.password";

// Make FormProps generic
export type FormProps<T extends FieldValues = FieldValues> = {
  type?: "text" | "password" | "email";
  label?: string;
  errors: FieldErrors<T>;
  control?: Control<T>;
  name: keyof T;
  placeholder?: string;
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
