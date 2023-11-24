import { publicFetcher } from "@/http/publicFetcher";
import useSWR from "swr";

const useCategories = () => {
  const { data, error, isLoading } = useSWR("/category", publicFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    data,
    error,
    isLoading,
  };
};

export default useCategories;
