import {
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

type LabelProps = {
  labelText?: string;
};

const Label = ({ labelText }: LabelProps) => {
  return (
    <FormControlLabel>
      <FormControlLabelText>{labelText}</FormControlLabelText>
    </FormControlLabel>
  );
};

export default Label;
