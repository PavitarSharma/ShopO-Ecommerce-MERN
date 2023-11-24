import { axiosPublic } from "./http";
export const publicFetcher = (url: string) =>
  axiosPublic.get(url).then((res) => res.data);
