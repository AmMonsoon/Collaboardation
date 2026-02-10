import api from "./axiosInstance";

export const createBoard = async ({ projectId, title, description }) => {
  try {
    const response = await api.post(`/projects/${projectId}boards`, {
        title,
        description
    });
    console.log("@@@@RESPONSE@@@@@",response.data)
    return response.data;
  } catch (error) {
    console.error(
      "create board error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};