# @hubescola/telemetria-logador

Logador pequeno para OpenTelemetry, sem dependências de runtime. Recebe o logger e a saída por parâmetro (injeção de dependência), então nada fica global.

```ts
import { logs } from "@opentelemetry/api-logs";
import { criarLogador } from "@hubescola/telemetria-logador";

const logador = criarLogador({ logger: logs.getLogger("meu-servico"), saida: console });
logador.info("iniciado", { "http.route": "/x" });
```

Instalação, pinada por commit:

```json
"@hubescola/telemetria-logador": "git+https://github.com/hub-escola/telemetria-logador.git#<hash>"
```

Requer `@opentelemetry/api-logs` 0.223.x no projeto que consome.
