import { useState } from "react";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    title: "",
    description: "",
    type: "info" as ToastType,
  });

  const showToast = (data: typeof toast) => {
    setToast(data);
    setOpen(true);
  };

  return {
    open,
    setOpen,
    toast,
    showToast,
  };
};
