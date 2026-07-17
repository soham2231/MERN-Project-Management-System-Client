import API from "./axios";

export const getAssignmentsAPI = async () => {
  const response = await API.get("/assignments/getAllAssignments");
  return response.data;
};

export const assignTaskAPI = async (data) => {
  const response = await API.post("/assignments/assignTask", data);
  return response.data;
};

export const updateAssignmentStatusAPI = async (id, data) => {
  const response = await API.patch(
    `/assignments/updateAssignmentStatus/${id}`,
    data,
  );
  return response.data;
};