import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

export const LoginForm = ({
  callback,
}: {
  callback?: (args?: unknown) => unknown;
}) => {
  const { authentication } = useAuth();
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    common: "",
  });

  const boxSx = {
    width: 400,
    maxWidth: "100%",
    my: 2,
    mx: "auto",
  };
  const inputAttrs = {
    fullWidth: true,
    margin: "dense" as const,
    variant: "outlined" as const,
    required: true,
  };
  const buttonSx = { flexGrow: { xs: 1, md: 0 }, mt: 2 };

  const renderedName = (
    <TextField
      {...inputAttrs}
      label="Email"
      name="email"
      error={!!formErrors.email}
      helperText={!!formErrors.email && formErrors.email}
    />
  );
  const renderedPasswd = (
    <TextField
      {...inputAttrs}
      label="Password"
      name="password"
      type="password"
      error={!!formErrors.password}
      helperText={!!formErrors.password && formErrors.password}
    />
  );

  const renderedSubmit = (
    <Button variant="contained" color="primary" sx={buttonSx} type="submit">
      Login
    </Button>
  );

  const validateForm = (data: { [k: string]: FormDataEntryValue }) => {
    const email = String(data.email);
    const password = String(data.password);

    if (!email) {
      setFormErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      return false;
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!password) {
      setFormErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    } else {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }

    if (password?.length < 5) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be at least 5 characters long",
      }));
      return false;
    } else {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fdata = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries([...fdata.entries()]);
    const { email, password } = data;

    if (!validateForm(data)) {
      setFormErrors((prev) => ({ ...prev, common: "" }));
      return false;
    }

    try {
      const session = await authentication.signIn({
        authData: {
          email: String(email),
          password: String(password),
        },
      });

      if (!session) {
        throw Error("Wrong credentials");
      } else {
        setFormErrors((prev) => ({ ...prev, common: "" }));
        callback?.();
      }
    } catch (err) {
      const commonErr = "Something went wrong";

      setFormErrors((prev) => ({
        ...prev,
        common: isAxiosError(err)
          ? err?.response?.data?.message || commonErr
          : err instanceof Error
          ? err.message || commonErr
          : err || commonErr,
      }));
    }
  };

  return (
    <Box sx={boxSx}>
      <form onSubmit={handleLogin} style={{ textAlign: "center" }} noValidate>
        {renderedName}
        {renderedPasswd}
        {renderedSubmit}
      </form>
      {!!formErrors.common && (
        <Alert severity="error" sx={{ my: 2, justifyContent: "center" }}>
          {formErrors.common}
        </Alert>
      )}
    </Box>
  );
};
