import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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
