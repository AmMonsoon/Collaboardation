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

//get a specific board not needed for the UI atm
export const getBoard = async ({projectId, boardId}) => {
  try {
    const response = await api.get(`/projects/${projectId}/boards/${boardId}`)
    return response.data;
  } catch (error) {
    console.error(
      "retrieving board error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const updateBoard = async({
        projectId,
        boardId,
        title,
        description
    }) => {
    try {
        const response = await api.patch(`/projects/${projectId}/boards/${boardId}`, {title, description})
        return response.data.updatedBoard[0]
    }catch (error) {
        console.error("updating board error:",
        error.response?.status,
        error.response?.data
        );
    throw error;
    }
}

export const deleteBoard = async({
        projectId,
        boardId,
    }) => {
    try {
        api.delete(`/projects/${projectId}/boards/${boardId}`)
        return boardId
    }catch (error) {
        console.error("deleting board error:",
        error.response?.status,
        error.response?.data
        );
    throw error;
    }
}