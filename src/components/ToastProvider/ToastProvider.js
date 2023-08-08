import React from 'react';
import useKeyDown from '../../hooks/UseKeyDown';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useKeyDown('Escape', () => {
    setToasts([]);
  });

  function handleCreateToast({ variant, message }) {
    const id = crypto.randomUUID();

    function handleDismiss(toasts) {
      const newToasts = toasts.filter((toast) => {
        return toast.id !== id;
      });
      setToasts(newToasts);
    }

    const newToast = {
      variant: variant,
      message: message,
      id: id,
      handleDismiss: handleDismiss,
    };
    setToasts([...toasts, newToast]);
  }

  const value = {
    toasts,
    handleCreateToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
