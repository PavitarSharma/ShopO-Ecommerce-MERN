import { Footer, Header } from "@/components/Root";
import usePrivateFetcher from "@/hooks/usePrivateFetcher";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useSWR from "swr";

const RootLayout = () => {
  const privateFetcher = usePrivateFetcher();
  const dispatch = useAppDispatch();
  const { data: user } = useSWR("/user/profile", privateFetcher);

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
