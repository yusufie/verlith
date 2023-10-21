import React from 'react';
import styles from "./modal.module.scss"

type CommonModalProps = {
  message: string;
  onClose: () => void;
};

const CommonModal: React.FC<CommonModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{message}</h2>
        <div className={styles.modalButtons}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;