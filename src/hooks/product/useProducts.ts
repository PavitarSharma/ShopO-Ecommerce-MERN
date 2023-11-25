import useSWR from "swr";
import { publicFetcher } from "@/http/publicFetcher";

const useProducts = () => {
  const { data, isLoading, mutate, error } = useSWR("/products", publicFetcher);
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useProducts;
