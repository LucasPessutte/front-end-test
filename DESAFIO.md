# 🐕 Desafio Frontend - Sistema de Gerenciamento de Cachorros

Bem-vindo ao desafio técnico de frontend! Seu objetivo é criar uma aplicação web moderna e intuitiva para visualizar e filtrar informações de cachorros disponíveis para adoção.

## 📋 Contexto

Uma ONG de proteção animal precisa de uma plataforma web para facilitar a visualização de cachorros disponíveis para adoção. A API backend já está pronta e disponível, e sua missão é criar uma interface frontend que proporcione uma experiência excepcional para os usuários.

## 🎯 Objetivo

Desenvolver uma aplicação frontend completa que consuma a API fornecida e apresente os dados de forma clara, organizada e agradável.

---

## ✅ Requisitos Obrigatórios

### 1. **Listagem de Cachorros**

- Exibir os cachorros em uma **tabela responsiva** com as seguintes colunas:
  - Nome
  - Idade (calculada a partir de `birth_date`)
  - Raça
  - Sexo
  - Temperamento
- Implementar **paginação** conforme retornado pela API
- Mostrar informações de paginação (página atual, total de páginas, total de registros)

### 2. **Sistema de Filtros**

Implementar filtros funcionais para:

- **Raça** (breed) - Dropdown/Select com todas as raças disponíveis
- **Sexo** (sex) - MALE / FEMALE
- **Temperamento** (temperament) - CALM / AGGRESSIVE / AFFECTIONATE
- **Idade** (age) - Input numérico ou range slider

**Requisitos dos filtros:**

- Filtros devem funcionar de forma independente e combinada
- Aplicar filtros automaticamente ou com botão "Aplicar"
- Incluir botão "Limpar filtros"
- Manter filtros visíveis e intuitivos

### 3. **UX/UI de Qualidade**

- Design **limpo e moderno**
- Interface **responsiva** (mobile, tablet, desktop)
- **Estados de carregamento** (loading spinners ou skeletons)
- **Tratamento de erros** (mensagens amigáveis quando a API falhar)
- **Estado vazio** (mensagem quando não houver resultados)

### 4. **Boas Práticas de Código**

- Código **organizado e legível**
- Componentização adequada
- Nomenclatura clara de variáveis e funções (seguindo padrões do inglês)
- Tratamento adequado de estados (loading, error, success)

---

## 🌟 Diferenciais (Não Obrigatórios)

Implementar um ou mais dos seguintes itens pode destacar sua entrega:

### 📊 **Dashboards e Visualizações**

Criar uma seção de **analytics/estatísticas** com gráficos que mostrem:

- Distribuição de cachorros por raça (gráfico de pizza ou barras)
- Distribuição por temperamento (gráfico de barras)
- Distribuição por sexo (gráfico de pizza)
- Distribuição de idade (histograma ou gráfico de linha)
- Total de cachorros por categoria

**Sugestões de bibliotecas:** Chart.js, Recharts, Victory, ApexCharts, D3.js

### ⚡ **Recursos Avançados**

- **Busca por nome** (filtro adicional no frontend)
- **Detalhes do cachorro** (modal ou página dedicada ao clicar em um registro)
- **Favoritos** (marcar cachorros favoritos usando localStorage)
- **Exportação de dados** (download CSV ou PDF da lista filtrada)
- **Modo escuro** (dark mode toggle)
- **Animações e transições** suaves
- **Testes unitários** ou end-to-end

### 🎨 **Design Excepcional**

- Sistema de design consistente
- Uso de bibliotecas UI modernas (Tailwind, Material-UI, Ant Design, Chakra UI, etc.)
- Micro-interações e feedback visual
- Acessibilidade (WCAG compliance)

---

## 🔧 Tecnologias Obrigatórias e Permitidas

### **Framework (OBRIGATÓRIO):**

- ⚛️ **React** - Você deve utilizar React para desenvolver a aplicação
  - Pode escolher entre: **Vite** (recomendado), **Next.js** ou **Create React App**

### **Estilização (Livre escolha):**

- CSS puro / SCSS / SASS
- Tailwind CSS
- Styled Components / Emotion
- Material-UI / Ant Design / Chakra UI
- Bootstrap

### **Gerenciamento de Estado (Livre escolha):**

- Context API / useState
- Redux / Zustand / Jotai / Recoil
- React Query / TanStack Query (para cache de dados)

### **Chamadas HTTP (Livre escolha):**

- Fetch API
- Axios
- React Query / TanStack Query
- SWR

---

## 📡 API Backend

### **Base URL:**

```
http://localhost:3000/api
```

### **Endpoint Principal:**

#### `GET /api/dogs`

**Query Parameters:**

- `page` (number, default: 1) - Número da página
- `limit` (number, default: 10, max: 100) - Itens por página
- `age` (number, 0-30) - Filtrar por idade em anos
- `breed` (string) - Filtrar por raça
- `sex` (string: "MALE" | "FEMALE") - Filtrar por sexo
- `temperament` (string: "CALM" | "AGGRESSIVE" | "AFFECTIONATE") - Filtrar por temperamento

**Exemplo de Request:**

```
GET /api/dogs?page=1&limit=10&breed=LABRADOR&sex=MALE&temperament=CALM
```

**Exemplo de Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Rex",
      "birth_date": "2020-05-15T00:00:00.000Z",
      "breed": "LABRADOR",
      "temperament": "CALM",
      "sex": "MALE",
      "created_at": "2024-01-20T10:00:00.000Z",
      "updated_at": "2024-01-20T10:00:00.000Z",
      "deleted_at": null
    }
  ],
  "pagination": {
    "total": 200,
    "page": 1,
    "limit": 10,
    "totalPages": 20
  }
}
```

### **Valores Aceitos:**

**Breeds (Raças):**

```
SRD, LABRADOR, GOLDEN_RETRIEVER, GERMAN_SHEPHERD, BULLDOG, BEAGLE,
POODLE, ROTTWEILER, YORKSHIRE_TERRIER, BOXER, DACHSHUND,
SIBERIAN_HUSKY, DOBERMAN, SHIH_TZU, CHIHUAHUA, POMERANIAN,
BORDER_COLLIE, AUSTRALIAN_SHEPHERD, COCKER_SPANIEL, MALTESE
```

**Sex (Sexo):**

```
MALE, FEMALE
```

**Temperament (Temperamento):**

```
CALM, AGGRESSIVE, AFFECTIONATE
```

---

## 🚀 Como Iniciar o Backend

### **Pré-requisitos:**

- Node.js (v18+)
- Docker e Docker Compose

### **Passos:**

1. **Navegue até a pasta do backend:**

   ```bash
   cd backend
   ```

2. **Inicie o PostgreSQL:**

   ```bash
   docker-compose up -d
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configure o banco de dados:**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

5. **Inicie o servidor:**

   ```bash
   npm run dev
   ```

6. **API disponível em:** `http://localhost:3000`

✅ O backend já possui **200 cachorros cadastrados** via seed!

---

## 📦 Estrutura de Entrega

### **O que deve ser entregue:**

1. **Código-fonte completo** do frontend
2. **README.md** contendo:
   - Instruções de instalação e execução
   - Tecnologias utilizadas
   - Decisões técnicas e arquiteturais
   - Screenshots ou GIFs da aplicação (opcional, mas recomendado)
3. **Estrutura de pastas organizada**
4. **(Opcional)** Link para deploy (Vercel, Netlify, etc.)

### **Formato de entrega:**

- Repositório Git (GitHub, GitLab, Bitbucket)
- Ou arquivo ZIP com todo o projeto

---

## 🎯 Critérios de Avaliação

Sua solução será avaliada com base nos seguintes critérios:

| Critério                | Peso       | Descrição                                                                 |
| ----------------------- | ---------- | ------------------------------------------------------------------------- |
| **Funcionalidade**      | ⭐⭐⭐⭐⭐ | Todos os requisitos obrigatórios implementados e funcionando corretamente |
| **Qualidade do Código** | ⭐⭐⭐⭐⭐ | Organização, legibilidade, boas práticas, componentização                 |
| **UX/UI**               | ⭐⭐⭐⭐   | Design atraente, responsividade, usabilidade, feedback visual             |
| **Performance**         | ⭐⭐⭐     | Carregamento rápido, otimizações, evitar re-renders desnecessários        |
| **Diferenciais**        | ⭐⭐⭐     | Implementação de recursos extras, criatividade, inovação                  |
| **Documentação**        | ⭐⭐       | README claro, comentários onde necessário                                 |

---

## 💡 Dicas

- **Comece simples:** Implemente os requisitos obrigatórios primeiro, depois adicione diferenciais
- **Teste sua aplicação:** Verifique se os filtros funcionam corretamente e se não há erros no console
- **Trate edge cases:** O que acontece se a API cair? E se não houver resultados?
- **Pense na experiência:** Como o usuário vai interagir com sua aplicação?
- **Mostre seu melhor:** Este é o momento de demonstrar suas habilidades!

---

## ❓ Dúvidas

Se tiver alguma dúvida sobre o desafio, entre em contato através de **[seu-email@empresa.com]**.

---

## 🕐 Prazo

**Prazo de entrega:** [DEFINIR PRAZO - ex: 7 dias corridos]

---

**Boa sorte! 🚀🐕**

Estamos ansiosos para ver sua solução criativa e técnica para esse desafio!
