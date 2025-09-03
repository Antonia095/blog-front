import imagemBanner from '../assets/viagem.webp';
import '../styles/components/Banner.css';

interface BannerProps {
  titulo: string;
  descricao: string;
}

const Banner = ({ titulo, descricao }: BannerProps) => {
  return (
    <div className="banner-image">
      <div className="image-container">
        <img src={imagemBanner} alt="Banner de viagem" />
        <div className="image-text">
          <h1>{titulo}</h1>
          <p>{descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;