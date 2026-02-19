"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // cargar token del localStorage al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // validacion basica
      if (!email || !password) {
        toast.error("Debes completar todos los campos");
        setIsLoading(false);
        return;
      }
      
      // simulamos peticion al servidor con timeout de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // generamos un token aleatorio
      const randomToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // guardamos en localStorage y cookie
      localStorage.setItem("token", randomToken);
      document.cookie = `token=${randomToken}; path=/; max-age=86400`; // expira en 24h
      setToken(randomToken);
      
      toast.success("Login exitoso");
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error al iniciar sesion");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0"; // eliminar cookie
    setToken(null);
    toast.success("Sesion cerrada");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
