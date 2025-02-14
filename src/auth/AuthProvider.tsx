import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../types/user";
import {
  getRequestedRoute,
  removeRequestedRoute,
} from "../utils/requestedRoute";
import { checkme, signin, signout } from "./auth";
import type { AuthContextType, AuthData, Session } from "./types";
import { removeUserSession, setUserSession } from "./utils";

const AuthContext = createContext<AuthContextType | null>(null);

export const authContextErrorMessage = "Wrap components with <AuthProvider />";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const user = useCheckMe();
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setSession({ user });
      setUserSession({ user }); // localStorage
      // redirect user to requested pathname or home
      const requestedRoute = getRequestedRoute();
      navigate(requestedRoute ?? "/", { replace: true });
      removeRequestedRoute();
    } else {
      setSession(null);
      removeUserSession(); // localStorage
    }
  }, [user, navigate]);

  // ! errors will bubble up
  const signIn = async ({ authData }: { authData: AuthData }) => {
    const response = await signin({ authData });
    const { user } = response || {};
    if (response && user) {
      setSession(response);
      setUserSession(response); // localStorage
      return { user };
    } else {
      throw Error("Access denied.");
    }
  };

  const signOut = async () => {
    try {
      await signout();
    } catch (err) {
      console.log(err);
    } finally {
      setSession(null);
      removeUserSession(); // localStorage
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authentication: { signIn, signOut },
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) throw Error(authContextErrorMessage);

  return authCtx;
};

// hook to check token in cookie
const useCheckMe = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const checkMe = async () => {
      try {
        const userData = await checkme();
        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.log(error);
      }
    };
    checkMe();
  }, []);

  return user;
};

export default AuthProvider;

export { useAuth, useCheckMe };
