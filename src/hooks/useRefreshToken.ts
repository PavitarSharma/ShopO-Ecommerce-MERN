import { axiosPublic } from "@/http";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const { data } = await axiosPublic.get("/auth/refresh", {
      withCredentials: true,
    });
    dispatch(setCredentials(data));

    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
