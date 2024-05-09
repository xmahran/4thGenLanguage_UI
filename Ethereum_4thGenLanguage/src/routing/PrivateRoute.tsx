import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/store";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const isAuthenticated = () => {
    const user = useAppSelector((state) => state.user.user);
    if (user.id) {
      return true;
    }
    return false;
  };
  return isAuthenticated() ? (
    <Route path={props.path} element={props.element} />
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
