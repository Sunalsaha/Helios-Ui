import * as Toast from "@radix-ui/react-toast";
import type { ReactNode } from "react";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Toast.Provider swipeDirection="down" duration={3000}>
      {children}

      <Toast.Viewport
        className="
          fixed bottom-6 right-6 
       
          flex flex-col gap-3
        max-w-[92vw]
          outline-none
        "
      />
    </Toast.Provider>
  );
};

export default ToastProvider;
