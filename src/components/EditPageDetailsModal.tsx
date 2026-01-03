import { useState, useEffect } from 'react';
import styles from './EditPageDetailsModal.module.css';

interface EditPageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditingChange: (isEditing: boolean) => void;
}

export default function EditPageDetailsModal({
  isOpen,
  onClose,
  onEditingChange,
}: EditPageDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      onEditingChange(true);
    } else {
      document.body.style.overflow = 'unset';
      onEditingChange(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onEditingChange]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2>Edit Page Details</h2>
        <p className={styles.subtitle}>Click any text on the page to edit it</p>

        <div className={styles.instructions}>
          <p>✏️ <strong>Click any text</strong> on the page to edit it directly</p>
          <p>💾 Changes are saved automatically</p>
          <p>🚫 Press <code>Escape</code> to finish editing</p>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.doneBtn}>
            ✓ Done Editing
          </button>
        </div>
      </div>
    </>
  );
}
