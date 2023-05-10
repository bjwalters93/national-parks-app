import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootComponent from "./routes/RootComponent";
import IndexHome from "./routes/IndexHome";
import FindPark, { getPark } from "./routes/FindPark";
import Videos, { loadVideos } from "./routes/Videos";
import Park, { loadPark } from "./routes/Park";
import ParkMain from "./routes/ParkMain";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      { index: true, element: <IndexHome /> },
      {
        path: "find_park",
        element: <FindPark />,
        loader: getPark,
      },
      {
        path: "park/:park",
        element: <ParkMain />,
        children: [
          { index: true, element: <Park />, loader: loadPark },
          { path: "activities", element: <h1>Activites</h1> },
          { path: "people", element: <h1>People</h1> },
          { path: "videos", element: <Videos />, loader: loadVideos },
          { path: "campgrounds", element: <h1>Campgrounds</h1> },
          { path: "directions", element: <h1>Directions</h1> },
        ],
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
