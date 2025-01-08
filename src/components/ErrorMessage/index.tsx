import { Alert } from "@mui/material";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Alert
      severity="error"
      variant="outlined"
      sx={{ justifyContent: "center", my: 3 }}
    >
      {error}
    </Alert>
  );
};

export default ErrorMessage;
