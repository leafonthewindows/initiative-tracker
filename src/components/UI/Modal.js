import React from "react";
import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = (props) => {
  return (
    <div>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.footer}>
          <Button onClick={props.onRemoveModal}>
            {props.cancelButtonText}
          </Button>
          <Button onClick={props.onClearList}>
            {props.continueButtonText}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
