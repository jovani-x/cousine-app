import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Main = ({ children }: { children?: ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, width: "100%", pt: `var(--header-height)` }}
    >
      {children ?? (
        <>
          <Container>
            <Breadcrumbs />
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
};

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <ScrollRestoration />
      <Box
        sx={{ flexGrow: 1, display: "flex", width: "100vw", maxWidth: "100%" }}
      >
        <Header />
        <Main>{children}</Main>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
