import {
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

type LabelProps = {
  labelText?: string;
  labelC?: string;
};

const Label = ({ labelText, labelC = "" }: LabelProps) => {
  return (
    <FormControlLabel>
      <FormControlLabelText className={`${labelC}`}>
        {labelText}
      </FormControlLabelText>
    </FormControlLabel>
  );
};

export default Label;
