import axios from "axios";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api` || "http://localhost:8000/api"

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;
