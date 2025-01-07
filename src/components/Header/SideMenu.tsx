import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { SideRouteType } from "../../router/sideRoutes";
import { useIsMini } from "./IsMiniProvider";

const SideMenu = ({ routes }: { routes: SideRouteType[] }) => {
  return routes.map(({ text, IconTag, url }) => (
    <SideMenuItem key={text} text={text} url={url} IconTag={IconTag} />
  ));
};

const SideMenuItem = ({ text, IconTag, url }: SideRouteType) => {
  const { isMini } = useIsMini();
  const theme = useTheme();

  return (
    <ListItem key={text} disablePadding sx={{ display: "block" }}>
      <NavLink
        to={url}
        style={({ isActive }) => ({
          textDecoration: "none",
          color: !isActive
            ? "inherit"
            : theme.palette.primary[theme.palette.mode],
        })}
      >
        <ListItemButton
          sx={[
            {
              minHeight: 48,
              px: 2.5,
              justifyContent: !isMini ? "initial" : "center",
            },
          ]}
        >
          <ListItemIcon
            sx={[
              {
                minWidth: 0,
                justifyContent: "center",
                mr: !isMini ? 3 : "auto",
                color: "inherit",
              },
            ]}
          >
            {IconTag}
          </ListItemIcon>
          <ListItemText
            primary={text}
            sx={{
              whiteSpace: "nowrap",
              opacity: !isMini ? 1 : 0,
            }}
          />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default SideMenu;
