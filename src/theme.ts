import { amber } from "@mui/material/colors";
import {
  createTheme,
  Palette,
  PaletteColor,
  Theme,
} from "@mui/material/styles";

const generateLinkColors = (theme: Theme) => {
  const colorKeys = Object.keys(theme.palette).filter((key) => {
    const color = theme.palette[key as keyof Palette];
    return !!color && typeof color === "object" && "main" in color;
  });

  return colorKeys.map((color) => {
    const colorValue = theme.palette[color as keyof Palette] as PaletteColor;

    return {
      props: { color },
      style: {
        "--link-color": colorValue[theme.palette.mode],
        "--link-hover-color": colorValue.main,
      },
    };
  });
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
      dark: amber[600],
    },
    secondary: {
      main: amber["A400"],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "var(--link-color)",
          textUnderlineOffset: "0.25em",
          textDecorationColor: "unset",
          textDecorationThickness: "1px",

          "&:hover": {
            color: "var(--link-hover-color)",
          },

          variants: generateLinkColors(theme),
        }),
      },
    },
  },
});

export default theme;
