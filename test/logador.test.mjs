import { test } from "node:test";
import assert from "node:assert/strict";
import { criarLogador } from "../dist/logador.js";

function montar() {
  const registros = [];
  const impressos = [];
  const saida = {
    log: (m) => impressos.push(["log", m]),
    warn: (m) => impressos.push(["warn", m]),
    error: (m) => impressos.push(["error", m]),
  };
  const logger = { emit: (r) => registros.push(r) };
  return { logador: criarLogador({ logger, saida }), registros, impressos };
}

test("info vai para o stdout e para o OTel, sem atributos indefinidos", () => {
  const { logador, registros, impressos } = montar();
  logador.info("iniciado", { "http.route": "/x", "error.digest": undefined });
  assert.deepEqual(impressos, [["log", "iniciado"]]);
  assert.equal(registros[0].severityText, "INFO");
  assert.equal(registros[0].body, "iniciado");
  assert.deepEqual(registros[0].attributes, { "http.route": "/x" });
});

test("warn e error usam a saída e a severidade certas, sem atributos", () => {
  const { logador, registros, impressos } = montar();
  logador.warn("atencao");
  logador.error("falhou");
  assert.deepEqual(impressos, [["warn", "atencao"], ["error", "falhou"]]);
  assert.deepEqual(registros.map((r) => r.severityText), ["WARN", "ERROR"]);
  assert.equal(registros[0].attributes, undefined);
});
