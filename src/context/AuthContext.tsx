'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AdminSession {
  username: string;
  role: string;
  loginTime: string;
}

interface AuthContextType {
  isAdmin: boolean;
  session: AdminSession | null;
  login: (token: string, session: AdminSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const sessionData = localStorage.getItem('admin_session');
    if (token && sessionData) {
      setIsAdmin(true);
      setSession(JSON.parse(sessionData));
    }
  }, []);

  const login = (token: string, sessionData: AdminSession) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_session', JSON.stringify(sessionData));
    setIsAdmin(true);
    setSession(sessionData);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_session');
    setIsAdmin(false);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
