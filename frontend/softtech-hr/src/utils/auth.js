export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return JSON.parse(atob(token.split(".")[1])).role;
};
