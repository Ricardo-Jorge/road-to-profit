import { api, requestConfig } from "../utils/config";

// Create Form
const createFormAlugado = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/forms/alugado", config);

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao criar formulário:", error);
    throw error;
  }
};

// Get Forms
const getAllFormsAlugado = async (token) => {
  console.log("Token recebido em getAllFormsAlugado:", token);
  const config = requestConfig("GET", null, token);
  console.log("Configuração da requisição:", config);
  try {
    const res = await fetch(api + "/forms/alugado", config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Erro ao localizar formulários:", error);
    throw error;
  }
};

// Update Form
const updateFormAlugado = async (id, data, token) => {
  const config = requestConfig("PUT", data, id, token);

  try {
    const res = await fetch(api + "/forms/alugado/" + id, config);

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao atualizar formulário:", error);
    throw error;
  }
};

// Delete Form
const deleteFormAlugado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/forms/alugado/" + id, config);
    if (!res.ok) {
      throw new Error(`Erro ao deletar formulário.`);
    }
    return res;
  } catch (error) {
    console.error("Erro ao deletar formulário Alugado");
    throw error;
  }
};

const formAlugadoService = {
  createFormAlugado,
  getAllFormsAlugado,
  updateFormAlugado,
  deleteFormAlugado,
};

export default formAlugadoService;
