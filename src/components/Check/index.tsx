import { useTheme } from "@mui/material";

export const Check = ({ value }: { value: boolean }) => {
  const theme = useTheme();
  const color = value ? theme.palette.success.main : theme.palette.error.main;

  return (
    <span style={{ color }} aria-label={value ? "Yes" : "No"}>
      {value ? "✔" : "✘"}
    </span>
  );
};
