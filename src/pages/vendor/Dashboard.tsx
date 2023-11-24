import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/slices/authSlice";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axiosPrivate.post("/auth/logout");
    dispatch(logOut());
    navigate("/");
    toast.success("Logged out successfully done.");
  };
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        Dashboard
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
