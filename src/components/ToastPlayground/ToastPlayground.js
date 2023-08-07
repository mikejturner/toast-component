import React from 'react';
import ToastShelf from '../ToastShelf';
import ToastForm from '../ToastForm';
import styles from './ToastPlayground.module.css';
import ToastProvider from '../ToastProvider/ToastProvider';

function ToastPlayground() {
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastProvider>
        <ToastShelf />
        <ToastForm />
      </ToastProvider>
    </div>
  );
}

export default ToastPlayground;
