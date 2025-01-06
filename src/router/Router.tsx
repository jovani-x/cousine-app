import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import AuthProvider from "../auth";
import CollectionPage from "../views/Collection";
import ErrorPage from "../views/Error";
import FindPage from "../views/FindRecipe";
import HomePage from "../views/Home";
import Layout from "../views/Layout.tsx";
import LoginPage from "../views/Login";
import ProfilePage from "../views/Profile";
import RecipePage from "../views/Recipe";
import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: (
        <AuthProvider>
          <Layout>
            <ErrorPage />
          </Layout>
        </AuthProvider>
      ),
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              element: <HomePage />,
              index: true,
            },
            {
              path: "collection",
              element: <CollectionPage />,
              children: [
                {
                  path: ":id",
                  element: <RecipePage />,
                },
              ],
            },
            {
              path: "find-recipe",
              element: <FindPage />,
            },

            {
              path: "profile",
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
  }
);

export default router;
