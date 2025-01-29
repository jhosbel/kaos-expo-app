// auth-context.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: { email: string; name: string } | null;
  login: (userData: { email: string; name: string }) => void;
  logout: () => void;
  dataUser: any;
  setDataUser: any;
  token: any;
  setToken: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const [dataUser, setDataUser] = useState();
  const [token, setToken] = useState();

  const login = (userData: { email: string; name: string }) => {
    setUser(userData);
    AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        dataUser,
        setDataUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
