import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = "http://localhost:3000";

class HttpService {
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${API_URL}${endpoint}`, config);
  }

  async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${API_URL}${endpoint}`, data, config);
  }

  async put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${API_URL}${endpoint}`, data, config);
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.delete<T>(`${API_URL}${endpoint}`, config);
  }
}

export default new HttpService();
