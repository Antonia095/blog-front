import { renderHook, act } from '@testing-library/react';
import { CriarPostHooks } from '../../src/hooks/useCriarPost';

jest.mock('../../src/services/Api/postsApi', () => ({
  criarPost: jest.fn().mockResolvedValue({ 
    id: 1, titulo: 'Novo', descricao: 'desc', imagemUrl: '' 
  })
}));

jest.mock('../../src/utils/validacaoPost', () => ({
  validarPost: jest.fn(() => ({}))
}));

describe('CriarPostHooks', () => {
  it('deve atualizar formData ao chamar handleChange', () => {
    const { result } = renderHook(() => CriarPostHooks());
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Viagem Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.titulo).toBe('Viagem Teste');
  });

  it('deve chamar criarPost e resetar formData ao submeter', async () => {
    const { result } = renderHook(() => CriarPostHooks());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formData).toEqual({ titulo: '', descricao: '', imagemUrl: '' });
    expect(result.current.enviado).toBe(true);
  });

});
