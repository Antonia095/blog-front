import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BuscarPostPorId } from '../hooks/BuscarPostPorIdHooks';
import { EditarPostHooks } from '../hooks/EditarPostHooks';
import '../styles/pages/EditarPostagem.css';

const EditarPostagem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = BuscarPostPorId(Number(id));
  const { editarPost, loading: saving, error: saveError, success } = EditarPostHooks();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    imagemUrl: ''
  });

  useEffect(() => {
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
    await editarPost(post.id, formData);
    if (success) {
      setTimeout(() => navigate('/viagens'), 1200);
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
        {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
        {success && <p style={{ color: 'green' }}>Post atualizado com sucesso!</p>}
      </form>
    </div>
  );
};

export default EditarPostagem;
