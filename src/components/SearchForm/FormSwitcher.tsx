import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export const FormSwitcher = ({
  label,
  name,
  isChecked = false,
  onClick,
}: {
  label: string;
  name: string;
  isChecked?: boolean;
  onClick: () => void;
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={isChecked} onClick={onClick} name={name} />}
        label={label}
      />
    </FormGroup>
  );
};
