import { List, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { CSSObject, Theme } from "@mui/material/styles";
import { routes } from "../../router";
import { useIsMini } from "./IsMiniProvider";
import SideMenu from "./SideMenu";

const SideDrawer = () => {
  const drawerWidth = 240;
  const theme = useTheme();
  // desktop - permanent (narrow/wide), mobile - temporary
  const { isMini, setIsMini } = useIsMini();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const isLargeAndMore = window.innerWidth >= theme.breakpoints.values.md;

  return (
    <Drawer
      anchor="left"
      variant={isLargeAndMore ? "permanent" : "temporary"}
      open={isLargeAndMore ? true : !isMini}
      onClose={() => setIsMini(true)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={[
        {
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            height: "auto",
            bottom: 0,
          },
        },
        !isMini
          ? {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
            }
          : {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
            },
      ]}
    >
      <Box
        sx={{
          mt: `var(--header-height)`,
        }}
        onClick={() => !isLargeAndMore && setIsMini(true)}
      >
        <List component="nav" aria-label="side menu">
          <SideMenu routes={routes} />
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
