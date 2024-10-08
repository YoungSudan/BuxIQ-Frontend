import axios from "axios";

const API_URL = "http://localhost:3001"; // Replace with your Rails API URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const token = response.headers.authorization;
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.delete(`${API_URL}/logout`, {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
    localStorage.removeItem("authToken");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/me`, {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
