import React from "react"
import styles from "./loginmodal.module.scss"

interface LoginModalProps {
  signIn: () => void;
  closeLoginModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({signIn, closeLoginModal}) => {
  return (
    <div className={styles.modal}>

      <div className={styles.modalContent}>
        <h2>Connect Your Wallet or Login</h2>
        <p>To be able to create content, you need to connect your wallet or login</p>
        <div className={styles.modalButtons}>
          <button onClick={() => signIn()}>Login</button>

          <button onClick={closeLoginModal}>Close</button>
        </div>
      </div>

    </div>
  )
}

export default LoginModal