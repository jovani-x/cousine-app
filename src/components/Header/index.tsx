import AccountCircle from "@mui/icons-material/AccountCircle";
import FlatwareIcon from "@mui/icons-material/Flatware";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { CSSObject, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAuth } from "../../auth";
import { routes } from "../../router";
import { AppName } from "../../utils/constants";

const Header = () => {
  const drawerWidth = 240;
  const theme = useTheme();
  const color = `primary.${theme.palette.mode}`;
  // user menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  // side menu
  // desktop - permanent (narrow/wide), mobile - temporary
  const [isMini, setIsMini] = useState(true);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

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

  const { session, authentication } = useAuth();

  const menuId = "user-menu";
  // user-menu
  const renderedMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem href="/profile" onClick={handleMenuClose}>
        <IconButton size="small" color="inherit">
          <ManageAccountsIcon />
        </IconButton>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleMenuClose();
          authentication.signOut();
        }}
      >
        <IconButton size="small" color="inherit">
          <LogoutRoundedIcon />
        </IconButton>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  const renderedSideMenu = routes.map(({ text, IconTag, url }) => {
    return (
      <ListItem key={text} disablePadding sx={{ display: "block" }}>
        <Link
          href={url}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
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
        </Link>
      </ListItem>
    );
  });

  const isLargeAndMore = window.innerWidth >= theme.breakpoints.values.md;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1, color: color }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: color }}
            onClick={() => {
              setIsMini((prev) => !prev);
            }}
          >
            <MenuOpenIcon
              sx={{ transform: isMini ? "scaleX(-1)" : "scaleX(1)" }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FlatwareIcon sx={{ color: color }} />
                <Typography variant="h6" sx={{ color: color }}>
                  {AppName}
                </Typography>
              </Stack>
            </Link>
          </Box>
          <Box sx={{ display: "flex" }}>
            {session && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 2 }}
              >
                <AccountCircle />
              </IconButton>
            )}
            {!session && (
              <Button variant="outlined" component={Link} href="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
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
          <List component="nav" aria-label="main mailbox folders">
            {renderedSideMenu}
          </List>
        </Box>
      </Drawer>
      {renderedMenu}
    </>
  );
};

export default Header;
