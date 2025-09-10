import { requestConfig } from "../utils/config";
import apiClient from "../utils/apiClient";

// Register an user
const register = async (data) => {
  const config = requestConfig("post", data);

  const jsonData = await apiClient("/users/register", config);

  const userData = {
    id: jsonData.user?.id || jsonData.id,
    token: jsonData.token,
  };

  if (userData.id && userData.token) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return userData;
};

// Logout an User
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in User
const login = async (data, dispatch) => {
  const config = requestConfig("post", data);

  const jsonData = await apiClient("/users/login", config, dispatch);

  const userData = {
    id: jsonData.id,
    token: jsonData.token,
  };

  if (userData.id && userData.token) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return userData;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
