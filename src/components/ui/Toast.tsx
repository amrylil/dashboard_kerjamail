import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

const icons = {
  success: <CheckCircle className="h-6 w-6 text-green-500" />,
  error: <XCircle className="h-6 w-6 text-red-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
};

const colors = {
  success:
    "bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-700",
  error: "bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-700",
  info: "bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700 ",
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onClose, 300);
      return () => clearTimeout(exitTimer);
    }, 4700);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const animationClasses = isExiting
    ? "opacity-0 translate-x-full"
    : "opacity-100 translate-x-0";

  return (
    <div
      className={`max-w-sm w-full p-4 translate-y-5 rounded-xl shadow-lg border flex justify-center items-start gap-3 transform transition-all duration-300 ease-in-out ${colors[type]} ${animationClasses}`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {message}
        </p>
      </div>
      <button
        onClick={handleClose}
        className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
      >
        <X className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
};
