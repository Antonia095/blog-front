import Banner from "../components/Banner";
import { usePostList } from '../hooks/ListarPostsHooks';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

const Home = () => {
  const { posts, loading, error } = usePostList();
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/viagem/${id}`);
  };

  return (
    <div>
      <Banner
        titulo="Explorando o Mundo"
        descricao="Junte-se a mim em uma jornada através das maravilhas do mundo."
      />
      <div className="home-posts">
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <div className="home-posts-row">
          {posts.map(post => (
            <div
              key={post.id}
              className="home-post-card"
              onClick={() => handleCardClick(post.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={post.imagemUrl} alt={post.titulo} className="home-post-img" />
              <h3 className="home-post-title">{post.titulo}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;