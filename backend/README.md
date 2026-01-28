# Dog Backend API - Quick Start

Backend completo para gerenciamento de cachorros com CRUD, paginação e filtros.

## 🚀 Como Usar

### 1. Iniciar PostgreSQL

```bash
cd /home/lucas/works/zellus/front-end-test/backend
docker-compose up -d
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Setup do banco

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

### 4. Iniciar servidor

```bash
npm run dev
```

Servidor rodando em: **http://localhost:3000**

---

## 📚 Endpoints

### GET `/api/dogs` - Listar cachorros

**Query params**:

- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `age` - Idade em anos (0-30)
- `breed` - Raça (SRD, LABRADOR, GOLDEN_RETRIEVER, etc.)
- `sex` - MALE ou FEMALE
- `temperament` - CALM, AGGRESSIVE, ou AFFECTIONATE

**Exemplos**:

```bash
# Paginação básica
curl 'http://localhost:3000/api/dogs?page=1&limit=10'

# Filtrar por raça SRD
curl 'http://localhost:3000/api/dogs?breed=SRD'

# Filtrar por idade
curl 'http://localhost:3000/api/dogs?age=3'

# Múltiplos filtros
curl 'http://localhost:3000/api/dogs?sex=FEMALE&temperament=AFFECTIONATE&limit=5'
```

### GET `/api/dogs/:id` - Buscar por ID

```bash
curl http://localhost:3000/api/dogs/{uuid}
```

### POST `/api/dogs` - Criar cachorro

```bash
curl -X POST http://localhost:3000/api/dogs \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Rex",
    "birth_date": "2020-05-15",
    "breed": "GERMAN_SHEPHERD",
    "temperament": "CALM",
    "sex": "MALE"
  }'
```

### PATCH `/api/dogs/:id` - Atualizar cachorro

```bash
curl -X PATCH http://localhost:3000/api/dogs/{uuid} \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Rex Updated",
    "temperament": "AFFECTIONATE"
  }'
```

### DELETE `/api/dogs/:id` - Deletar cachorro (soft delete)

```bash
curl -X DELETE http://localhost:3000/api/dogs/{uuid}
```

---

## 🗃️ Breeds Disponíveis

`SRD`, `LABRADOR`, `GOLDEN_RETRIEVER`, `GERMAN_SHEPHERD`, `BULLDOG`, `BEAGLE`, `POODLE`, `ROTTWEILER`, `YORKSHIRE_TERRIER`, `BOXER`, `DACHSHUND`, `SIBERIAN_HUSKY`, `DOBERMAN`, `SHIH_TZU`, `CHIHUAHUA`, `POMERANIAN`, `BORDER_COLLIE`, `AUSTRALIAN_SHEPHERD`, `COCKER_SPANIEL`, `MALTESE`

---

## 🎯 Validações

- Nome: obrigatório, 1-100 caracteres
- Data de nascimento: deve ser no passado
- Raça: deve ser uma das breeds válidas
- Temperamento: CALM, AGGRESSIVE, ou AFFECTIONATE
- Sexo: MALE ou FEMALE
- IDs: UUID v4

---

## 📊 Scripts Úteis

```bash
# Ver dados no Prisma Studio
npm run prisma:studio

# Re-seed do banco
npm run prisma:seed

# Build para produção
npm run build
npm start
```

---

**Banco de dados**: PostgreSQL (Docker)  
**Total de cachorros**: 200 (seeded)  
**Porta**: 3000
