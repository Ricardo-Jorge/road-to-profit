import { api, requestConfig } from "../utils/config";

// Get user profile
const profile = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/users/profile", config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter perfil:", error);
    throw error; // Permite que o erro seja tratado no componente que chama a função
  }
};

// Update user profile
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token); // Removido o "true" se não houver upload

  try {
    const res = await fetch(api + "/users/update", config); // Corrigido o endpoint
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    const updatedData = await res.json();
    return updatedData;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};

// Get user details by ID
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/" + id, config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter detalhes do usuário:", error);
    throw error;
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
