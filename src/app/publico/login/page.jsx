"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!email || !senha) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Por favor, preencha todos os campos.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, senha);
      // O redirecionamento provavelmente é feito dentro do contexto ou em um useEffect
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro ao fazer login",
        text: err.response?.data?.error || "Verifique suas credenciais e tente novamente.",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-700 to-red-500 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Bem-vindo
            </h1>
            <p className="text-gray-500 mt-2">Faça login para continuar</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo Email */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           transition-all duration-200 bg-gray-50/50 hover:bg-white
                           placeholder:text-gray-400"
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           transition-all duration-200 bg-gray-50/50 hover:bg-white
                           placeholder:text-gray-400"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-700 to-red-400 hover:from-red-600 hover:to-red-500
                       text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200
                       transform hover:scale-[1.02] active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       shadow-lg shadow-red-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
