export const generateMinutes = (minute: number): Date => {
  const currentTime = new Date();
  return new Date(currentTime.getTime() + minute * 60 * 1000);
};
