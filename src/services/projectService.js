import API from "./axios";

export const getProjectsAPI = async () => {
  const response = await API.get("/projects/all");
  return response.data;
};

export const createProjectAPI = async (data) => {
  const response = await API.post("/projects/create", data);
  return response.data;
};

export const updateProjectAPI = async (id, data) => {
  const response = await API.put(`/projects/update/${id}`, data);
  return response.data;
};

export const deleteProjectAPI = async (id) => {
  const response = await API.delete(`/projects/delete/${id}`);
  return response.data;
};

// export const createProjectAPI = async (data) => {
//   const response = await API.post("/projects/create", data);
//   return response.data;
// };