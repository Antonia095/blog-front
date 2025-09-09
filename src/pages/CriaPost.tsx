import PostForm from './formulario/PostForm';
import { CriarPostHooks } from '../hooks/CriarPostHooks';
import '../styles/pages/CriaPost.css';

const CriaPost = () => {

  const { formData, errors, enviando, enviado, handleChange, handleSubmit } = CriarPostHooks();

  return (
    <div className="content">
      <div className="cria-post">
        <h1>Cadastrar Post</h1>
        
        {enviado && (
          <div className="success-message">
            Post criado com sucesso!
          </div>
        )}
        
        <PostForm 
          formData={formData}
          errors={errors}
          enviando={enviando}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CriaPost;