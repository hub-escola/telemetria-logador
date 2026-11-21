import { SeverityNumber, type Logger } from "@opentelemetry/api-logs";

export type Atributos = Record<string, string | number | boolean | undefined>;

export type Saida = Pick<Console, "log" | "warn" | "error">;

export type Logador = {
  info(mensagem: string, atributos?: Atributos): void;
  warn(mensagem: string, atributos?: Atributos): void;
  error(mensagem: string, atributos?: Atributos): void;
};

export type DependenciasDoLogador = {
  logger: Logger;
  saida: Saida;
};

function semIndefinidos(atributos?: Atributos): Atributos | undefined {
  if (!atributos) return undefined;
  return Object.fromEntries(Object.entries(atributos).filter(([, valor]) => valor !== undefined));
}

export function criarLogador({ logger, saida }: DependenciasDoLogador): Logador {
  const nivel =
    (severityNumber: SeverityNumber, severityText: string, imprimir: (mensagem: string) => void) =>
    (mensagem: string, atributos?: Atributos) => {
      imprimir(mensagem);
      logger.emit({ severityNumber, severityText, body: mensagem, attributes: semIndefinidos(atributos) });
    };

  return {
    info: nivel(SeverityNumber.INFO, "INFO", (m) => saida.log(m)),
    warn: nivel(SeverityNumber.WARN, "WARN", (m) => saida.warn(m)),
    error: nivel(SeverityNumber.ERROR, "ERROR", (m) => saida.error(m)),
  };
}
