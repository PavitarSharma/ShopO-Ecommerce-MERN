import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateFetcher = () => {
  const axiosPrivate = useAxiosPrivate();

  const privateFetcher = (url: string) =>
    axiosPrivate.get(url).then((res) => res.data);
  return privateFetcher;
};

export default usePrivateFetcher;
