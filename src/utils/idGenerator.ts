export const generateId = (): string => {
  return Math.floor(Math.random() * 100000).toString();
};
