import { toast } from "sonner";

const showSuccess = (msg: string): void => {
  toast.success(msg);
};

const showError = (msg: string): void => {
  toast.info(msg);
};

const showDelete = (msg: string, onConfirm: () => void | Promise<void>): void => {
  toast(msg, {
    action: {
      label: "Excluir",
      onClick: onConfirm,
    },
    cancel: {
      label: "Cancelar",
       onClick: () => {},
    },
  });
};

const alert = {
  success: showSuccess,
  error: showError,
  del: showDelete,
};

export default alert;
