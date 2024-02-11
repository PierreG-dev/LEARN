import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Home from "../pages";
import Courses from "../pages/Courses";
import Exercices from "../pages/Exercices";
import ClassesAdmin from "../pages/Admin/Classes";
import ContentAdmin from "../pages/Admin/Content";
import Error404 from "../pages/Error404";

import useConnectedRoute from "../hooks/useConnectedRoute";
import useDisconnectedRoute from "../hooks/useDisconnectedRoute";
import LegalUsage from "../pages/legal/LegalUsage";
import LegalPrivacy from "../pages/legal/LegalPrivacy";
import Account from "../pages/Account";
import Settings from "../pages/Settings";

const Router = () => {
  const routing = useRoutes([
    // ===== AUTH ===== //
    // --- Authentification
    useDisconnectedRoute({
      path: "/login",
      element: <Login />,
    }),
    useDisconnectedRoute({
      path: "/signup",
      element: <Signup />,
    }),

    // --- Conditions d'utilisation
    {
      path: "/legal/usage",
      element: <LegalUsage />,
    },
    {
      path: "/legal/privacy",
      element: <LegalPrivacy />,
    },

    // --- Accueil
    useConnectedRoute({ path: "/", element: <Home /> }),

    // --- Cours
    useConnectedRoute({ path: "/courses", element: <Courses /> }),

    // --- Sets d'exercices
    useConnectedRoute({ path: "/exercices", element: <Exercices /> }),

    // --- Gestion du compte
    useConnectedRoute({ path: "/account", element: <Account /> }),
    useConnectedRoute({ path: "/settings", element: <Settings /> }),

    // ===== ADMIN ===== //
    // --- Gestion des cours
    useConnectedRoute({ path: "/admin/content", element: <ContentAdmin /> }),
    useConnectedRoute({
      path: "/admin/content/:courseId",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/exercices",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/exercices/:exerciceId",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/exerciceSet/:exerciceSetId",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/chapter/:chapterId",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/chapter/:chapterId/subchapter/:subchapterId",
      element: <ContentAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/content/:courseId/chapter/:chapterId/subchapter/:subchapterId/lesson/:lessonId",
      element: <ContentAdmin />,
    }),

    // --- Gestion des classes
    useConnectedRoute({
      path: "/admin/classes/:schoolId/:classId",
      element: <ClassesAdmin />,
    }),
    useConnectedRoute({
      path: "/admin/classes/:schoolId",
      element: <ClassesAdmin />,
    }),
    useConnectedRoute({ path: "/admin/classes", element: <ClassesAdmin /> }),

    // --- Erreur 404
    { path: "*", element: <Error404 /> },
  ]);

  return routing;
};

export default Router;
