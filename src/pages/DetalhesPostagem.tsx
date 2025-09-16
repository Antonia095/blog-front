import { useParams, useNavigate } from 'react-router-dom';
import { BuscarPostPorId } from '../hooks/useBuscarPostPorId';
import { deletarPost } from '../services/Api/postsApi';
import { ToastContainer } from 'react-toastify';
import { showErrorToast } from '../utils/showErrorToast';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/DetalhesPostagem.css';

const DetalhesPostagem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = BuscarPostPorId(Number(id));

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletarPost(post.id);
      navigate('/postagem');
    } catch (err: unknown) {
      if (err instanceof Error) {
        showErrorToast(`Erro ao deletar post: ${err.message}`);
      } else {
        showErrorToast('Erro ao deletar post.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!post) return;
  
    navigate(`/atualizar-postagem/${post.id}`);
  };


  if (loading) return <p>Carregando...</p>;
  if (error) {
    showErrorToast(error);
    return null;
  }
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <>
      <ToastContainer />
      <div className="post-detalhes-container">
        <h2>{post.titulo}</h2>
        {post.imagemUrl && <img src={post.imagemUrl} alt={post.titulo} className="post-detalhes-img" />}
        <p>{post.descricao}</p>
        <div className="post-detalhes-actions">
          <button className="btn-atualizar" onClick={handleUpdate}>Atualizar</button>
          <button className="btn-deletar" onClick={handleDelete}>Deletar</button>
        </div>
      </div>
    </>
  );
};

export default DetalhesPostagem;
