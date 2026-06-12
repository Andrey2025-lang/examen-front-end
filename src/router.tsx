import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import UnderConstruction from "@/pages/UnderConstruction";
import Reports from "@/pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reportar-estafa",
    element: <UnderConstruction />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/reportes",
    element: <Reports />,
  },
]);
