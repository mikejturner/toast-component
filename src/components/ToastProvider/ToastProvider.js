import React from 'react';
import useKeydown from '../../hooks/use-keydown';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useKeydown('Escape', () => {
    setToasts([]);
  });

  function createToast(variant, message) {
    const id = crypto.randomUUID();

    const newToast = {
      variant: variant,
      message: message,
      id: id,
    };
    setToasts([...toasts, newToast]);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(newToasts);
  }

  const value = {
    toasts,
    createToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
