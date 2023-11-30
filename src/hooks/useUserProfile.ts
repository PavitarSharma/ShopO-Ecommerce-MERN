import useSWR from "swr";
import usePrivateFetcher from "./usePrivateFetcher";

const useUserProfile = () => {
  const privateFetcher = usePrivateFetcher();
  const { data, isLoading, mutate, error } = useSWR(
    "/user/profile",
    privateFetcher
  );

  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useUserProfile;
