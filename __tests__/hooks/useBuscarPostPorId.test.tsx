import { renderHook, waitFor } from '@testing-library/react';
import * as postsApi from '../../src/services/Api/postsApi';
import { BuscarPostPorId } from '../../src/hooks/useBuscarPostPorId';
import { Post } from '../../src/types/Post';

jest.mock('../../src/services/Api/postsApi');
const mockedBuscarPosts = postsApi.buscarPosts as jest.Mock;

describe('BuscarPostPorId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPost: Post = {
      titulo: 'Título do teste',
      descricao: 'Descrição do teste ',
      imagemUrl: 'http://exemplo.com/imagem.jpg',
    };

  it('deve buscar e retornar o post corretamente', async () => {
    mockedBuscarPosts.mockResolvedValueOnce(mockPost);
    const { result } = renderHook(() => BuscarPostPorId(1));
    await waitFor(() => expect(result.current.post).not.toBeNull());
    expect(result.current.post).toEqual(mockPost);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve setar erro se buscarPosts lançar erro', async () => {
    mockedBuscarPosts.mockRejectedValueOnce(new Error('Erro ao buscar post.'));
    const { result } = renderHook(() => BuscarPostPorId(2));
    await waitFor(() => expect(result.current.error).toBe('Erro ao buscar post.'));
    expect(result.current.post).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao buscar post.');
  });
});
