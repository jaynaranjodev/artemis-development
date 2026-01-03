import { useState, useEffect } from 'react';
import ColorPicker from '@/components/ColorPicker';
import styles from './ColorThemeModal.module.css';

interface ColorThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
  onSave: (primaryColor: string, secondaryColor: string) => Promise<void>;
}

export default function ColorThemeModal({
  isOpen,
  onClose,
  primaryColor: initialPrimaryColor,
  secondaryColor: initialSecondaryColor,
  onSave,
}: ColorThemeModalProps) {
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState(initialSecondaryColor);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await onSave(primaryColor, secondaryColor);
      setMessage('Colors saved successfully!');
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 1500);
    } catch (error) {
      setMessage('Failed to save colors');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2>Edit Color Theme</h2>
        <p className={styles.subtitle}>Customize your academy's colors</p>

        <div className={styles.colorGrid}>
          <ColorPicker
            label="Primary Color"
            value={primaryColor}
            onChange={setPrimaryColor}
          />
          <ColorPicker
            label="Secondary Color"
            value={secondaryColor}
            onChange={setSecondaryColor}
          />
        </div>

        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.actions}>
          <button
            onClick={handleSave}
            disabled={saving}
            className={styles.saveBtn}
          >
            {saving ? 'Saving...' : '💾 Save Colors'}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
