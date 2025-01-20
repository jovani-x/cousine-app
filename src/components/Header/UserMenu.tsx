import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Divider, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth";
import { RoutePath } from "../../router";
import { useMenuAnchor } from "./MenuAnchorProvider";

const UserMenu = ({ menuId }: { menuId: string }) => {
  const { authentication } = useAuth();
  const { menuAnchorEl, handleMenuClose } = useMenuAnchor();
  const isMenuOpen = Boolean(menuAnchorEl);

  return (
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
      <MenuItem
        to={RoutePath.Profile}
        component={NavLink}
        onClick={handleMenuClose}
      >
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
};

export default UserMenu;
