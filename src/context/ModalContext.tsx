'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Modal states
  loginModalOpen: boolean;
  colorThemeModalOpen: boolean;
  editPageDetailsModalOpen: boolean;
  freeTrialModalOpen: boolean;
  schedulePrivateModalOpen: boolean;
  
  // Modal actions
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openColorThemeModal: () => void;
  closeColorThemeModal: () => void;
  openEditPageDetailsModal: () => void;
  closeEditPageDetailsModal: () => void;
  openFreeTrialModal: () => void;
  closeFreeTrialModal: () => void;
  openSchedulePrivateModal: () => void;
  closeSchedulePrivateModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [colorThemeModalOpen, setColorThemeModalOpen] = useState(false);
  const [editPageDetailsModalOpen, setEditPageDetailsModalOpen] = useState(false);
  const [freeTrialModalOpen, setFreeTrialModalOpen] = useState(false);
  const [schedulePrivateModalOpen, setSchedulePrivateModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        loginModalOpen,
        colorThemeModalOpen,
        editPageDetailsModalOpen,
        freeTrialModalOpen,
        schedulePrivateModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        openColorThemeModal: () => setColorThemeModalOpen(true),
        closeColorThemeModal: () => setColorThemeModalOpen(false),
        openEditPageDetailsModal: () => setEditPageDetailsModalOpen(true),
        closeEditPageDetailsModal: () => setEditPageDetailsModalOpen(false),
        openFreeTrialModal: () => setFreeTrialModalOpen(true),
        closeFreeTrialModal: () => setFreeTrialModalOpen(false),
        openSchedulePrivateModal: () => setSchedulePrivateModalOpen(true),
        closeSchedulePrivateModal: () => setSchedulePrivateModalOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModals must be used within ModalProvider');
  }
  return context;
}
