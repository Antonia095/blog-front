import { useParams, useNavigate } from 'react-router-dom';
import { BuscarPostPorId } from '../hooks/BuscarPostPorIdHooks';
import { deletarPost } from '../services/postService';
import '../styles/pages/DetalhesPostagem.css';

const DetalhesPostagem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = BuscarPostPorId(Number(id));

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletarPost(post.id);
      alert('Post deletado com sucesso!');
      navigate('/postagem');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Erro ao deletar post: ${err.message}`);
      } else {
        alert('Erro ao deletar post.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!post) return;
  
    navigate(`/atualizar-postagem/${post.id}`);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="post-detalhes-container">
      <h2>{post.titulo}</h2>
      {post.imagemUrl && <img src={post.imagemUrl} alt={post.titulo} className="post-detalhes-img" />}
      <p>{post.descricao}</p>
      <div className="post-detalhes-actions">
        <button className="btn-atualizar" onClick={handleUpdate}>Atualizar</button>
        <button className="btn-deletar" onClick={handleDelete}>Deletar</button>
      </div>
    </div>
  );
};

export default DetalhesPostagem;
