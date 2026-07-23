"use client";

import { useEffect, useMemo } from "react";

import { Users, DollarSign, AlertCircle, Clock } from "lucide-react";

import { StatCard, Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Loading } from "../components/Loading";

import { useServiceContext } from "../hook/useServiceContext";
import formatDate from "../utils/formatDate";
import getStatusInfo from "../utils/status";

export default function Dashboard() {
  const { loadServices, services, loading } = useServiceContext();

  useEffect(() => {
    loadServices()
  }, [loadServices]);

  const today = new Date().toISOString().split("T")[0];

  const stats = useMemo(() => {
    let totalReceivable = 0;
    let pending = 0;
    let overdue = 0;

    services.forEach((service) => {
      if (service.pay) return;

      totalReceivable += service.value;

      if (formatDate(service.date_pay) >= today) {
        pending++;
      } else {
        overdue++;
      }
    });

    return {
      totalClients: services.length,
      totalReceivable,
      pending,
      overdue,
    };
  }, [services, today]);

  const upcoming = [...services]
    .filter((c) => !c.pay)
    .sort(
      (a, b) =>
        new Date(formatDate(a.date_pay)).getTime() -
        new Date(formatDate(b.date_pay)).getTime(),
    )
    .slice(0, 5);

  if (loading) {
    return <Loading message="dashboard" />;
  }

  return (
    <div className="page-animate">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Resumo geral das suas cobranças</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          title="Total de Serviços"
          value={`${stats.totalClients}`}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Total a Receber"
          value={`R$ ${stats.totalReceivable.toFixed(2)}`}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Pagamentos Pendentes"
          value={`${stats.pending}`}
          icon={<Clock size={20} />}
          trend={stats.pending > 0 && "warning"}
        />
        <StatCard
          title="Pagamentos Atrasados"
          value={`${stats.overdue}`}
          icon={<AlertCircle size={20} />}
          trend={stats.overdue > 0 && "down"}
          trendLabel={stats.overdue > 0 ? "Ação necessária" : ""}
        />
      </div>

      <Card title="Próximos Vencimentos">
        {upcoming.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((service) => {
                  const status = getStatusInfo(
                    service.date_pay,
                    service.pay,
                  );
                  return (
                    <tr key={service.id}>
                      <td className="font-medium">{service.name_cli}</td>
                      <td>{service.desc_service}</td>
                      <td>R$ {service.value.toFixed(2)}</td>
                      <td>{service.date_pay}</td>
                      <td>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Nenhum vencimento próximo.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
