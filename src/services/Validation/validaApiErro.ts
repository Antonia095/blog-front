import axios from "axios";

export function validaApiErro(error: unknown, notFoundMsg = "Recurso não encontrado", defaultMsg = "Erro ao processar a requisição") {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return Promise.reject({ message: notFoundMsg });
    }
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
  return Promise.reject({ message: defaultMsg });
}