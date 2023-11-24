import { useAppSelector } from "@/redux/hooks";
import { SelectAuthState } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useAppSelector(SelectAuthState);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user?.role === "Customer") {
        navigate("/");
      } else if (user?.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/vendor");
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default Layout;
