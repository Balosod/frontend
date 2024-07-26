import axios from "axios";

const API_URL = "http://localhost:5000/api";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return error.response;
    }
  }
);

const getToken = () => {
  return localStorage.getItem("token");
};

export const signUp = (username: string, email: string, password: string) => {
  return axios.post(`${API_URL}/signup`, { username, email, password });
};

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getUserProfile = () => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
