import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const loggedInStatus = useSelector(
    (state: any) => state.users.loggedInStatus
  );
  return loggedInStatus ? children : <Navigate to="/signin" />;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const loggedInStatus = useSelector(
    (state: any) => state.users.loggedInStatus
  );
  return !loggedInStatus ? children : <Navigate to={"/"} />;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const role = useSelector((state: any) => state.users.role);
  return role === "ADMIN" ? children : <Navigate to={"/"} />;
};
