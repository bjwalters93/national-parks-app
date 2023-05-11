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
          { path: "places", element: <h1>Places</h1> },
          { path: "news", element: <h1>News</h1> },
          { path: "thingstodo", element: <h1>Things to do</h1> },
          { path: "people", element: <h1>People</h1> },
          { path: "videos", element: <Videos />, loader: loadVideos },
          { path: "campgrounds", element: <h1>Campgrounds</h1> },
          { path: "visitorcenters", element: <h1>visitorcenters</h1> },
          { path: "webcams", element: <h1>Webcams</h1> },
          {
            path: "amenities",
            element: <h1>Amenities ---- use /amenities/parksplaces</h1>,
          },
          {
            path: "directions",
            element: (
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.2299566745933!2d-84.22461582326206!3d40.04796887150145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883f76fbfa5f436b%3A0xccad31946f0fa16a!2s1245%20W%20Main%20St%2C%20Troy%2C%20OH%2045373!5e0!3m2!1sen!2sus!4v1683819893431!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ),
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
