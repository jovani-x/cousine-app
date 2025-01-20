import { Container, Typography, useTheme } from "@mui/material";
import { isRouteErrorResponse, NavLink, useRouteError } from "react-router-dom";
import { RoutePath } from "../../router/routes.ts";

const ErrorPage = () => {
  const error = useRouteError();
  const theme = useTheme();
  const errorMessage = isRouteErrorResponse(error)
    ? error.data?.message || error.statusText
    : error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : "Unknown error";

  return (
    <Container>
      <Typography
        variant="h2"
        component="h1"
        sx={{ color: `primary.${theme.palette.mode}` }}
      >
        Error Page
      </Typography>
      <Typography>{errorMessage}</Typography>
      <NavLink
        to={RoutePath.Home}
        reloadDocument={true}
        style={{ textDecoration: "none" }}
      >
        <Typography sx={{ color: `primary.${theme.palette.mode}` }}>
          Go to Home Page
        </Typography>
      </NavLink>
    </Container>
  );
};

export default ErrorPage;
