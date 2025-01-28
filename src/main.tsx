import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      // v6 -> v7 https://reactrouter.com/upgrading/v6
      future={{
        v7_startTransition: true,
      }}
    />
  </StrictMode>
);
