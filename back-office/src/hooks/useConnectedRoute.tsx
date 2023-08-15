import { useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import { Navigate, RouteObject } from "react-router-dom";

const useConnectedRoute = ({ element, ...rest }: RouteObject) => {
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);

  const isPending = useSelector((state: RootState) => state.auth.isPending);

  return {
    ...rest,
    element: isPending ? (
      <>Vérification de la connexion...</>
    ) : isConnected ? (
      element
    ) : (
      <Navigate to="/login" replace />
    ),
  };
};

export default useConnectedRoute;
