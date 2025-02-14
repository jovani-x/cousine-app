import axios from "axios";
import { UserType } from "../types/user";
import type { AuthData, Session } from "./types";

// login
// ! errors will bubble up
const signin = async ({
  authData,
}: {
  authData: AuthData;
}): Promise<Session | null> => {
  // no credentials
  if (!authData) return null;

  const loginUrl = import.meta.env.VITE_RECIPE_LOGIN_URL as string;
  const res = await axios.post(
    loginUrl,
    { ...authData },
    { withCredentials: true }
  );
  const { user } = res?.data || {};
  return user ? { user } : null;
};

// logout
// ! errors will bubble up
const signout = async () => {
  const logoutUrl = import.meta.env.VITE_RECIPE_LOGOUT_URL as string;
  const res = await axios.post(logoutUrl, {}, { withCredentials: true });
  return res.data.message;
};

// check user token
// ! errors will bubble up
const checkme = async (): Promise<UserType | null> => {
  const checkMeUrl = import.meta.env.VITE_RECIPE_CHECKME_URL as string;
  const res = await axios.get(checkMeUrl, { withCredentials: true });
  return res.data?.user ?? null;
};

export { checkme, signin, signout };
