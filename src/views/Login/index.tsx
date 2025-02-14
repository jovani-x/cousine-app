import Typography from "@mui/material/Typography";
import { LoginForm } from "../../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        {"Login"}
      </Typography>
      <LoginForm />
    </>
  );
};

export default LoginPage;
