import type { Post, PostErrors } from '../types/Post';

export function validarPost(formData: Post): PostErrors {
  const erros: PostErrors = {};
  const { titulo, descricao, imagemUrl } = formData;

  if (!titulo.trim()) {
    erros.titulo = 'O título é obrigatório';
  } 
  
  if (!descricao.trim()) {
    erros.descricao = 'A descrição é obrigatória';
  }

  if (!imagemUrl.trim()) {
    erros.imagemUrl = 'A imagem é obrigatória';
  }

  return erros;
}

export function isPostValidado(formData: Post): boolean {
  const erro = validarPost(formData);
  return Object.keys(erro).length === 0;
}