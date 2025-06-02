import { api, requestConfig } from "../utils/config";

// Create Form
const createFormAlugado = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/forms/alugado", config);

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao criar formulário:", error);
    throw error;
  }
};

// Get Forms
const getAllFormsAlugado = async (token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/forms/alugado", config);
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Erro ao localizar formulários: ", error);
    throw error;
  }
};

// Update Form
const updateFormAlugado = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/forms/alugado/" + data.id, config);
    console.log("Dados enviados:", data);
    console.log("Token enviado:", token);
    console.log("Configuração:", config);

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    console.log("Objeto Response da API:", res); // Você já tem este
    const responseData = await res.json();
    console.log("DADOS RETORNADOS PELA API (após res.json()):", responseData); // <<< ADICIONE/VERIFIQUE ESTE LOG!
    return responseData;
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
    console.error("Erro ao deletar formulário");
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
