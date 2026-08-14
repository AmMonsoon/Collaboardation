import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true
});

let csrfToken = null;

export const fetchCsrfToken = async () => {
  const response = await api.get("/csrf-token");

  csrfToken = response.data.csrfToken;

  return csrfToken;
};

export const clearCsrfToken = () => {
  csrfToken = null;
};

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();

  const protectedMethods = ["post", "put", "patch", "delete"];

  if (protectedMethods.includes(method)) {
    if (!csrfToken) {
      await fetchCsrfToken();
    }

    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});

export default api;