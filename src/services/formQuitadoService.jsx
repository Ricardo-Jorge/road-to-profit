import { api, requestConfig } from "../utils/config";

// Create Form
const createFormQuitado = async (data, token) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/forms/quitado", config);

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Erro ao criar formulário.", error);
    throw error;
  }
};

// Get Forms
const getAllFormsQuitado = async (token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/forms/quitado", config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao localizar formulários.", error);
    throw error;
  }
};

// Update Form
const updateFormQuitado = async (data, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(api + "/forms/quitado/" + data.id, config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao atualizar formulário: ", error);
    throw error;
  }
};

// Delete Form
const deleteFormQuitado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "/forms/quitado/" + id, config);
    if (!res.ok) {
      throw new Error(`Erro ao deletar formulário.`);
    }
    return res;
  } catch (error) {
    console.error("Erro ao deletar formulário: ", error);
    throw error;
  }
};

const formQuitadoService = {
  createFormQuitado,
  getAllFormsQuitado,
  updateFormQuitado,
  deleteFormQuitado,
};

export default formQuitadoService;
