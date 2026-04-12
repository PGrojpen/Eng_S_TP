# Requisitos do Projeto (TP1)

## 1) Escopo
O EcoPonto BH permitirá que cidadãos encontrem pontos de coleta e que administradores mantenham os dados atualizados.

## 2) Perfis de usuário
- **Cidadão:** consulta, busca e visualiza detalhes dos pontos de coleta.
- **Administrador:** cadastra, edita e remove pontos de coleta.

## 3) Requisitos funcionais (RF)
- **RF01** — Cadastrar ponto de coleta com nome, endereço, bairro, tipos de resíduos aceitos e horário.
- **RF02** — Listar pontos de coleta cadastrados.
- **RF03** — Buscar pontos por bairro, nome ou tipo de resíduo.
- **RF04** — Visualizar detalhes completos de um ponto.
- **RF05** — Editar dados de um ponto existente.
- **RF06** — Remover ponto de coleta.

## 4) Requisitos não funcionais (RNF)
- **RNF01** — Interface simples e intuitiva para uso em desktop e mobile.
- **RNF02** — Compatibilidade com navegadores modernos.
- **RNF03** — Tempo de resposta de consulta em até 2 segundos em condições normais.
- **RNF04** — Persistência dos dados em banco de dados.
- **RNF05** — Código e documentação em repositório público no GitHub.
- **RNF06** — Documentação escrita em Markdown.

## 5) Histórias de usuário e critérios de aceite

### HU01 — Buscar pontos de coleta
**Como** cidadão, **quero** buscar pontos por bairro ou tipo de resíduo, **para** descartar corretamente.

**Critérios de aceite**
- Dado que estou na tela de busca, quando informo um critério válido, então vejo resultados correspondentes.
- Dado que não há resultados, quando busco, então o sistema informa que nenhum ponto foi encontrado.

### HU02 — Visualizar detalhes
**Como** cidadão, **quero** abrir os detalhes de um ponto, **para** saber endereço, horários e resíduos aceitos.

**Critérios de aceite**
- Ao selecionar um ponto listado, devo visualizar todos os campos obrigatórios.

### HU03 — Cadastrar ponto
**Como** administrador, **quero** cadastrar um novo ponto, **para** manter a base atualizada.

**Critérios de aceite**
- Campos obrigatórios devem ser validados antes de salvar.
- Após salvar com sucesso, o novo ponto deve aparecer na listagem.

### HU04 — Editar ponto
**Como** administrador, **quero** editar um ponto existente, **para** corrigir informações.

**Critérios de aceite**
- Ao salvar alterações válidas, os novos dados devem ser exibidos na listagem e nos detalhes.

### HU05 — Excluir ponto
**Como** administrador, **quero** excluir um ponto desatualizado, **para** evitar informações incorretas.

**Critérios de aceite**
- O sistema deve pedir confirmação antes da exclusão.
- Após confirmar, o ponto não deve mais aparecer na listagem.
