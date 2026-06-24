import formattedDate from "./formatDate";

const getStatusInfo = (date, isPaid, detalied = true) => {
  if (isPaid) return { variant: "success", label: "Pago" };

  const today = new Date().toISOString().split("T")[0];

  const diffTime =
    new Date(formattedDate(date)).getTime() - new Date(today).getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return {
      variant: "danger",
      label: detalied ? `Atrasado há ${Math.abs(diffDays)} dias` : "Atrasado",
    };

  if (diffDays <= 3)
    return {
      variant: "warning",
      label: detalied ? `Faltam ${diffDays} dias` : "Vence em breve",
    };

  return { variant: "default", label: "Pendente" };
};

export default getStatusInfo;
