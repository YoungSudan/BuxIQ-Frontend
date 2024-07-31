import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your Rails API URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/sign_in`, credentials);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/ping`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
