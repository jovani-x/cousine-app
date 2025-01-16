import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../router";
import styles from "./styles.module.scss";

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
  const pathNames = location.pathname.split("/").filter((x) => x);

  // hide breadcrumbs on home page
  if (
    pathNames.length === 0 ||
    (pathNames.length === 1 && pathNames[0] === "/")
  )
    return null;

  const linkStyle = {
    "--link-color": theme.palette.primary[theme.palette.mode],
    "--link-hover-color": theme.palette.primary.main,
  } as React.CSSProperties;

  const renderedPath = pathNames.map((value, index) => {
    const to = `/${pathNames.slice(0, index + 1).join("/")}`;
    const name = getBreadcrumbName(to, value);
    const isLast = index === pathNames.length - 1;

    return isLast ? (
      <Typography key={to} sx={{ color: "text.primary" }}>
        {name}
      </Typography>
    ) : (
      <NavLink to={to} key={to} style={linkStyle} className={styles.link}>
        {name}
      </NavLink>
    );
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="/" sx={{ my: 2 }}>
      {/* home */}
      <NavLink to="/" style={linkStyle} className={styles.link}>
        {getBreadcrumbName("/", "home")}
      </NavLink>
      {/* others */}
      {renderedPath}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
