import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
