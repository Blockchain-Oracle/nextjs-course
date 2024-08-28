import React from "react";
import styles from "./modal.module.css";

export default function Modal({ children, handleClose }) {
  return (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              handleClose();
            }
          }}
          tabIndex="0"
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Add New Post</h2>
            <button className={styles.modalCloseButton} onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </>
  );
}
