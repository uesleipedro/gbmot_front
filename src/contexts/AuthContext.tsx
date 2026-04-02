"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/Api";

interface User {
  id_user: number;
  email: string;
  nome: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    const response = await api.post("/users/login", { email, senha });

    const data = await response.data;
    if (data.error) {
      throw new Error(data);
    }

    const { token, foundUser } = response.data;

    document.cookie = `token=${token}; path=/`;
    localStorage.setItem("user", JSON.stringify(foundUser));

    setUser(foundUser);
    router.push("/sistema");
  };

  const logout = () => {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.removeItem("user");
    setUser(null);

    router.push("/publico/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

