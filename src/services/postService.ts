import axios from "axios";
import type { Post, PostResponse } from "../types/Post";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const buscarPosts = async (id: number): Promise<PostResponse> => {
    try {
      const response = await api.get<PostResponse>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao buscar o post.'
      });
    }
};

export const criarPost = async(postData: Post): Promise<PostResponse> => {
    try {
      const response = await api.post<PostResponse>('/posts', postData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({ message: 'Erro de conexão com o servidor.' });
    }
};

export const atualizarPost = async (id: number, postData: Post): Promise<PostResponse> => {
    try {
      const response = await api.put<PostResponse>(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao atualizar o post.'
      });
    }
};

export const listarPosts = async (): Promise<PostResponse[]> => {
  try {
    const response = await api.get<PostResponse[]>('/posts');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: 'Erro de conexão com o servidor.' });
  }
};

export const deletarPost = async (id: number): Promise<void> =>{
    try {
      await api.delete(`/posts/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao excluir o post.'
      });
    }
};
