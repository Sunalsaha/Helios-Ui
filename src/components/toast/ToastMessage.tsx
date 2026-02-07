import * as Toast from "@radix-ui/react-toast";
import { CheckCircle, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: ToastType;
}

const icons = {
  success: <CheckCircle className="text-green-600" size={20} />,
  error: <XCircle className="text-red-600" size={20} />,
  info: <Info className="text-blue-600" size={20} />,
};

const ToastMessage = ({
  open,
  onOpenChange,
  title,
  description,
  type = "info",
}: Props) => {
  return (
    <Toast.Root
      open={open}
      onOpenChange={onOpenChange}
      className="
        bg-[#fffaf5] border border-gray-200 rounded-xl shadow-lg
        p-4 flex gap-3 items-start
        data-[state=open]:animate-slideIn
        data-[state=closed]:animate-fadeOut
      "
    >
      {icons[type]}

      <div className="flex-1">
        <Toast.Title className="font-semibold text-gray-900">
          {title}
        </Toast.Title>

        {description && (
          <Toast.Description className="text-sm text-gray-600 mt-1">
            {description}
          </Toast.Description>
        )}
      </div>

      <Toast.Close className="text-gray-400 hover:text-gray-600">
        ✕
      </Toast.Close>
    </Toast.Root>
  );
};

export default ToastMessage;
