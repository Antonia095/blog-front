import { validaApiErro } from '../../../src/services/Validation/validaApiErro';
import axios from 'axios';

describe('validaApiErro', () => {
  it('deve retornar mensagem customizada para 404', async () => {
    const error = { response: { status: 404 }, isAxiosError: true };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await expect(validaApiErro(error, 'Não encontrado')).rejects.toEqual({ message: 'Não encontrado' });
  });

  it('deve retornar dados do response.data se existir', async () => {
    const error = { response: { data: { erro: 'Falha' } }, isAxiosError: true };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await expect(validaApiErro(error)).rejects.toEqual({ erro: 'Falha' });
  });

  it('deve retornar mensagem default se não for AxiosError', async () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(false);
    await expect(validaApiErro({}, undefined, 'Erro padrão')).rejects.toEqual({ message: 'Erro padrão' });
  });
});
