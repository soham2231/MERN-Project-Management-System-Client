import API from "./axios";

// ================= GET MEMBERS =================

export const getMembersAPI = async () => {
  const response = await API.get("/users/members");
  return response.data;
};

// ================= GET ALL USERS =================

export const getAllUsersAPI = async () => {
  const response = await API.get("/users/getAllUsers");
  return response.data;
};

// ================= GET USER =================

export const getUserByIdAPI = async (id) => {
  const response = await API.get(`/users/getUser/${id}`);
  return response.data;
};

// ================= UPDATE USER =================

export const updateUserAPI = async ({ id, data }) => {
  const response = await API.put(`/users/updateUser/${id}`, data);
  return response.data;
};

// ================= DELETE USER =================

export const deleteUserAPI = async (id) => {
  const response = await API.delete(`/users/deleteUser/${id}`);
  return response.data;
};

// ================= UPDATE ROLE =================

export const updateUserRoleAPI = async ({ id, role }) => {
  const response = await API.patch(`/users/updateRole/${id}`, { role });
  return response.data;
};

// ================= UPDATE PROFILE =================

export const updateProfileAPI = async (formData) => {
  const response = await API.patch("/users/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ================= CHANGE PASSWORD =================

export const changePasswordAPI = async (data) => {
  const response = await API.patch("/users/change-password", data);
  return response.data;
};
