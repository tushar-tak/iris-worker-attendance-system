import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AdminUser = {
  username: string;
  name: string;
  role: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isHydrating: boolean;
  admin: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STATIC_ADMINS: Array<{ username: string; password: string; name: string }>= [
  { username: 'test1', password: 'pass', name: 'Test Admin 1' },
  { username: 'test2', password: 'pass2', name: 'Test Admin 2' },
  { username: 'test3', password: 'pass3', name: 'Test Admin 3' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        const parsed: AdminUser = JSON.parse(stored);
        setAdmin(parsed);
      } catch {}
    }
    setIsHydrating(false);
  }, []);

  const login = async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    const user = STATIC_ADMINS.find(u => u.username === username && u.password === password);
    if (user) {
      const profile: AdminUser = { username: user.username, name: user.name, role: "MNREGA Supervisor" };
      setAdmin(profile);
      localStorage.setItem('authUser', JSON.stringify(profile));
      localStorage.setItem('authToken', 'demo-token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  const value = useMemo(
    () => ({ isAuthenticated: Boolean(admin), isHydrating, admin, login, logout }),
    [admin, isHydrating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
} 