import FlatwareIcon from "@mui/icons-material/Flatware";
import { useTheme } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../router";

const Logo = ({
  text,
  url = RoutePath.Home,
}: {
  text: string;
  url?: string;
}) => {
  const theme = useTheme();
  const color = `primary.${theme.palette.mode}`;

  return (
    <Link to={url} component={NavLink} style={{ textDecoration: "none" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <FlatwareIcon sx={{ color: color }} />
        <Typography variant="h6" sx={{ color: color }}>
          {text}
        </Typography>
      </Stack>
    </Link>
  );
};

export default Logo;
