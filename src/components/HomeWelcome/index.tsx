import { Link, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getUserName } from "../../auth/utils";
import { RoutePath } from "../../router/routes";

export const HomeWelcome = () => {
  const theme = useTheme();
  const color = theme.palette.primary[theme.palette.mode];
  const userName = getUserName() ?? "anonymous";

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mb: 0, color }}>
        Welcome, {userName}!
      </Typography>
      <Typography>
        Below, you can see information about your recipe collection, get a
        random recipe, and pick up a handy cooking tip.
      </Typography>
      <Typography>
        {`If you'd like to discover a new recipe, visit the `}
        <Link component={NavLink} to={RoutePath.Search}>
          Search page
        </Link>
        {`.`}
      </Typography>
    </>
  );
};
