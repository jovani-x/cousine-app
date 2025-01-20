import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";
import { RoutePath } from "./routes.ts";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
