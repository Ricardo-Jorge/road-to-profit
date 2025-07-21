import { api, requestConfig } from "../utils/config";

// Create Report
const createReportAlugado = async (id, token) => {
  const config = requestConfig("POST", null, token);

  const res = await fetch(`${api}/forms/alugado/${id}/report/a`, config);
  if (res.ok) {
    return await res.json();
  }

  const errorData = await res.json();
  throw errorData;
};

// Get Report by respective Form ID

const getReportAlugado = async (id, token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(`${api}/forms/alugado/${id}/report/a`, config);
  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  throw errorData;
};

const deleteReportAlugado = async (formId, token) => {
  const config = requestConfig("DELETE", null, token);
  const res = await fetch(`${api}/forms/alugado/${formId}/report/a`, config);

  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  throw errorData;
};

const reportAlugadoService = {
  createReportAlugado,
  getReportAlugado,
  deleteReportAlugado,
};

export default reportAlugadoService;
