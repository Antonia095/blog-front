import type { Post } from "../../types/Post";
import HttpService from "../httpService";
import { validaApiErro } from "../Validation/validaApiErro";

export async function buscarPosts(id: number) {
    try {
      const response = await HttpService.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw await validaApiErro(error, `Post não encontrado com o ID: ${id}`, "Erro ao buscar o post.");
    }
};

export async function criarPost(postData: Post) {
    try {
      const response = await HttpService.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw await validaApiErro(error, "Erro ao criar o post.");
    }
};

export async function atualizarPost(id: number, postData: Post) {
    try {
      const response = await HttpService.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw await validaApiErro(error, `Post não encontrado com o ID: ${id}`, "Erro ao atualizar o post.");
    }
};

export async function listarPosts() {
  try {
    const response = await HttpService.get('/posts');
    return response.data;
  } catch (error) {
    throw await validaApiErro(error, "Erro ao listar os posts.");
  }
};

export async function deletarPost(id: number) {
    try {
      await HttpService.delete(`/posts/${id}`);
    } catch (error) {
      throw await validaApiErro(error, `Post não encontrado com o ID: ${id}`, "Erro ao deletar o post.");
    }
};
