import api from "./axiosInstance";

export const createTask = async ({ projectId, boardId, title, description, position, dueDate }) => {
  try {
    const response = await api.post(`/projects/${projectId}/boards/${boardId}/tasks`, {
        title,
        description,
        position,
        dueDate
    });

    return response.data.data.task;
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
    const response = await api.get(`/projects/${projectId}/boards/${boardId}/tasks`)
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

export const updateTask = async({
        projectId,
        boardId,
        taskId,
        title,
        description,
        position,
        dueDate
    }) => {
    try {
        const response = await api.patch(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`, {title, description, position, dueDate, boardId})

        return response.data.updatedTask[0]
    }catch (error) {
        console.error("updating task error:",
        error.response?.status,
        error.response?.data
        );
    throw error;
    }
}

export const deleteTask = async({
        projectId,
        boardId,
        taskId
    }) => {
    try {
        api.delete(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
        return taskId
    }catch (error) {
        console.error("deleting task error:",
        error.response?.status,
        error.response?.data
        );
    throw error;
    }
}