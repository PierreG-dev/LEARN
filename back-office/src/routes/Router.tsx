import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Home from "../pages";
import Courses from "../pages/Courses";
import Exercices from "../pages/Exercices";
import Classes from "../pages/Classes";
import Chapter from "../pages/Chapters";
import Error404 from "../pages/Error404";

import useConnectedRoute from "../hooks/useConnectedRoute";
import useDisconnectedRoute from "../hooks/useDisconnectedRoute";
import LegalUsage from "../pages/legal/LegalUsage";
import LegalPrivacy from "../pages/legal/LegalPrivacy";
import Account from "../pages/account";
import Settings from "../pages/Settings";

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
    useConnectedRoute({ path: "/courses", element: <Courses /> }),
    useConnectedRoute({ path: "/exercices", element: <Exercices /> }),
    useConnectedRoute({ path: "/chapters", element: <Chapter /> }),
    useConnectedRoute({ path: "/chapters/:chapterId", element: <Chapter /> }),
    useConnectedRoute({
      path: "/classes/:schoolId/:classId",
      element: <Classes />,
    }),
    useConnectedRoute({ path: "/classes/:schoolId", element: <Classes /> }),
    useConnectedRoute({ path: "/classes", element: <Classes /> }),
    useConnectedRoute({ path: "/account", element: <Account /> }),
    useConnectedRoute({ path: "/settings", element: <Settings /> }),
    { path: "*", element: <Error404 /> },
  ]);

  return routing;
};

export default Router;
