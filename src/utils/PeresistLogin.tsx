import useRefreshToken from "@/hooks/useRefreshToken";
import { useAppSelector } from "@/redux/hooks";
import { SelectAuthState } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PeresistLogin = () => {
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAppSelector(SelectAuthState);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(true);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, token]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PeresistLogin;
