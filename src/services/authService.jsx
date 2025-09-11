import { requestConfig } from "../utils/config";
import apiClient from "../utils/apiClient";

// Register an user
const register = async (data, dispatch) => {
  const config = requestConfig("post", data);

  const res = await apiClient("/users/register", config, dispatch);

  if (res) {
    const userData = {
      id: res.user?.id || res.id,
      token: res.token,
    };

    if (userData.id && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return userData;
  }
  const errorData = await res.json();
  throw errorData;
};

// Logout an User
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in User
const login = async (data, dispatch) => {
  const config = requestConfig("post", data);

  const res = await apiClient("/users/login", config, dispatch);

  if (res) {
    const userData = {
      id: res.id,
      token: res.token,
    };

    if (userData.id && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return userData;
  }

  const errorData = await res.json();
  throw errorData;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
