"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, Search, Edit2, Trash2, CheckCircle } from "lucide-react";

import { Card } from "@/app/components/Card";
import { Badge } from "@/app/components/Badge";
import { Button } from "@/app/components/Button";
import { Input, Select } from "@/app/components/Input";
import { Loading } from "@/app/components/Loading";

import { useServiceContext } from "@/app/hook/useServiceContext";
import getStatusInfo from "@/app/utils/status";

export default function ServicesList() {
  const router = useRouter();
  const { loadServices, services, loading, handleMarkAsPaid, handleDelete } =
    useServiceContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name_cli
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "paid"
          ? service.pay
          : !service.pay;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-animate">
      <div className="page-header">
        <div>
          <h1>Serviços e Cobranças</h1>
          <p>Gerencie seus serviços e acompanhe os pagamentos.</p>
        </div>
        <div className="page-header-actions">
          <Button
            onClick={() => router.push("/services/new")}
            icon={<Plus size={16} />}
          >
            Novo Serviço
          </Button>
        </div>
      </div>

      <Card>
        <div
          className="filters-container"
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <Input
              placeholder="Buscar por cliente..."
              id="searchClient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>

          <div style={{ width: "200px" }}>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "Todos os Status" },
                { value: "paid", label: "Pagos" },
                { value: "pending", label: "Pendentes" },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <Loading message="serviços" />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => {
                  const status = getStatusInfo(
                    service.date_pay,
                    service.pay,
                    false,
                  );

                  return (
                    <tr key={service.id}>
                      <td className="font-medium">{service.name_cli}</td>
                      <td>{service.phone}</td>
                      <td>{service.desc_service}</td>
                      <td>R$ {service.value.toFixed(2)}</td>
                      <td>{service.date_pay}</td>
                      <td>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "flex-end",
                          }}
                        >
                          {!service.pay && (
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Marcar como Pago"
                              onClick={() => handleMarkAsPaid(service)}
                            >
                              <CheckCircle size={16} className="text-success" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Editar"
                            onClick={() =>
                              router.push(`/services/edit/${service.id}`)
                            }
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Excluir"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 size={16} className="text-danger" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredServices.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-muted"
                      style={{ padding: "2rem" }}
                    >
                      Nenhum serviço encontrado.
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
