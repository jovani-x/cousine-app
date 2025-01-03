import Box from "@mui/material/Box";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Box
        sx={{ flexGrow: 1, display: "flex", width: "100vw", maxWidth: "100%" }}
      >
        <Header />
        <Main />
      </Box>
      <Footer />
    </>
  );
}

function Main() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, width: "100%", pt: `var(--header-height)` }}
    >
      {"Test Content"}
    </Box>
  );
}

export default App;
