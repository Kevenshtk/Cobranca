import { toast } from "sonner";

const showSuccess = (msg) => {
  toast.success(msg);
};

const showError = (msg) => {
  toast.info(msg);
};

const showDelete = (msg, onConfirm) => {
  toast(msg, {
    action: {
      label: "Excluir",
      onClick: onConfirm,
    },
    cancel: {
      label: "Cancelar",
    },
  });
};

const alert = {
  success: showSuccess,
  error: showError,
  del: showDelete,
};

export default alert;
