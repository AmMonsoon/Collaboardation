import api from "./axiosInstance";

export const createProject = async ({ title }) => {
  try {
    const response = await api.post("/projects", {
      title
    });

    return response.data;
  } catch (error) {
    console.error(
      "create project error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.post("/projects")

    return response.data;
  } catch (error) {
    console.error(
      "retrieving all projects error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const getProject = async ({id}) => {
  try {
    const response = await api.post(`/projects/${id}`)
    return response.data;
  } catch (error) {
    console.error(
      "retrieving specific project error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const updateProject = async ({id, title}) => {
  try {
    const response = await api.post(`/projects/${id}`,{
        title
    })

    return response.data;
  } catch (error) {
    console.error(
      "updating project error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const deleteProject = async ({id}) => {
  try {
    const response = await api.post(`/projects/${id}`)
    return response.data;
  } catch (error) {
    console.error(
      "deleting project error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};