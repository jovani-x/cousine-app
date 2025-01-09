import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./auth";
import Layout from "./views/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
