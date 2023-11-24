import { axiosPrivate } from "./http";

export const privateFetcher = (url: string) =>
  axiosPrivate.get(url).then((res) => res.data);
