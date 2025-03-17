import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  const config = requestConfig("post", data);

  try {
    const res = await fetch(api + "/users/register", config);

    if (!res.ok) {
      const errorData = await res.json();
      return { errors: errorData.errors || ["Erro ao registrar."] };
    }

    const jsonData = await res.json();

    if (jsonData.id) {
      localStorage.setItem("user", JSON.stringify(jsonData));
    }
    return jsonData;
  } catch (error) {
    console.log(error);
    return { errors: ["Erro ao registrar."] };
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
    const res = await fetch(api + "/users/login", config);

    if (!res.ok) {
      const errorData = await res.json();
      return { errors: errorData.errors || ["Erro ao fazer login."] };
    }

    const jsonData = await res.json();

    if (jsonData.id) {
      localStorage.setItem("user", JSON.stringify(jsonData));
    }

    return jsonData;
  } catch (error) {
    console.log(error);
    return { errors: ["Erro ao fazer login."] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
