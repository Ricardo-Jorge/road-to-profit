import { api } from "./config";
/**
 * Cliente de API centralizado que envolve o fetch.
 * Contém a lógica global para tratar o logout automático em caso de erro 401.
 * @param {string} url - O endpoint da API a ser chamado (ex: "/users/login").
 * @param {object} config - O objeto de configuração para o fetch.
 * @param {function} dispatch - A função dispatch do Redux para disparar ações.
 * @returns {Promise<any>} - Os dados da resposta em caso de sucesso.
 * @throws {object} - Um objeto de erro em caso de falha.
 */
const apiClient = async (url, config, dispatch) => {
  let res;

  try {
    res = await fetch(api + url, config);
  } catch (error) {
    // Erro de rede (servidor offline, etc)
    console.error("Erro de rede:", error);
    throw new Error("Não foi possível conectar ao servidor.");
  }

  // Se a resposta indicar um erro 401 (token expirado/inválido)
  if (res.status === 401 && dispatch) {
    console.log("Token expirado ou inválido. Realizando logout.");
    // Dispara a ação de logout. O thunk/slice cuidará de limpar o estado e o localStorage.
    dispatch({ type: "auth/logout" });
    throw new Error("Sua sessão expirou. Por favor, faça login novamente.");
  }

  // Se a resposta for qualquer outro erro
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  // Se a resposta for bem-sucedida
  return await res.json();
};

export default apiClient;
