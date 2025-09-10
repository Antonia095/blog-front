import { useState, useEffect } from 'react';
import { buscarPosts } from '../services/postService';
import type { PostResponse } from '../types/Post';

export function BuscarPostPorId(id: number) {
  const [post, setPost] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined || id === null) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await buscarPosts(id);
        setPost(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro ao buscar post.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return { post, loading, error };
}
