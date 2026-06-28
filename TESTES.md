# Casos de Teste — EcoPonto BH

Documento de registro dos casos de teste (TCs) do sistema EcoPonto BH, organizados por caso de uso. Cada UC possui 3 TCs: **fluxo principal**, **edge case** e **fluxo de exceção**.

Os testes são executados de forma automatizada via `testes_automatizados.ipynb` (Jupyter Notebook + Python).

**Resultado geral da última execução: ✅ 18/18 testes passaram**

---

## UC1 — Consultar pontos de coleta

`GET /api/pontos`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC1-T1 | Fluxo Principal | Requisição GET para listar todos os pontos | Status 200 e corpo com lista JSON | ✅ PASSOU |
| UC1-T2 | Edge Case | Campo `residuos` de cada ponto retornado como lista Python (não string serializada) | Todos os pontos com `residuos` do tipo `list` | ✅ PASSOU |
| UC1-T3 | Exceção | Requisição para rota inválida (`/api/pontos/rota-inexistente`) | Status 404 | ✅ PASSOU |

---

## UC2 — Pesquisar pontos de coleta

Filtragem client-side sobre `GET /api/pontos`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC2-T1 | Fluxo Principal | Filtrar lista de pontos pelo bairro "Savassi" | Retorna apenas pontos do bairro informado | ✅ PASSOU |
| UC2-T2 | Edge Case | Filtrar pontos que aceitam o resíduo "Papel" | Retorna apenas pontos com "Papel" na lista de resíduos | ✅ PASSOU |
| UC2-T3 | Exceção | Filtrar por bairro inexistente ("BairroQueNaoExiste123") | Retorna lista vazia sem erro | ✅ PASSOU |

---

## UC3 — Visualizar detalhes do ponto

`GET /api/pontos/:id`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC3-T1 | Fluxo Principal | Buscar ponto por ID válido | Status 200 com todos os campos obrigatórios (id, nome, endereco, bairro, residuos, latitude, longitude) | ✅ PASSOU |
| UC3-T2 | Edge Case | Buscar ponto com múltiplos resíduos e descrição preenchida | `residuos` como lista com 3 itens, `descricao` não nula, `latitude` e `longitude` como float | ✅ PASSOU |
| UC3-T3 | Exceção | Buscar ponto com ID inexistente (999999) | Status 404 com campo `error` no corpo | ✅ PASSOU |

---

## UC4 — Cadastrar ponto de coleta

`POST /api/pontos`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC4-T1 | Fluxo Principal | POST com todos os campos preenchidos | Status 201 com ponto criado contendo `id` gerado, nome e resíduos corretos | ✅ PASSOU |
| UC4-T2 | Edge Case | POST sem os campos opcionais `descricao` e `residuos` | Status 201 com `descricao: null` e `residuos: []` | ✅ PASSOU |
| UC4-T3 | Exceção | POST sem os campos obrigatórios (nome, endereço, bairro, coordenadas) | Status 400 com mensagem de erro | ✅ PASSOU |

---

## UC5 — Editar ponto de coleta

`PUT /api/pontos/:id`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC5-T1 | Fluxo Principal | PUT com novos valores para `nome` e `residuos` | Status 200 com dados atualizados na resposta | ✅ PASSOU |
| UC5-T2 | Edge Case | PUT com apenas o campo `bairro` (edição parcial) | Status 200; `bairro` atualizado e demais campos preservados | ✅ PASSOU |
| UC5-T3 | Exceção | PUT com ID inexistente (999999) | Status 404 ou 500 (registro não encontrado no banco) | ✅ PASSOU |

---

## UC6 — Excluir ponto de coleta

`DELETE /api/pontos/:id`

| ID | Tipo | Descrição | Resultado Esperado | Resultado Obtido |
|----|------|-----------|-------------------|-----------------|
| UC6-T1 | Fluxo Principal | DELETE de ponto existente | Status 204; GET do mesmo ID retorna 404 | ✅ PASSOU |
| UC6-T2 | Edge Case | Após DELETE, verificar que ponto não aparece na listagem geral | Ponto ausente na lista retornada por GET /api/pontos | ✅ PASSOU |
| UC6-T3 | Exceção | DELETE com ID inexistente (999999) | Status 404 ou 500 (Prisma lança P2025) | ✅ PASSOU |

---

## Resumo da Execução

| Métrica | Valor |
|---------|-------|
| Total de TCs | 18 |
| Passaram | 18 |
| Falharam | 0 |
| Taxa de sucesso | 100% |
| Ferramenta | Jupyter Notebook (Python + `requests`) |
| Arquivo | [`testes_automatizados.ipynb`](testes_automatizados.ipynb) |

---

## Como Reproduzir

1. Inicie o backend: `cd backend && npm run dev`
2. Abra o notebook: `jupyter notebook testes_automatizados.ipynb`
3. Execute todas as células em ordem (Kernel → Restart & Run All)
