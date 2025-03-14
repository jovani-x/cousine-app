import { Link, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import { RoutePath, routes } from "../../router";

const getBreadcrumbName = (to: string, path: string) => {
  // if one of main routes return its name
  const foundRoute = routes.find((route) => route.url === to);
  if (foundRoute) return foundRoute.text;

  // otherwise return path
  // remove recipe_{id}_ from path and make first letter uppercase
  const ix = path.indexOf("_", "recipe_".length);
  const name = path.substring(ix + 1).replace(/%20/g, " ");
  return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
};

const CustomBreadcrumbs = () => {
  const theme = useTheme();
  const location = useLocation();
  const pathNames = location.pathname.split("/");

  // hide breadcrumbs on home page
  if (
    pathNames.length === 0 ||
    (pathNames.length === 2 && pathNames[0] === "" && pathNames[1] === "")
  )
    return null;

  const renderedPath = pathNames.map((value, index) => {
    const to = `${pathNames.slice(0, index + 1).join("/")}`;
    const name = getBreadcrumbName(to, value);
    const isLast = index === pathNames.length - 1;
    const isFirst = index === 0;

    return isLast ? (
      <Typography key={to} sx={{ color: theme.palette.text.primary }}>
        {name}
      </Typography>
    ) : (
      <Link to={to} key={to} component={NavLink} underline="always">
        {!isFirst ? name : getBreadcrumbName(RoutePath.Home, "home")}
      </Link>
    );
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="/" sx={{ my: 2 }}>
      {renderedPath}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
