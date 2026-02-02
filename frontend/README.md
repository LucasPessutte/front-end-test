# Desafio Técnico - Dogs Dashboard

Aplicação frontend desenvolvida como parte de um desafio técnico, com foco em listagem, filtros, paginação e visualização de dados de cachorros através de gráficos.

<img width="1903" height="943" alt="image" src="https://github.com/user-attachments/assets/b5c8f9e2-da5b-4df5-a2c5-a7d744f491a2" />


# Instalação

## Pré-Requisitos
- Node.js (v18+)
- Docker e Docker Compose

Passos:
1 - Clone o repositorio 
2 - Acesse a pasta do front-end
```bash
cd frontend
```
3 - Instale as dependencias
```bash
npm install 
```
4 - Rode o projeto
```bash
npm run dev
```
5 - A aplicação estará disponivel em:
```bash
http://localhost:5173

```

## Tecnologias utilizadas

React | TypeScript | Tailwind CSS | shadcn/ui | TanStack Query | React Router | Axios 

## Decisões técnicas e arquiteturais

A organização do projeto foi pensada para manter uma separação clara entre páginas, componentes de interface (UI) e hooks, facilitando a leitura do código, a manutenção e a escalabilidade da aplicação. O hook `useDogs` foi criado para centralizar o consumo da API, controle de paginação e cache de dados, evitando duplicação de lógica e garantindo consistência no acesso às informações.

Os gráficos foram implementados como componentes independentes, permitindo reaproveitamento, manutenção simplificada e melhor isolamento de responsabilidades dentro da aplicação.

A paginação é baseada exclusivamente nos dados retornados pela API, respeitando o comportamento definido pelo backend. A quantidade de itens exibidos por página pode ser configurada pelo usuário, e os filtros são tratados no frontend de forma alinhada às regras estabelecidas pela API.

Do ponto de vista de experiência do usuário, foram tratados explicitamente os estados de carregamento e erro, garantindo feedback visual claro durante o consumo dos dados e evitando telas vazias ou comportamentos inesperados.

As abas de **Configurações** e **Usuário** foram implementadas apenas para complementar a interface e demonstrar a estrutura de navegação da aplicação, não possuindo funcionalidades ativas no contexto deste desafio.
