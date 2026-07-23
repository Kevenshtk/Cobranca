"use client";

import { useEffect } from "react";

import { Card } from "@/app/components/Card";
import { Badge } from "@/app/components/Badge";
import { Loading } from "@/app/components/Loading";

import { useServiceContext } from "@/app/hook/useServiceContext";

export default function History() {
  const { loadHistory, history, loading } = useServiceContext();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="page-animate">
      <div className="page-header">
        <div>
          <h1>Histórico de Envios</h1>
          <p>Acompanhe as mensagens enviadas pela automação.</p>
        </div>
      </div>

      <Card>
        {loading ? (
          <Loading message="histórico" />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data / Hora</th>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.date).toLocaleString("pt-BR")}</td>
                    <td className="font-medium">{item.name_cli}</td>
                    <td>{item.phone}</td>
                    <td>{item.desc_service}</td>
                    <td>
                      <Badge variant="default">{item.type_msg}</Badge>
                    </td>
                  </tr>
                ))}

                {history.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-muted"
                      style={{ padding: "2rem" }}
                    >
                      Nenhum histórico encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
