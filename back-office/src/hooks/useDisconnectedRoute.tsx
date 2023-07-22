import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, RouteObject, RouteProps } from "react-router-dom";

const useDisconnectedRoute = ({ element, ...rest }: RouteObject) => {
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  return {
    ...rest,
    element: isConnected ? <Navigate to="/" replace /> : element,
  };
};

export default useDisconnectedRoute;
