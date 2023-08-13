import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Home from "../pages";
import Chapter from "../pages/Chapters";
import Classes from "../pages/Classes";
import Error404 from "../pages/Error404";

import useConnectedRoute from "../hooks/useConnectedRoute";
import useDisconnectedRoute from "../hooks/useDisconnectedRoute";
import LegalUsage from "../pages/legal/LegalUsage";
import LegalPrivacy from "../pages/legal/LegalPrivacy";

const Router = () => {
  const routing = useRoutes([
    {
      path: "/legal/usage",
      element: <LegalUsage />,
    },
    {
      path: "/legal/privacy",
      element: <LegalPrivacy />,
    },
    useDisconnectedRoute({
      path: "/login",
      element: <Login />,
    }),
    useDisconnectedRoute({
      path: "/signup",
      element: <Signup />,
    }),
    useConnectedRoute({ path: "/", element: <Home /> }),
    useConnectedRoute({ path: "/chapters/:chapterId", element: <Chapter /> }),
    useConnectedRoute({
      path: "/classes/:schoolId/:classId/edit",
      element: <Classes />,
    }),
    useConnectedRoute({
      path: "/classes/:schoolId/:classId/access",
      element: <Classes />,
    }),
    useConnectedRoute({
      path: "/classes/:schoolId/:classId/view",
      element: <Classes />,
    }),
    useConnectedRoute({
      path: "/classes/:schoolId/:classId",
      element: <Classes />,
    }),
    useConnectedRoute({ path: "/classes/:schoolId", element: <Classes /> }),
    useConnectedRoute({ path: "/classes", element: <Classes /> }),
    { path: "*", element: <Error404 /> },
  ]);

  return routing;
};

export default Router;
