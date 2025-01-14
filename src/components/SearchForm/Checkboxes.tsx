import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { InputChangeType } from "../../types/forms";

export const Checkboxes = ({
  enumObj,
  state,
  onChange,
}: {
  enumObj: Record<string, unknown>;
  state: Record<string, boolean>;
  onChange: (event: InputChangeType) => void;
}) => {
  const renderedCheckboxes = Object.keys(enumObj).map((key) => {
    const name = key;
    const value = state[name];
    const label = `${enumObj[key as keyof typeof enumObj]}`;

    return (
      <FormControlLabel
        key={key}
        label={label}
        control={<Checkbox name={name} checked={value} onChange={onChange} />}
      />
    );
  });

  return <FormGroup row>{renderedCheckboxes}</FormGroup>;
};
