const REQUESTED_ROUTE = "redirect-to-requested-route";

const getRequestedRoute = () => {
  return localStorage.getItem(REQUESTED_ROUTE) || "/";
};

const setRequestedRoute = (pathname?: string) => {
  localStorage.setItem(REQUESTED_ROUTE, pathname || "/");
};

const removeRequestedRoute = () => {
  localStorage.removeItem(REQUESTED_ROUTE);
};

export { getRequestedRoute, removeRequestedRoute, setRequestedRoute };
