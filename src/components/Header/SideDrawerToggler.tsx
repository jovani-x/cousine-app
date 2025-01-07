import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useIsMini } from "./IsMiniProvider";

const SideDrawerToggler = () => {
  const { isMini, setIsMini } = useIsMini();
  const theme = useTheme();
  const color = `primary.${theme.palette.mode}`;

  return (
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
      <MenuOpenIcon sx={{ transform: isMini ? "scaleX(-1)" : "scaleX(1)" }} />
    </IconButton>
  );
};

export default SideDrawerToggler;
