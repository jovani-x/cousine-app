import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signout } from "./auth";
import { USER_SESSION_NAME } from "./constants";
import { AuthContextType, AuthData, Session } from "./types";

const AuthContext = createContext<AuthContextType | null>(null);

export const authContextErrorMessage = "Wrap components with <AuthProvider />";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(
    JSON.parse(localStorage.getItem(USER_SESSION_NAME) || "null")
  );
  const navigate = useNavigate();

  const signIn = async ({ authData }: { authData: AuthData }) => {
    try {
      const response = await signin({ authData });
      if (response?.user) {
        setSession({
          user: response.user,
        });
        localStorage.setItem(
          USER_SESSION_NAME,
          JSON.stringify({
            user: response.user,
          })
        );
        navigate("/");
      } else {
        throw Error("Access denied.");
      }
    } catch (error) {
      // show error(s)
      console.log(error instanceof Error ? error.message : error);
    }
  };

  const signOut = async () => {
    await signout();
    setSession(null);
    localStorage.removeItem(USER_SESSION_NAME);
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

export default AuthProvider;

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) throw Error(authContextErrorMessage);

  return authCtx;
};
