import { useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import { Navigate, RouteObject, RouteProps } from "react-router-dom";

const useDisconnectedRoute = ({ element, ...rest }: RouteObject) => {
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);

  const isPending = useSelector((state: RootState) => state.auth.isPending);

  return {
    ...rest,
    ...rest,
    element: isPending ? (
      <>Vérification de la connexion...</>
    ) : !isConnected ? (
      element
    ) : (
      <Navigate to="/" replace />
    ),
  };
};

export default useDisconnectedRoute;
