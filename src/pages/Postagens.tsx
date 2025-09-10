import { usePostList } from '../hooks/ListarPostsHooks';
import '../styles/pages/Postagens.css';

const Postagens = () => {
  const { posts, loading, error } = usePostList();

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className='viagens'>Viagens</h1>
      <ul className="postagens-list">
        {posts.map(post => (
          <li key={post.id} className="postagens-item">
            {post.imagemUrl && <img src={post.imagemUrl} alt={post.titulo} className="postagens-img" />}
            <div className="postagens-content">
              <h3 className="postagens-titulo">{post.titulo}</h3>
              <p className="postagens-descricao">{post.descricao}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Postagens;
