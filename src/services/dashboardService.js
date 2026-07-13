import API from "./axios";

export const getDashboardAPI = async () => {
  const response = await API.get("/dashboard");

  return response.data;
};