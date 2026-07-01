"use client";

import { Save, Webhook, Bot } from "lucide-react";

import { Card } from "@/app/components/Card";
import { Button } from "@/app/components/Button";
import { Input, Switch } from "@/app/components/Input";

export default function AutomationConfig() {

  return (
    <div className="page-animate">
      <div className="page-header">
        <div>
          <h1>Automação (n8n)</h1>
          <p>Configure as regras de envio automático de mensagens.</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Card title="Status da Automação">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                backgroundColor: true
                  ? "var(--status-paid-bg)"
                  : "var(--surface-hover)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Bot
                  size={24}
                  className={true ? "text-success" : "text-muted"}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem" }}>
                    Envio Automático
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>
                    {true ? "Ativo e monitorando vencimentos" : "Pausado"}
                  </p>
                </div>
              </div>
              <Switch checked={true} 
              //onChange={() => handleToggle("active")} 
              />
            </div>
          </Card>

          <Card title="Regras de Disparo">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h4 style={{ marginBottom: "0.5rem" }}>Aviso Prévio</h4>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Input
                    type="number"
                    id="daysBefore"
                    value={3}
                    onChange={() => {}}
                    style={{ width: "80px" }}
                    min="1"
                    disabled={!true}
                  />
                  <span className="text-secondary">
                    dias antes do vencimento
                  </span>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: "0.5rem" }}>No Dia</h4>
                <Switch
                  label="Enviar no dia do vencimento"
                  checked={true}
                  //onChange={() => handleToggle("onDueDate")}
                  disabled={!true}
                />
              </div>

              <div>
                <h4 style={{ marginBottom: "0.5rem" }}>Após Atraso</h4>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Input
                    type="number"
                    id="daysAfter"
                    value={2}
                    onChange={() => {}}
                    style={{ width: "80px" }}
                    min="1"
                    disabled={!true}
                  />
                  <span className="text-secondary">dias após o vencimento</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Card title="Template da Mensagem">
            <div style={{ marginBottom: "1rem" }}>
              <label
                className="input-label"
                style={{ display: "block", marginBottom: "0.5rem" }}
              >
                Corpo da Mensagem (WhatsApp)
              </label>
              <textarea
                id="messageTemplate"
                value={
                  "Olá {{nome}}, seu pagamento de R$ {{valor}} vence em {{data}}"
                }
                onChange={() => {}}
                disabled={!true}
                className="input-field"
                style={{
                  width: "100%",
                  minHeight: "150px",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--surface-hover)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Variáveis Disponíveis:
              </h4>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <code
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "var(--surface-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >{`{{nome}}`}</code>
                <code
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "var(--surface-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >{`{{valor}}`}</code>
                <code
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "var(--surface-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >{`{{data}}`}</code>
                <code
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "var(--surface-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >{`{{servico}}`}</code>
              </div>
            </div>
          </Card>

          <Card title="Webhook Integração">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Webhook size={24} className="text-muted" />
              <div style={{ flex: 1 }}>
                <Input
                  value="https://n8n.seu-dominio.com/webhook/cobranca"
                  disabled
                />
              </div>
            </div>
            <p
              className="text-muted"
              style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}
            >
              URL de webhook do n8n para onde o sistema enviará as requisições.
            </p>
          </Card>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => alert("Funcionalidade indisponível")}
          disabled={false}
          icon={<Save size={16} />}
          size="lg"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
