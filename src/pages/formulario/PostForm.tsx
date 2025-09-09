import type { FormEvent } from 'react';
import type { PostErrors } from '../../types/Post'; 
import '../../styles/pages/formulario/PostForm.css';

interface PostFormProps {
  formData: {
    titulo: string;
    descricao: string;
    imagemUrl: string;
  };
  errors: PostErrors;
  enviando: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PostForm = ({ formData, errors, enviando, onChange, onSubmit }: PostFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="titulo">
          Título: <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="titulo" 
          name="titulo"
          value={formData.titulo}
          onChange={onChange}
          className={errors.titulo ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.titulo && (
          <div className="error-text">{errors.titulo}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="descricao">
          Descrição: <span className="required">*</span>
        </label>
        <textarea 
          id="descricao" 
          name="descricao"
          value={formData.descricao}
          onChange={onChange}
          rows={5}
          className={errors.descricao ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.descricao && (
          <div className="error-text">{errors.descricao}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="imagemUrl">
          Imagem: <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="imagemUrl" 
          name="imagemUrl"
          value={formData.imagemUrl}
          onChange={onChange}
          className={errors.imagemUrl ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.imagemUrl && (
          <div className="error-text">{errors.imagemUrl}</div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={enviando}
      >
        {enviando ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default PostForm;