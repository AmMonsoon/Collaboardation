import api from "./axiosInstance";

export const createBoard = async ({ projectId, title, description }) => {
  try {
    const response = await api.post(`/projects/${projectId}/boards`, {
        title,
        description
    });
    console.log("@@@@RESPONSE@@@@@",response.data.data.board)
    return response.data.data.board;
  } catch (error) {
    console.error(
      "create board error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getBoards = async ({projectId}) => {
  try {
    const response = await api.get(`/projects/${projectId}/boards`)

    return response.data;
  } catch (error) {
    console.error(
      "retrieving all boards error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
