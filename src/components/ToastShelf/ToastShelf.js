import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from '../ToastPlayground';

function ToastShelf() {
  const toasts = React.useContext(ToastContext);
  console.log(toasts);
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => {
        console.log(`create each toast ${toast}`);
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              variant={toast.variant}
              handleDismiss={() => {
                toast.handleDismiss(toasts);
              }}
            >
              {toast.message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
