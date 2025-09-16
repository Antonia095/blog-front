import { useState, useEffect } from 'react';
import { listarPosts } from '../services/Api/postsApi';
import type { PostResponse } from '../types/Post';

export function usePostList() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listarPosts();
        setPosts(data as PostResponse[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro ao buscar posts.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error 
  };
}