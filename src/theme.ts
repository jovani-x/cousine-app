import { amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: amber["500"],
      dark: amber[600],
    },
    secondary: {
      main: amber["A400"],
    },
  },
});

export default theme;
