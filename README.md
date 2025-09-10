## Blog de Viagens

Este projeto é uma aplicação de blog desenvolvida com React e TypeScript, que permite cadastrar, listar, editar e excluir posts de forma simples e intuitiva.

### Principais Funcionalidades
- Cadastro de novos posts com título, descrição e imagem
- Listagem de postagens
- Edição e exclusão de posts
- Navegação entre páginas (Home, Sobre, Criar Post, Viagens)
- Consumo de API fake com json-server

### Tecnologias Utilizadas
- React
- TypeScript
- Vite
- Axios
- json-server
- CSS Modules

### Como rodar o projeto
1. Instale as dependências:
	```powershell
	npm install
	```
2. Inicie o servidor de API fake (json-server):
	```powershell
	npx json-server --watch db.json --port 3000
	```
3. Inicie a aplicação React:
	```powershell
	npm run dev
	```

Abra o navegador em `http://localhost:5173` para acessar o blog.
