export interface Post {
  titulo: string;
  descricao: string;
  imagemUrl: string;
}

export interface PostResponse {
  id: number;
  titulo: string;
  descricao: string;
  imagemUrl: string;
}

export interface PostErrors {
  titulo?: string;
  descricao?: string;
  imagemUrl?: string;
}