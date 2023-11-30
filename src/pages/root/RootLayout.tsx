import { Footer, Header } from "@/components/Root";
import useUserProfile from "@/hooks/useUserProfile";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useUserProfile();

  useEffect(() => {
    if (user) {
      dispatch(getUser(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
