import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BuscarPostPorId } from '../hooks/BuscarPostPorIdHooks';
import { atualizarPost } from '../services/postService';
import '../styles/pages/EditarPost.css';

const EditarPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = BuscarPostPorId(Number(id));
  const [formData, setFormData] = useState({
    titulo: post?.titulo || '',
    descricao: post?.descricao || '',
    imagemUrl: post?.imagemUrl || ''
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  React.useEffect(() => {
    if (post) {
      setFormData({
        titulo: post.titulo,
        descricao: post.descricao,
        imagemUrl: post.imagemUrl
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setSaving(true);
    setMsg('');
    try {
      await atualizarPost(post.id, formData);
      setMsg('Post atualizado com sucesso!');
      setTimeout(() => navigate(`/postagens`), 1500);
    } catch {
      setMsg('Erro ao atualizar post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="editar-post-container">
      <h2>Editar Postagem</h2>
      <form onSubmit={handleSubmit} className="editar-post-form">
        <label>Título:</label>
        <input name="titulo" value={formData.titulo} onChange={handleChange} required />
        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
        <label>Imagem URL:</label>
        <input name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} />
        <button type="submit" disabled={saving}>Salvar</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default EditarPost;
