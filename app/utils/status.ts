import formatDate from "./formatDate";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger";

interface StatusInfo {
  variant: BadgeVariant;
  label: string; 
}

const getStatusInfo = (date: string , isPaid: boolean, detailed: boolean = true): StatusInfo => {
  if (isPaid) return { variant: "success", label: "Pago" };

  const today = new Date().toISOString().split("T")[0];

  const diffTime =
    new Date(formatDate(date)).getTime() - new Date(today).getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return {
      variant: "danger",
      label: detailed ? `Atrasado há ${Math.abs(diffDays)} dias` : "Atrasado",
    };

  if (diffDays <= 3)
    return {
      variant: "warning",
      label: detailed ? `Faltam ${diffDays} dias` : "Vence em breve",
    };

  return { variant: "default", label: "Pendente" };
};

export default getStatusInfo;
