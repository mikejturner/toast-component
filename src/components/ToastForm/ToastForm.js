import React from 'react';

import Button from '../Button';
import styles from './ToastForm.module.css';
import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];
const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

const DEFAULT_MESSAGE = '';

function ToastForm() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);
  const { handleCreateToast } = React.useContext(ToastContext);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleCreateToast({ variant, message });
        // Reset the message and variant to defaults
        setMessage(DEFAULT_MESSAGE);
        setVariant(DEFAULT_VARIANT);
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
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
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
  );
}

export default ToastForm;
