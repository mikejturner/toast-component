import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

export const ToastContext = React.createContext();

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  function addToast() {
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

  return (
    <ToastContext.Provider value={toasts}>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

        <ToastShelf />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addToast();
            // Reset the message and variant to defaults
            setMessage('');
            setVariant(VARIANT_OPTIONS[0]);
          }}
        >
          <div className={styles.controlsWrapper}>
            <div className={styles.row}>
              <label
                htmlFor="message"
                className={styles.label}
                style={{ alignSelf: 'baseline' }}
              >
                Message
              </label>
              <div className={styles.inputWrapper}>
                <textarea
                  id="message"
                  className={styles.messageInput}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Variant</div>
              <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                {VARIANT_OPTIONS.map((option, index) => {
                  return (
                    <label key={index} htmlFor={option}>
                      <input
                        id={option}
                        type="radio"
                        name="variant"
                        value={option}
                        checked={variant === option}
                        onChange={(event) => {
                          setVariant(event.target.value);
                        }}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label} />
              <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                <Button type="submit">Pop Toast!</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastPlayground;
