import { useState } from 'react';
import { atualizarPost } from '../services/postService';
import type { Post } from '../types/Post';

export function EditarPostHooks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editarPost = async (id: number, postData: Post) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await atualizarPost(id, postData);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao atualizar post.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { editarPost, loading, error, success };
}
