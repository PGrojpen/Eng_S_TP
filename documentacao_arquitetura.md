# Arquitetura do Sistema — EcoPonto BH

## Sumário

1. [Visão Geral](#visão-geral)
2. [Escolhas de Tecnologia](#escolhas-de-tecnologia)
3. [Modelo Arquitetural (C4)](#modelo-arquitetural-c4)
   - [Nível 1 — Contexto](#nível-1--contexto)
   - [Nível 2 — Containers](#nível-2--containers)
   - [Nível 3 — Componentes](#nível-3--componentes)
4. [Justificativa do Modelo](#justificativa-do-modelo)

---

## Visão Geral

O **EcoPonto BH** é uma aplicação web que centraliza informações sobre pontos de coleta seletiva e descarte adequado de resíduos na cidade de Belo Horizonte. O sistema permite que cidadãos consultem, cadastrem, editem e removam pontos de coleta, com filtragem por bairro, tipo de resíduo e nome.

---

## Escolhas de Tecnologia

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | React + Vite | Biblioteca amplamente adotada para SPAs; Vite oferece build rápido e desenvolvimento moderno |
| Backend | Node.js + Express | Ecossistema JavaScript unificado com o frontend; Express é minimalista e suficiente para uma API REST simples |
| Banco de Dados | SQLite | Banco relacional embutido, sem servidor, ideal para projetos com escopo local e prototipação rápida |
| ORM | Prisma | Abstrai queries SQL, oferece tipagem automática e migrations declarativas |
| Comunicação | REST (JSON) | Padrão simples e amplamente suportado, adequado ao escopo do projeto |

---

## Modelo Arquitetural (C4)

### Nível 1 — Contexto

O sistema EcoPonto BH é uma aplicação web acessada por dois perfis de usuário: o **cidadão** e o **administrador**.

O cidadão é o usuário geral que utiliza o sistema para localizar pontos de coleta próximos e adequados ao tipo de resíduo que deseja descartar. Ele pode consultar a lista de pontos cadastrados, aplicar filtros por bairro ou tipo de resíduo e visualizar os detalhes de cada ponto.

O administrador é o responsável por manter a base de dados atualizada. Ele pode cadastrar novos pontos de coleta, editar informações existentes e remover pontos desatualizados ou incorretos.

Ambos os perfis interagem com o sistema exclusivamente por meio de um navegador web, sem necessidade de instalação de software adicional.

---

### Nível 2 — Containers

O sistema é composto por três containers principais que se comunicam entre si:

**Frontend (SPA — Single Page Application)**
Desenvolvido com React e Vite, é a interface com a qual o usuário interage diretamente pelo navegador. Responsável por exibir os dados, receber entradas do usuário e se comunicar com o backend por meio de requisições HTTP no formato REST/JSON.

**Backend (API REST)**
Desenvolvido com Node.js e Express, expõe os endpoints da API que o frontend consome. É responsável por receber as requisições, aplicar as regras de negócio e coordenar o acesso ao banco de dados por meio do ORM Prisma.

**Banco de Dados**
Utiliza SQLite para persistência dos dados, acessado por meio do driver `better-sqlite3` integrado ao Prisma. Armazena as informações dos pontos de coleta, incluindo nome, endereço, bairro, descrição e tipos de resíduos aceitos. O acesso ao banco é feito exclusivamente pelo backend, via Prisma Client com adapter SQLite.

A comunicação entre o frontend e o backend ocorre via HTTP/REST. O backend acessa o banco de dados por meio do Prisma Client, que traduz as operações em queries SQL.

---

### Nível 3 — Componentes

#### Frontend

O frontend é organizado em páginas e componentes reutilizáveis, com um módulo de serviços responsável pela comunicação com a API.

As **páginas** estruturam as rotas da aplicação:
- `Home`: página inicial com apresentação do sistema e acesso à listagem de pontos.
- `PontosList`: exibe todos os pontos cadastrados, com suporte a filtros e busca.
- `PontoDetail`: apresenta os detalhes completos de um ponto de coleta selecionado.
- `PontoForm`: formulário utilizado tanto para cadastro quanto para edição de pontos.

Os **componentes** são elementos de interface reutilizáveis:
- `SearchBar`: campo de busca por nome, bairro ou tipo de resíduo.
- `FilterPanel`: painel de filtros por tipo de resíduo e bairro.
- `PontoCard`: card com exibição resumida de um ponto, utilizado na listagem.

O módulo de **Services** centraliza todas as chamadas HTTP à API, abstraindo os detalhes de comunicação do restante da aplicação.

#### Backend

O backend segue uma arquitetura em camadas com separação entre roteamento, controle e lógica de negócio.

As **rotas** definem os endpoints REST disponíveis e mapeiam cada requisição para o controller correspondente.

Os **controllers** recebem as requisições HTTP, extraem os parâmetros necessários, delegam o processamento ao service e retornam a resposta ao cliente.

Os **services** concentram as regras de negócio e validações da aplicação, mantendo os controllers simples e focados apenas no tratamento das requisições.

O **Prisma Client** é utilizado pelos services para realizar as operações no banco de dados, funcionando como a camada de acesso a dados.

**Endpoints da API:**

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/pontos` | Lista todos os pontos ordenados por data de criação (mais recente primeiro) |
| `GET` | `/api/pontos/:id` | Retorna os detalhes de um ponto específico |
| `POST` | `/api/pontos` | Cadastra um novo ponto de coleta |
| `PUT` | `/api/pontos/:id` | Atualiza os dados de um ponto existente |
| `DELETE` | `/api/pontos/:id` | Remove um ponto de coleta |

#### Modelo de Dados

A entidade principal do sistema é o **Ponto de Coleta**, com os seguintes atributos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Inteiro (PK) | Identificador único gerado automaticamente |
| `nome` | Texto | Nome do ponto de coleta |
| `endereco` | Texto | Endereço completo |
| `bairro` | Texto | Bairro onde o ponto está localizado |
| `descricao` | Texto (opcional) | Informações adicionais sobre o ponto |
| `residuos` | Lista de texto | Tipos de resíduos aceitos (ex: papel, plástico, eletrônicos) |
| `createdAt` | Data/hora | Data de criação do registro |
| `updatedAt` | Data/hora | Data da última atualização |

---

## Justificativa do Modelo

A arquitetura adotada segue o padrão **cliente-servidor em três camadas** — frontend, backend e banco de dados — representado pelo modelo C4 nos níveis de Contexto, Container e Componente.

**Separação de responsabilidades:** A divisão em três camadas isola cada preocupação do sistema — interface, lógica de negócio e persistência. Isso facilita a manutenção, os testes e a evolução independente de cada parte sem impactar as demais.

**Adequação ao escopo:** Para um sistema CRUD com busca e filtragem, uma API REST com banco relacional é a solução mais direta e suficiente. Arquiteturas mais complexas, como microserviços ou sistemas orientados a eventos, seriam desnecessárias para o volume e a complexidade atuais do projeto.

**Stack unificada em JavaScript:** O uso de Node.js no backend e React no frontend permite que toda a aplicação seja desenvolvida em uma única linguagem, reduzindo a curva de aprendizado e simplificando o ambiente de desenvolvimento.

**Prisma como ORM:** Além de abstrair o SQL, o Prisma documenta o modelo de dados de forma declarativa por meio do schema e gerencia as migrations do banco, tornando as mudanças na estrutura de dados rastreáveis e reproduzíveis.

**Escalabilidade gradual:** O modelo escolhido permite que o sistema evolua sem reestruturação — por exemplo, adicionando autenticação de usuários, integração com APIs de mapeamento ou um painel administrativo dedicado — sem comprometer a arquitetura base.

### Limitações conhecidas

O sistema não implementa autenticação neste estágio, o que significa que qualquer usuário pode cadastrar, editar ou remover pontos de coleta. O campo de tipos de resíduos é armazenado como uma lista de strings; em versões futuras, isso pode ser normalizado em uma tabela separada para maior flexibilidade de filtragem e consistência dos dados.
