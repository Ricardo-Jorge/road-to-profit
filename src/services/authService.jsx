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

    // Padronizar o objeto salvo no localStorage
    const userData = {
      id: jsonData.user?.id || jsonData.id, // Compatível com diferentes respostas do backend
      token: jsonData.token,
    };

    if (userData.id && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return userData; // Retorna o formato padronizado para o authSlice
  } catch (error) {
    console.error(error);
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

    // Padronizar o objeto salvo no localStorage
    const userData = {
      id: jsonData.id,
      token: jsonData.token,
    };

    if (userData.id && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return userData;
  } catch (error) {
    console.error(error);
    return { errors: ["Erro ao fazer login."] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
