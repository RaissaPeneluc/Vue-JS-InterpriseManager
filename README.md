# Aplicação de Gerenciamento de Produtos e Usuários

Este projeto é uma aplicação web construída com Vue.js e Vuetify, que permite aos usuários gerenciar produtos e usuários. Ele oferece funcionalidades completas para criar, ler, atualizar e deletar (CRUD) tanto produtos quanto usuários.

## Como Executar a Aplicação

Siga os passos abaixo para executar a aplicação em seu ambiente local:

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

-   **Node.js:** Certifique-se de ter o Node.js instalado (versão 16 ou superior). Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
-   **npm ou Yarn:** Geralmente, o npm já vem instalado com o Node.js. Você pode usar o npm ou o yarn, que também pode ser instalado via npm (`npm install -g yarn`).

### Passos para Execução

1.  **Clonar o Repositório:**

    ```bash
    git clone https://github.com/RaissaPeneluc/Vue-JS-InterpriseManager.git
    cd [NOME_DO_SEU_PROJETO]
    ```

2.  **Instalar as Dependências:**

    As dependências utilizadas durante esse projeto foram: Vue, Vuetify, Vue-Router, Pinia.

    Utilize npm:

    ```bash
    npm install
    ```

    Ou, utilizando Yarn:

    ```bash
    yarn install
    ```

3.  **Executar a Aplicação:**

    Utilize npm:

    ```bash
    npm run dev
    ```

    Ou, utilizando Yarn:

    ```bash
     yarn dev
    ```

4.  **Acessar a Aplicação:**

    Após executar o comando, a aplicação estará disponível em seu navegador, geralmente no endereço:
    `http://localhost:5173`

## Principais Funcionalidades Implementadas

Esta aplicação possui duas principais áreas: **Produtos** e **Usuários**, cada uma com funcionalidades de CRUD (Criar, Ler, Atualizar e Deletar):

### Funcionalidades da Área de Produtos:

1.  **Listagem de Produtos:**
    *   Exibe uma lista de todos os produtos em uma tabela, incluindo:
        *   Título
        *   Categoria
        *   Preço
        *   Descrição
        *   Imagem
    *   A tabela permite visualizar todos os produtos de forma organizada.

2.  **Dropdown para Seleção de Produto:**
    *   Um dropdown permite selecionar um produto específico para edição, detalhamento ou exclusão.
    *   O dropdown exibe o título do produto para facilitar a identificação.

3.  **Criação de Produtos:**
    *   Permite criar novos produtos através de um formulário modal.
    *   Os campos necessários para a criação de um produto são:
        *   Título
        *   Categoria
        *   Preço
        *   Descrição
        *   URL da Imagem
    *   Os dados são enviados para a API via requisição POST.

4.  **Edição de Produtos:**
    *   Permite editar produtos existentes através de um formulário modal, que é aberto ao selecionar um produto no dropdown.
    *   Os campos editáveis são os mesmos da criação.
    *   Os dados são enviados para a API via requisição PUT.

5.  **Visualização de Detalhes do Produto:**
    *   Permite visualizar detalhes de um produto específico através de um modal.
    *   Os detalhes incluem:
        *   Título
        *   Categoria
        *   Preço
        *   Descrição
        *   Imagem

6.  **Exclusão de Produtos:**
    *   Permite excluir um produto selecionado através de um botão.
    *   Os dados são removidos via requisição DELETE para a API.

### Funcionalidades da Área de Usuários:

1.  **Listagem de Usuários:**
    *   Exibe uma lista de todos os usuários em uma tabela, incluindo:
        *   Nome Completo
        *   Username
        *   Email
    *   A tabela permite visualizar todos os usuários de forma organizada.

2.  **Dropdown para Seleção de Usuário:**
    *   Um dropdown permite selecionar um usuário específico para edição, detalhamento ou exclusão.
    *   O dropdown exibe o nome completo do usuário para facilitar a identificação.

3.  **Criação de Usuários:**
    *   Permite criar novos usuários através de um formulário modal.
    *   Os campos necessários para a criação de um usuário são:
        *   Nome Completo
        *   Username
        *   Email
        *   Senha
        *   Cidade
        *   Telefone
    *   Os dados são enviados para a API via requisição POST.

4.  **Edição de Usuários:**
    *   Permite editar usuários existentes através de um formulário modal, que é aberto ao selecionar um usuário no dropdown.
    *   Os campos editáveis são os mesmos da criação.
    *   Os dados são enviados para a API via requisição PUT.

5.  **Visualização de Detalhes do Usuário:**
    *   Permite visualizar detalhes de um usuário específico através de um modal.
    *   Os detalhes incluem:
        *   Nome Completo
        *   Username
        *   Email
        *   Senha
        *   Cidade
        *   Telefone

6.  **Exclusão de Usuários:**
    *   Permite excluir um usuário selecionado através de um botão.
    *   Os dados são removidos via requisição DELETE para a API.

## Tecnologias Utilizadas

*   **Vue.js:** Framework JavaScript para construção da interface de usuário.
*   **Vuetify:** Framework de componentes para Vue.js, que fornece estilos e componentes reutilizáveis.
*   **Node.js:** Ambiente de execução JavaScript para executar a aplicação.
*   **npm ou Yarn:** Gerenciadores de pacotes para instalar as dependências.
*   **API Fake Store:** API utilizada para simular os dados (produtos e usuários) - [https://fakestoreapi.com/](https://fakestoreapi.com/)


## Contribuições

Contribuições para este projeto são sempre bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---
Este README.md fornece uma visão geral completa sobre como rodar a aplicação, suas principais funcionalidades e as tecnologias utilizadas. Use-o como ponto de partida e adicione qualquer informação específica sobre seu projeto! Se precisar de algo mais, estou à disposição!