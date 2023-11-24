import { useAppSelector } from "@/redux/hooks";
import { SelectAuthState } from "@/redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuth } = useAppSelector(SelectAuthState);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProtectedRoutes;
