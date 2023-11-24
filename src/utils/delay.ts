export const delay = () =>
  new Promise<void>((res) => setTimeout(() => res(), 800));
