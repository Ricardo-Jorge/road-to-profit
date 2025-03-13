import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  const config = requestConfig("post", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res.id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout an User
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in User
const login = async (data) => {
  const config = requestConfig("post", data);

  try {
    const res = await fetch(api + "/users/login" + config);

    if (res.id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
