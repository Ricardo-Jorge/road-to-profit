import { api, requestConfig } from "../utils/config";

// Create Form
const createFormFinanciado = async (data, token) => {
  const config = requestConfig("POST", data, token);

  const res = await fetch(api + "/forms/financiado", config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Get Forms
const getAllFormsFinanciado = async (token) => {
  const config = requestConfig("get", null, token);

  const res = await fetch(api + "/forms/financiado", config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Update Form
const updateFormFinanciado = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/forms/financiado/" + data.id, config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Delete Form
const deleteFormFinanciado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  const res = await fetch(api + "/forms/financiado/" + id, config);
  if (res.ok) {
    return res;
  }
  const errorData = await res.json();

  throw errorData;
};

const formFinanciadoService = {
  createFormFinanciado,
  getAllFormsFinanciado,
  updateFormFinanciado,
  deleteFormFinanciado,
};

export default formFinanciadoService;
