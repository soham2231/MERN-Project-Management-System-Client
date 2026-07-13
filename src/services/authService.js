import API from "./axios";

// ================= REGISTER =================

export const registerUserAPI = async (formData) => {
  const response = await API.post("/users/register", formData);

  return response.data;
};

// ================= LOGIN =================

export const loginUserAPI = async (userData) => {
  const response = await API.post("/users/login", userData);

  return response.data;
};

// ================= GET PROFILE =================

export const getUserInfoAPI = async () => {
  const response = await API.get("/users/profile");

  return response.data;
};
