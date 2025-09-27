import {
  createContext,
  useState,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { Toast } from "../components/ui/Toast";

type ToastMessage = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  addToast: (message: string, type: ToastMessage["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastMessage["type"]) => {
      const id = Date.now();
      setToasts((currentToasts) => [...currentToasts, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
