import { api, requestConfig } from "../utils/config";

// Create Report
const createReportFinanciado = async (formId, token) => {
  const config = requestConfig("POST", null, token);
  const res = await fetch(`${api}/forms/financiado/${formId}/report/f`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

// Get Report by respective Form ID
const getReportFinanciado = async (formId, token) => {
  const config = requestConfig("GET", null, token);
  const res = await fetch(`${api}/forms/financiado/${formId}/report/f`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

// Delete Report by respective FormID

const deleteReportFinanciado = async (formId, token) => {
  const config = requestConfig("DELETE", null, token);
  const res = await fetch(`${api}/forms/financiado/${formId}/report/f`, config);

  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

const reportFinanciadoService = {
  createReportFinanciado,
  getReportFinanciado,
  deleteReportFinanciado,
};

export default reportFinanciadoService;
