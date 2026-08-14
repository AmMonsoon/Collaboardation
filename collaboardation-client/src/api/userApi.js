import api, { clearCsrfToken }from "./axiosInstance"

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });

    clearCsrfToken()

    return response.data;
  } catch (error) {
    console.error(
      "loginUser error:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const registerUser = async({username, email, password}) => {
    const response = await api.post("/users/register", {
        username,
        email,
        password
    })

    clearCsrfToken()

    return response.data
}