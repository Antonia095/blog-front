import { renderHook, act } from '@testing-library/react';
import * as postsApi from '../../src/services/Api/postsApi';
import { EditarPostHooks } from '../../src/hooks/useEditarPost';
import { Post } from '../../src/types/Post';

jest.mock('../../src/services/Api/postsApi');
const mockedAtualizarPost = postsApi.atualizarPost as jest.Mock;

describe('EditarPostHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPost: Post = {
      titulo: 'Título do teste',
      descricao: 'Descrição do teste ',
      imagemUrl: 'http://exemplo.com/imagem.jpg',
    };
  it('deve atualizar um post com sucesso', async () => {
    mockedAtualizarPost.mockResolvedValueOnce({});
    const { result } = renderHook(() => EditarPostHooks());
    await act(async () => {
      await result.current.editarPost(1, mockPost);
    });
    expect(result.current.success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve setar erro se atualizarPost lançar erro', async () => {
    mockedAtualizarPost.mockRejectedValueOnce(new Error('Falha na atualização'));
    const { result } = renderHook(() => EditarPostHooks());
    await act(async () => {
      await result.current.editarPost(2, mockPost);
    });
    expect(result.current.success).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Falha na atualização');
  });
});
