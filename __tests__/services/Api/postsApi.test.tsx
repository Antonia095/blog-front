import * as postsApi from '../../../src/services/Api/postsApi';
import axios from 'axios';
import { Post } from '../../../src/types/Post';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('postsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPost: Post = {
    titulo: 'Título do teste',
    descricao: 'Descrição do teste ',
    imagemUrl: 'http://exemplo.com/imagem.jpg',
  };

   const mockPostEditado: Post = {
    titulo: 'Título editado',
    descricao: 'Descrição editada',
    imagemUrl: 'http://exemplo.com/imagem.jpg',
  };

  it('deve buscar postagens e retornar erro customizado se 404', async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 404 } });
    await expect(postsApi.buscarPosts(99)).rejects.toEqual({ message: expect.stringContaining('Erro ao buscar o post.') });
  });

   it('deve criar uma nova postagem e retornar os dados em caso de sucesso', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: mockPost });
    const result = await postsApi.criarPost(mockPost);
    expect(result).toEqual(mockPost);
  });

   it('deve atualizar uma postagem e retornar os dados em caso de sucesso', async () => {
    mockedAxios.put.mockResolvedValueOnce({ data:  mockPostEditado });
    const result = await postsApi.atualizarPost(1, mockPostEditado);
    expect(result).toEqual(mockPostEditado);
  });

  it('deve listar postagens e retornar dados em caso de sucesso', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [mockPost] });
    const result = await postsApi.listarPosts();
    expect(result).toEqual([mockPost]);
  });

  it('deve deletar uma postagem e resolver sem erro em caso de sucesso', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    await expect(postsApi.deletarPost(1)).resolves.toBeUndefined();
  });
});
