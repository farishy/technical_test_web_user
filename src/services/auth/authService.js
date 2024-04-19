import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

// Register new user
const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};

// login user
const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data.data.token));
    localStorage.setItem("user", JSON.stringify(res.data.data.user));
  }
  return res.data.data.user;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
