import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import AuthProvider from "./auth";
import { AuthSessionWatcher } from "./components/AuthSessionWatcher";
import theme from "./theme";
import Layout from "./views/Layout";

const queryClient = new QueryClient();

const App = () => {
  return <AppWrapper />;
};

const AppWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AuthSessionWatcher />
          <Layout>{children}</Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
export { AppWrapper };
