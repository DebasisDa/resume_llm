import axios from "axios";

const API_URL = "http://localhost:4000"; // backend URL

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const postJob = (data, token) =>
  axios.post(`${API_URL}/job`, data, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

export const getJobs = (token) =>
  axios.get(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

