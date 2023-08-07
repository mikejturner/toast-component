import React from 'react';
import useKeyDown from '../../hooks/UseKeyDown';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useKeyDown('Escape', () => {
    setToasts([]);
  });

  function addToast({ variant, message }) {
    const id = crypto.randomUUID();

    function handleDismiss(toasts) {
      const newToasts = [];
      toasts.forEach((element) => {
        if (element.id !== id) {
          console.log(element.id);
          newToasts.push(element);
        }
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
    addToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
