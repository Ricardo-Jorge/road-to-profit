import { api, requestConfig } from "../utils/config";

// Create Report
const createReportQuitado = async (formId, token) => {
  const config = requestConfig("POST", null, token);
  const res = await fetch(`${api}/forms/quitado/${formId}/report/q`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

// Get Report by respective Form ID
const getReportQuitado = async (formId, token) => {
  const config = requestConfig("GET", null, token);
  const res = await fetch(`${api}/forms/quitado/${formId}/report/q`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

// Delete Report by respective FormID

const deleteReportQuitado = async (formId, token) => {
  const config = requestConfig("DELETE", null, token);
  const res = await fetch(`${api}/forms/quitado/${formId}/report/q`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

const reportQuitadoService = {
  createReportQuitado,
  getReportQuitado,
  deleteReportQuitado,
};

export default reportQuitadoService;
