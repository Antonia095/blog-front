import React, { useState } from "react";
import type { FormEvent } from 'react';
import { criarPost } from "../services/postService";
import type { Post, PostErrors } from "../types/Post";
import { validarPost }  from "../utils/validacaoPost";

interface ApiError {
  field: string;
  defaultMessage: string;
}

interface ApiErrorResponse {
  errors?: ApiError[];
  message?: string;
}

export function CriarPostHooks() {

  const [formData, setFormData] = useState<Post>({
    titulo: '',
    descricao: '',
    imagemUrl: ''
  });

  const [errors, setErrors] = useState<PostErrors>({});
  const [enviando, setEnviando] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarErros = (): boolean => {
    const erros = validarPost(formData);
    setErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validarErros()) {
      return;
    }
    
    setEnviando(true);
    
    try {
      const data = await criarPost(formData);
      console.log('Post criado com sucesso:', data);
      
      setFormData({ titulo: '', descricao: '', imagemUrl: '' });
      setEnviado(true);
      setErrors({});
      
      setTimeout(() => {
        setEnviado(false);
      }, 3000);
    } catch (error: unknown) {
      console.error('Erro ao criar post:', error);
      
      const errorData = error as ApiErrorResponse;
      
      if (errorData?.errors?.length) {
        const newErrors: PostErrors = {};
        errorData.errors.forEach((error: ApiError) => {
          const field = error.field as keyof PostErrors;
          newErrors[field] = error.defaultMessage;
        });
        setErrors(prev => ({...prev, ...newErrors}));
      } else {
        setErrors(prev => ({
          ...prev,
          form: 'Erro ao processar a requisição. Por favor, tente novamente.'
        }));
      }
    } finally {
      setEnviando(false);
    }
  };

  return {
    formData,
    errors,
    enviando,
    enviado,
    handleChange,
    handleSubmit
  };
};

