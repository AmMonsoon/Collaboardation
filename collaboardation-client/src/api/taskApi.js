import api from "./axiosInstance";

export const createTask = async ({ projectId, boardId, title, description }) => {
  try {
    const response = await api.post(`/projects/${projectId}/boards/${boardId}`, {
        title,
        description,
        position,
        dueDate
    });
    console.log("@@@@RESPONSE@@@@@",response.data)
    return response.data;
  } catch (error) {
    console.error(
      "create task error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getTasks = async ({projectId, boardId}) => {
  try {
    const response = await api.get(`/projects/${projectId}/boards/${boardId}`)

    return response.data;
  } catch (error) {
    console.error(
      "retrieving all tasks error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};