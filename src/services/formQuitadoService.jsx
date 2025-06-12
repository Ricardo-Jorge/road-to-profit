import { api, requestConfig } from "../utils/config";

// Create Form
const createFormQuitado = async (data, token) => {
  const config = requestConfig("POST", data, token);

  const res = await fetch(api + "/forms/quitado", config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Get Forms
const getAllFormsQuitado = async (token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/forms/quitado", config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Update Form
const updateFormQuitado = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/forms/quitado/" + data.id, config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();

  throw errorData;
};

// Delete Form
const deleteFormQuitado = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  const res = await fetch(api + "/forms/quitado/" + id, config);
  if (res.ok) {
    return res;
  }
  const errorData = await res.json();

  throw errorData;
};

const formQuitadoService = {
  createFormQuitado,
  getAllFormsQuitado,
  updateFormQuitado,
  deleteFormQuitado,
};

export default formQuitadoService;
