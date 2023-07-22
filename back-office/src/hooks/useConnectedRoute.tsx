import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, RouteObject, RouteProps } from "react-router-dom";

const useConnectedRoute = ({ element, ...rest }: RouteObject) => {
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  return {
    ...rest,
    element: isConnected ? element : <Navigate to="/login" replace />,
  };
};

export default useConnectedRoute;
