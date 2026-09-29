// PRACTICAL 8: Axios instance - used to call our Express REST API

import axios from "axios";

// change this if your backend runs on a different URL/port
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach the JWT token (if present) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
