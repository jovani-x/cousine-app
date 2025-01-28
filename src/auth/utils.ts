import { USER_SESSION_NAME } from "./constants";
import { Session } from "./types";

const getUserSession = (): Session | null => {
  return JSON.parse(localStorage.getItem(USER_SESSION_NAME) || "null");
};

const setUserSession = (session?: Session) => {
  localStorage.setItem(USER_SESSION_NAME, JSON.stringify(session));
};

const removeUserSession = () => {
  localStorage.removeItem(USER_SESSION_NAME);
};

const getUserName = () => {
  const data = getUserSession();
  return data?.user?.name;
};

const getUserId = () => {
  const data = getUserSession();
  return data?.user?.id;
};

export {
  getUserId,
  getUserName,
  getUserSession,
  removeUserSession,
  setUserSession,
};
