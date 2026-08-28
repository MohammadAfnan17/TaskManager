import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getStoredUser();
      const token = localStorage.getItem('taskman_token');
      if (storedUser && token) {
        setUser(storedUser);
        try {
          // Verify session token
          const currentUserData = await authService.getCurrentUser();
          setUser((prev) => ({ ...prev, ...currentUserData }));
        } catch (err) {
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
