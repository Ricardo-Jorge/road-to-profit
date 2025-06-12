import { api, requestConfig } from "../utils/config";

// Create Form
const createFormAlugado = async (data, token) => {
  const config = requestConfig("POST", data, token);

  const res = await fetch(api + "/forms/alugado", config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Get Forms
const getAllFormsAlugado = async (token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/forms/alugado", config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Update Form
const updateFormAlugado = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/forms/alugado/" + data.id, config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Delete Form
const deleteFormAlugado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  const res = await fetch(api + "/forms/alugado/" + id, config);
  if (res.ok) {
    return res;
  }
  const errorData = await res.json();

  throw errorData;
};

const formAlugadoService = {
  createFormAlugado,
  getAllFormsAlugado,
  updateFormAlugado,
  deleteFormAlugado,
};

export default formAlugadoService;
