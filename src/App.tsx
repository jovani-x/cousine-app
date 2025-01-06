import AuthProvider from "./auth";
import Layout from "./views/Layout";

const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default App;
