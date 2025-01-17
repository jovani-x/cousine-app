import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider
        router={router}
        // v6 -> v7 https://reactrouter.com/upgrading/v6
        future={{
          v7_startTransition: true,
        }}
      />
    </ThemeProvider>
  </StrictMode>
);
