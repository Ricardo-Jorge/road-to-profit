//let localUrl = "http://localhost:8001/api/v1";
let serverUrl =
  "http://ec2-3-135-198-37.us-east-2.compute.amazonaws.com:49160/api/v1";

export const api = serverUrl;

export const requestConfig = (method, data = null, token = null) => {
  // Cria o objeto de configuração basico
  let config = {
    method: method.toUpperCase(), // Padroniza o método ("get" vira "GET")
    headers: {
      "Content-Type": "application/json", // Define que os dados são em JSON
    },
  };

  // Adiciona o token ao cabeçalho Authorization, se fornecido
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Adiciona o corpo da requisição (body) se houver e o método for POST ou PUT
  if (
    data &&
    (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT")
  ) {
    config.body = JSON.stringify(data); // Converte os dados para JSON
  }

  return config;
};
