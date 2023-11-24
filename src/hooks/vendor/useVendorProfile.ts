import useSWR from "swr";
import usePrivateFetcher from "../usePrivateFetcher";

const useVendorProfile = () => {
  const privateFetcher = usePrivateFetcher();
  const { data, isLoading, mutate, error } = useSWR(
    "/vendor/profile",
    privateFetcher
  );
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useVendorProfile;
