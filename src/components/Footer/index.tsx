import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppName } from "../../utils/constants";

const Footer = () => {
  const theme = useTheme();
  const color = `primary.${theme.palette.mode}`;

  return (
    <Box
      component="footer"
      sx={{
        color: color,
        background: theme.palette.grey[900],
        py: 1,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="body2" align="center">
        {"© "}
        {new Date().getFullYear()} {AppName}
      </Typography>
    </Box>
  );
};

export default Footer;
