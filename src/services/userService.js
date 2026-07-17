import API from "./axios";

// ================= GET MEMBERS =================

export const getMembersAPI = async () => {
  const response = await API.get("/users/members");
  return response.data;
};

