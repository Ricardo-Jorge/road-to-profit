# Road to Profit (Frontend)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.6.1-764ABC?logo=redux)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)

Interface de usuário (frontend) para o projeto **Road to Profit**, uma aplicação de cálculo financeiro baseada em React. Ela é projetada para ajudar usuários a analisar a lucratividade de operações de veículos em três cenários de propriedade distintos: Alugado (`Alugado`), Financiado (`Financiado`) e Quitado (`Quitado`).

[Screenshot do Road to Profit](https://imgur.com/a/bPB3NOc)

## 🚀 Principais Funcionalidades

* Autenticação de Usuário: Sistema completo de Login e Registro de usuários.
* Gerenciamento de Perfil: Os usuários podem visualizar e editar suas informações de perfil.
* Formulários Dinâmicos: Três formulários distintos para entrada de dados de veículos (Alugado, Financiado, Quitado).
* Validação de Formulários: Validação robusta no lado do cliente para garantir a integridade dos dados.
* Geração de Relatórios: Cálculo e exibição de relatórios financeiros detalhados com base nos dados fornecidos.
* Gerenciamento de Estado Centralizado: Utiliza Redux Toolkit para um fluxo de dados unidirecional e gerenciamento de estado modular com slices distintos.
* Rotas Protegidas: O acesso ao perfil e aos formulários é protegido e requer autenticação do usuário.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno focado no ecossistema React.

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Framework Principal** | React  | Biblioteca de UI  |
| **Ferramenta de Build** | Vite  | Ferramenta de desenvolvimento e build  |
| **Gerenciamento de Estado** | Redux Toolkit  | Gerenciamento de estado centralizado  |
| **Roteamento** | React Router DOM  | Roteamento do lado do cliente  |
| **Componentes de UI** | React Bootstrap  | Biblioteca de componentes  |
| **Estilização** | Bootstrap  | Framework de estilização  |
| **Ícones** | React Icons  | Componentes de ícones  |
| **Qualidade de Código** | ESLint  | Linting de código  |

## 🏁 Como Executar o Projeto Localmente

Siga estas instruções para obter uma cópia funcional do projeto em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Um clone do repositório da API backend (veja a seção [API Backend](#-api-backend)).

### Instalação

1.  **Clone o repositório:**
    ```bash
     git clone https://github.com/Ricardo-Jorge/road-to-profit.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd road-to-profit
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Configuração do Ambiente

Este projeto precisa se conectar a uma API backend. Crie um arquivo `.env` na raiz do projeto e adicione a URL da sua API:

```env
VITE_REACT_APP_API_URL=http://localhost:5000/api/v1
```
### Executando a Aplicação

**Para iniciar o servidor de desenvolvimento (com hot-reload):**

```Bash

npm run dev
```
Abra http://localhost:5173 (ou a porta indicada no seu terminal) para ver a aplicação no navegador.

Para gerar uma build de produção:

```Bash

npm run build
```
Isso criará uma pasta dist com os arquivos otimizados para deploy.

**Para verificar a qualidade do código (lint):**

```Bash

npm run lint
```

### 🔌 API Backend
Este frontend consome uma API RESTful separada para autenticação e gerenciamento de dados. O repositório do backend (construído em Node.js, Express e Sequelize) pode ser encontrado em:


➡️ [Road to Profit - Backend](https://github.com/Ricardo-Jorge/RTP-BACKEND)

✒️ Autor
Ricardo Jorge - Desenvolvedor Full Stack

[Github](https://github.com/Ricardo-Jorge)

[LinkedIn](https://linkedin.com/in/ricardo-la-jorge)

📄 Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
