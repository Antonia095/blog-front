import { renderHook, waitFor } from '@testing-library/react';
import * as postsApi from '../../src/services/Api/postsApi';
import { usePostList } from '../../src/hooks/useListarPosts';

jest.mock('../../src/services/Api/postsApi');
const mockedListarPosts = postsApi.listarPosts as jest.Mock;

describe('usePostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPosts = [
      { id: 1, titulo: 'Post 1', descricao: 'desc 1', imagemUrl: '' },
      { id: 2, titulo: 'Post 2', descricao: 'desc 2', imagemUrl: '' }
    ];

  it('deve buscar e retornar a lista de posts', async () => {
   
    mockedListarPosts.mockResolvedValueOnce(mockPosts);
    const { result } = renderHook(() => usePostList());
    await waitFor(() => expect(result.current.posts.length).toBe(2));
    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve setar erro se listarPosts lançar erro', async () => {
    mockedListarPosts.mockRejectedValueOnce(new Error('Erro ao buscar posts.'));
    const { result } = renderHook(() => usePostList());
    await waitFor(() => expect(result.current.error).toBe('Erro ao buscar posts.'));
    expect(result.current.posts).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
