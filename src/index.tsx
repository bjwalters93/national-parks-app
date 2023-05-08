import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootComponent from "./routes/RootComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexHome from "./routes/IndexHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      { index: true, element: <IndexHome /> },
      {
        path: "find_park",
        element: <h1>Find Park</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
