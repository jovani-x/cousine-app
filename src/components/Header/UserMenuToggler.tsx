import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { useMenuAnchor } from "./MenuAnchorProvider";

const UserMenuToggler = ({ menuId }: { menuId: string }) => {
  const { handleMenuOpen } = useMenuAnchor();

  return (
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
  );
};

export default UserMenuToggler;
