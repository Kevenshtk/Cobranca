"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { ArrowLeft, Save, X } from "lucide-react";

import { Card } from "@/app/components/Card";
import { Button } from "@/app/components/Button";
import { InputForm, Switch } from "@/app/components/Input";
import { Loading } from "@/app/components/Loading";

import { ServiceContext } from "@/app/context/serviceContext";
import formattedDate from "@/app/utils/formatDate";

export default function ServiceForm() {
  const { id } = useParams();
  const router = useRouter();

  const isEditing = Boolean(id);

  const { loadService, service, clearService, loading, handleAdd, handleUpdate } =
    useContext(ServiceContext);

  const [pago, setPago] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name_cli: "",
      phone: "",
      desc_service: "",
      value: "",
      date_pay: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      loadService(id);
      return;
    }

    clearService(null);

    reset();

    setPago(false);
  }, [isEditing, id, loadService, clearService, reset]);

  useEffect(() => {
    if (!service || !isEditing) return;

    reset({
      name_cli: service.name_cli,
      phone: service.phone,
      desc_service: service.desc_service,
      value: service.value,
      date_pay: formattedDate(service.date_pay),
    });

    setPago(service.pay);
  }, [service, reset, isEditing]);

  const handleSwitchChange = (checked) => {
    setPago(checked);
  };

  const onSubmit = async (d) => {
    const data = {
      ...d,
      value: parseFloat(d.value),
      pay: pago,
    };

    if (isEditing) {
      await handleUpdate(id, data);
    } else {
      await handleAdd(data);
    }

    router.back();
  };

  if (loading) {
    return <Loading message="dados" />;
  }

  return (
    <div className="page-animate">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1>{isEditing ? "Editar Serviço" : "Novo Serviço"}</h1>
            <p>
              {isEditing
                ? "Atualize os dados do serviço."
                : "Cadastre um novo serviço para cobrança."}
            </p>
          </div>
        </div>
      </div>

      <Card style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label="Nome Completo"
            id="name_cli"
            errors={errors}
            register={register}
            placeholder="Ex: João da Silva"
          />

          <InputForm
            label="Telefone (WhatsApp)"
            id="phone"
            type="tel"
            errors={errors}
            register={register}
            placeholder="Ex: 5511999999999"
          />

          <InputForm
            label="Serviço Prestado"
            id="desc_service"
            errors={errors}
            register={register}
            placeholder="Ex: Consultoria SEO"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <InputForm
              label="Valor (R$)"
              id="value"
              type="number"
              errors={errors}
              register={register}
              step="0.01"
              placeholder="0.00"
            />

            <InputForm
              label="Data de Pagamento (Vencimento)"
              id="date_pay"
              errors={errors}
              register={register}
              type="date"
            />
          </div>

          <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
            <Switch
              label="Marcar como Pago"
              checked={pago}
              onChange={handleSwitchChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "1.5rem",
            }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              icon={<X size={16} />}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              icon={<Save size={16} />}
            >
              {isSubmitting ? "Salvando..." : "Salvar Serviço"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
