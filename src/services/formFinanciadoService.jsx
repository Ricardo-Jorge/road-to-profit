import { api, requestConfig } from "../utils/config";

// Create Form
const createFormFinanciado = async (data, token) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/forms/financiado", config);

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
const getAllFormsFinanciado = async (token) => {
  const config = requestConfig("get", null, token);
  try {
    const res = await fetch(api + "/forms/financiado", config);

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
const updateFormFinanciado = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/forms/financiado/" + data.id, config);

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
const deleteFormFinanciado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/forms/financiado/" + id, config);
    if (!res.ok) {
      throw new Error(`Erro ao deletar formulário.`);
    }
    return res;
  } catch (error) {
    console.error("Erro ao deletar formulário: ", error);
    throw error;
  }
};

const formFinanciadoService = {
  createFormFinanciado,
  getAllFormsFinanciado,
  updateFormFinanciado,
  deleteFormFinanciado,
};

export default formFinanciadoService;
