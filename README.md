# EcoPonto BH

## Descrição

O **EcoPonto BH** é uma aplicação web desenvolvida para facilitar a busca e o cadastro de pontos de coleta seletiva e descarte adequado de resíduos. A proposta do sistema é ajudar cidadãos a encontrarem locais apropriados para descartar materiais como papel, plástico, vidro, metal, eletrônicos, pilhas e baterias, contribuindo para práticas mais sustentáveis no contexto urbano.

## ODS Relacionada

**ODS 12 — Consumo e Produção Responsáveis**

O projeto contribui diretamente para a meta 12.5 (redução da geração de resíduos por meio da reciclagem e reutilização) ao facilitar o acesso da população a informações sobre pontos de descarte correto.

## Problema

Muitas pessoas não sabem onde descartar corretamente determinados resíduos, especialmente materiais recicláveis e resíduos especiais como eletrônicos e pilhas. A falta de centralização dessas informações dificulta a adoção de práticas sustentáveis e contribui para o descarte inadequado.

## Solução

Sistema web que centraliza informações sobre pontos de coleta em Belo Horizonte, permitindo consulta, cadastro, edição e remoção de pontos. O usuário pode filtrar por bairro ou tipo de resíduo e visualizar os pontos em um mapa interativo.

## Funcionalidades

- Consultar pontos de coleta cadastrados no mapa
- Pesquisar pontos por bairro e tipo de resíduo
- Visualizar detalhes de cada ponto
- Cadastrar novos pontos de coleta
- Editar informações de pontos existentes
- Remover pontos de coleta

## Requisitos Funcionais

| ID | Descrição |
|----|-----------|
| RF01 | O sistema deve permitir o cadastro de pontos de coleta |
| RF02 | O sistema deve permitir a listagem dos pontos cadastrados |
| RF03 | O sistema deve permitir a busca por bairro, nome ou tipo de resíduo |
| RF04 | O sistema deve permitir a visualização dos detalhes de um ponto |
| RF05 | O sistema deve permitir a edição de pontos de coleta |
| RF06 | O sistema deve permitir a exclusão de pontos de coleta |

## Requisitos Não Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | Interface simples e intuitiva |
| RNF02 | Acessível por navegadores modernos |
| RNF03 | Tempo de resposta adequado para operações de consulta |
| RNF04 | Dados persistidos em banco estruturado |
| RNF05 | Código e documentação em repositório público no GitHub |
| RNF06 | Documentação escrita em Markdown |

## Diagrama de Caso de Uso

![Diagrama de Caso de Uso](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/PGrojpen/Eng_S_TP/main/docs/use_case.puml&fmt=svg)

> Fonte: [`docs/use_case.puml`](docs/use_case.puml)

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Mapa | Leaflet (via react-leaflet) |
| Backend | Node.js + Express 5 + TypeScript |
| ORM | Prisma 7 |
| Banco de Dados | SQLite (via better-sqlite3) |
| HTTP Client | Axios |
| Testes | Jupyter Notebook (Python + requests) |
| Versionamento | Git + GitHub |

## Estrutura do Repositório

```
/
├── frontend/          # Aplicação React (Vite + TypeScript)
├── backend/           # API REST (Express + Prisma + SQLite)
│   ├── prisma/        # Schema e migrations do banco
│   └── src/           # Código-fonte do servidor
├── docs/              # Diagramas e documentação técnica
├── Vídeos/            # Vídeos de apresentação por sprint
├── testes_automatizados.ipynb  # Notebook com 18 testes automatizados
├── documentacao_arquitetura.md # Documentação de arquitetura (C4)
└── TESTES.md          # Casos de teste e resultados de execução
```

## Como Executar

### Pré-requisitos

- Node.js 18+
- Python 3.10+ com `pip`
- Jupyter Notebook (`pip install notebook requests`)

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

O servidor sobe em `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

### Testes Automatizados

Com o backend rodando, abra o `testes_automatizados.ipynb` no Jupyter e execute todas as células:

```bash
jupyter notebook testes_automatizados.ipynb
```

## Documentação

- [Arquitetura do Sistema](documentacao_arquitetura.md)
- [Casos de Teste e Resultados](TESTES.md)
- [Diagrama de Caso de Uso](docs/use_case.puml)
