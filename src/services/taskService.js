import API from "./axios";

// ================= GET TASKS =================

export const getTasksAPI = async () => {
  const response = await API.get("/tasks/getAll");
  return response.data;
};

// ================= CREATE TASK =================

export const createTaskAPI = async (formData) => {
  const response = await API.post("/tasks/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ================= UPDATE TASK =================

export const updateTaskAPI = async (id, formData) => {
  const response = await API.patch(`/tasks/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ================= DELETE TASK =================

export const deleteTaskAPI = async (id) => {
  const response = await API.delete(`/tasks/delete/${id}`);
  return response.data;
};
