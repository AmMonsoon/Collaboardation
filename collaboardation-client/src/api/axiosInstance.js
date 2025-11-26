import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/"
})
console.log("AXIOS BASE URL →", api.defaults.baseURL);

export default api;