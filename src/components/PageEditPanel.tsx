import { useState } from 'react';
import styles from './PageEditPanel.module.css';

interface PageEditPanelProps {
  isAdmin: boolean;
  onEditColorTheme: () => void;
  onEditPageDetails: () => void;
}

export default function PageEditPanel({ 
  isAdmin, 
  onEditColorTheme, 
  onEditPageDetails 
}: PageEditPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isAdmin) return null;

  return (
    <div className={styles.editPanel}>
      <button 
        className={styles.mainBtn}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        ✏️ Edit Page
        <span className={`${styles.toggle} ${isExpanded ? styles.expanded : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className={styles.subButtons}>
          <button 
            className={styles.subBtn}
            onClick={() => {
              onEditColorTheme();
              setIsExpanded(false);
            }}
          >
            🎨 Edit Color Theme
          </button>
          <button 
            className={styles.subBtn}
            onClick={() => {
              onEditPageDetails();
              setIsExpanded(false);
            }}
          >
            📝 Edit Page Details
          </button>
        </div>
      )}
    </div>
  );
}
