# @hubescola/telemetria-logador

Pacote pequeno de logger sobre `@opentelemetry/api-logs`. Uso no `README.md`. Atenção: existe um `logador` também no repo `telemetry`; confirmar qual é o oficial antes de evoluir este.

## Stack
TypeScript, Node, `@opentelemetry/api-logs` (peer), `node --test`.

## Como rodar
- Instalar: `npm ci` (roda o build)
- Tipos: `npm run typecheck`
- Testes: `npm test` (faz o build e roda `test/logador.test.mjs`)

## Onde está cada coisa
- `src/logador.ts`: o logger
- `test/logador.test.mjs`: testes

## Regras que nunca quebram
- Repo PÚBLICO: nunca colocar segredo, endereço interno, IP ou dado real em código, teste ou README.
- Nunca ler nem alterar `.env`.
- Nunca logar dado sensível (senha, token, CPF, telefone).
- Mudança na API pede versão nova no `package.json`; consumidores fixam por hash de commit, não por tag.
- Antes de criar arquivo ou módulo novo: listar o que existe e esperar aprovação.

## Como trabalhar
- Plano curto antes de mexer em código; tarefas pequenas.
- Dizer quando não tiver certeza e quando o pedido for má ideia.
- Não dizer "pronto" sem rodar `npm run typecheck` e `npm test`.
- PR: título e commits em inglês, descrição em português, sem rodapé de ferramenta.
