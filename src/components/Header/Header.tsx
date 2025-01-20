import { Button, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth";
import { RoutePath } from "../../router";
import { AppName } from "../../utils/constants";
import IsMiniProvider from "./IsMiniProvider";
import Logo from "./Logo";
import MenuAnchorProvider from "./MenuAnchorProvider";
import SideDrawer from "./SideDrawer";
import SideDrawerToggler from "./SideDrawerToggler";
import UserMenu from "./UserMenu";
import UserMenuToggler from "./UserMenuToggler";

const Header = () => {
  const theme = useTheme();
  const color = `primary.${theme.palette.mode}`;
  const { session } = useAuth();
  const menuId = "user-menu";

  return (
    <>
      <MenuAnchorProvider>
        <IsMiniProvider>
          <AppBar
            position="fixed"
            sx={{ zIndex: theme.zIndex.drawer + 1, color: color }}
          >
            <Toolbar>
              <SideDrawerToggler />
              <Box
                sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              >
                <Logo text={AppName} />
              </Box>
              <Box sx={{ display: "flex" }}>
                {session && <UserMenuToggler menuId={menuId} />}
                {!session && (
                  <Button
                    variant="outlined"
                    component={NavLink}
                    to={RoutePath.Login}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <SideDrawer />
          <UserMenu menuId={menuId} />
        </IsMiniProvider>
      </MenuAnchorProvider>
    </>
  );
};

export default Header;
