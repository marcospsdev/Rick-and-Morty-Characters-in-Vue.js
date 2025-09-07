# Rick and Morty Characters App

Este projeto é uma aplicação web construída com **Vue 3**, **TypeScript**, **Pinia** e **Vuetify** para listar e gerenciar personagens da série Rick and Morty, consumindo a API pública.

---

## 🚀 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/marcospsdev/Rick-and-Morty-Characters-in-Vue.js.git
    cd Rick-and-Morty-Characters-in-Vue.js
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---

## 🧠 Arquitetura e Decisões

A arquitetura do projeto foi projetada para ser modular, seguindo o princípio de separação de responsabilidades.

* **`src/api`**: Camada de consumo da API. Todas as requisições HTTP são centralizadas aqui, tornando o projeto mais fácil de manter caso a API mude.
* **`src/composables`**: Encapsula a lógica reutilizável da aplicação, como a gestão de filtros e paginação dos personagens. Isso mantém os componentes da interface (UI) limpos e focados apenas na renderização.
* **`src/stores`**: O **Pinia** é usado para o gerenciamento de estado global, como a lista de personagens favoritos. A persistência dos favoritos é feita via `localStorage`.
* **`src/views`**: Contém os componentes de página (`CharacterList`, `CharacterDetails`, `FavoritesList`). Cada `view` é responsável por uma tela específica da aplicação.
* **`src/types`**: Define todas as interfaces e tipos de dados usados no projeto, garantindo a tipagem segura de ponta a ponta.

---

## 🧪 Como Rodar os Testes

O projeto utiliza o **Vitest** para testes unitários, que rodam de forma rápida e eficiente. Um teste foi criado para validar a lógica da `store` de favoritos.

Para executar os testes, utilize um dos seguintes comandos no terminal:

```bash
    npx vitest
```
ou
```bash
    npm run test
```
O Vitest irá exibir os resultados no terminal, mostrando se os testes passaram ou falharam.
