import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RootComponent from "./routes/RootComponent";
import IndexHome from "./routes/IndexHome";
import FindPark, { getPark } from "./routes/FindPark";
import Videos, { loadVideos } from "./routes/Videos";
import Park, { loadPark } from "./routes/Park";
import Directions, { loadDirections } from "./routes/Directions";
import ParkMain from "./routes/ParkMain";
import ThingsToDo, { loadThingsToDo } from "./routes/ThingsToDo";
import Hiking, { loadHiking } from "./routes/Hiking";
import NewsReleases, { loadNewsReleases } from "./routes/NewsReleases";
import People, { loadPeople } from "./routes/People";
import Campgrounds, { loadCampgrounds } from "./routes/Campgrounds";
import CampgroundsLanding from "./routes/CampgroundsLanding";
import CampInfo from "./routes/CampInfo";
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
        path: "park/:stateCode/:park",
        element: <ParkMain />,
        children: [
          { index: true, element: <Park />, loader: loadPark },
          {
            path: "thingstodo",
            element: <ThingsToDo />,
            loader: loadThingsToDo,
          },
          { path: "hiking", element: <Hiking />, loader: loadHiking },
          { path: "news", element: <NewsReleases />, loader: loadNewsReleases },
          { path: "people", element: <People />, loader: loadPeople },
          { path: "videos", element: <Videos />, loader: loadVideos },
          {
            path: "campgrounds",
            element: <Campgrounds />,
            loader: loadCampgrounds,
            children: [
              {
                index: true,
                element: <CampgroundsLanding />,
              },
              { path: ":campName", element: <CampInfo /> },
            ],
          },
          { path: "alerts", element: <h1>Alerts</h1> },
          {
            path: "directions",
            element: <Directions />,
            loader: loadDirections,
          },
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
