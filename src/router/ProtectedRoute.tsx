import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { setRequestedRoute } from "../utils/requestedRoute";
import { RoutePath } from "./routes";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    // save pathname before checking auth to redirect later
    setRequestedRoute(location.pathname);
    return <Navigate to={RoutePath.Login} replace />;
  }

  return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
