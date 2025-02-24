import { createBrowserRouter } from "react-router-dom";
import App, { AppWrapper } from "../App";
import CollectionPage from "../views/Collection";
import ErrorPage from "../views/Error";
import FindPage from "../views/FindRecipe";
import HomePage from "../views/Home";
import LoginPage from "../views/Login";
import ProfilePage from "../views/Profile";
import RecipePage from "../views/Recipe";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { RoutePath } from "./routes.ts";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: (
        <AppWrapper>
          <ErrorPage />
        </AppWrapper>
      ),
      children: [
        {
          path: RoutePath.Login,
          element: <LoginPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: RoutePath.Home,
              element: <HomePage />,
              index: true,
            },
            {
              path: RoutePath.Collection,
              element: <CollectionPage />,
              children: [
                {
                  path: ":id",
                  element: <RecipePage />,
                },
              ],
            },
            {
              path: RoutePath.Search,
              element: <FindPage />,
            },
            {
              path: `${RoutePath.Search}/:id`,
              element: <RecipePage />,
            },
            {
              path: RoutePath.Profile,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },
  ],
  {
    // v6 -> v7 https://reactrouter.com/upgrading/v6
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
    basename: import.meta.env.VITE_BASE || "/",
  }
);

export default router;
