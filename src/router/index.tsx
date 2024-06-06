import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@src/layouts/AppLayout";

const HomePage = lazy(() => import("@src/pages/HomePage"));
const CurrentWeatherPage = lazy(() => import("@src/pages/CurrentWeatherPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "current-weather",
        element: <CurrentWeatherPage />,
      },
    ],
  },
]);

export default {};
