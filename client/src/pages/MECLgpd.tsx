import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function MECLgpd() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // Se já está autenticado como admin, redirecionar direto
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      setLocation("/admin/anti-fraude");
    }
  }, [isAuthenticated, user, setLocation]);

  const adminLogin = trpc.auth.adminLogin.useMutation({
    onSuccess: () => {
      // Após login bem-sucedido, redirecionar para o painel
      window.location.href = "/admin/anti-fraude";
    },
    onError: (err) => {
      setError(err.message || "Erro ao fazer login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    adminLogin.mutate({ email, password });
  };

  const handleManusLogin = () => {
    // Salvar a intenção de ir para anti-fraude após login
    sessionStorage.setItem("redirect_after_login", "/admin/anti-fraude");
    window.location.href = getLoginUrl();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* Logo */}
      <div className="mb-8 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white mb-2">
          FABRANI
        </h1>
        <div className="w-20 h-0.5 bg-red-600 mx-auto mb-3" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
          Painel de Proteção de Dados
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Acesso Restrito</h2>
              <p className="text-xs text-gray-500">LGPD &middot; Monitoramento Anti-Fraude</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-800 mb-6" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-400 font-medium">
                E-mail do Administrador
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@fabrani.com.br"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="pl-10 bg-black border-gray-800 text-white placeholder:text-gray-700 focus:border-red-600 focus:ring-red-600/20 h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-400 font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="pl-10 pr-10 bg-black border-gray-800 text-white placeholder:text-gray-700 focus:border-red-600 focus:ring-red-600/20 h-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 border border-red-900/30 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
            >
              {adminLogin.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Acessar Painel
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600 font-mono">OU</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Manus OAuth */}
          <Button
            type="button"
            variant="outline"
            onClick={handleManusLogin}
            className="w-full h-12 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-600 rounded-xl transition-all"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Entrar com Manus
          </Button>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-800/50">
            <p className="text-[10px] text-gray-700 text-center leading-relaxed">
              Acesso restrito a administradores autorizados. Todas as ações são registradas em conformidade com a LGPD (Lei Geral de Proteção de Dados).
            </p>
          </div>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-[10px] text-gray-800 font-mono tracking-wider">
          FABRANI EDUCATION &copy; {new Date().getFullYear()} &middot; SISTEMA DE PROTEÇÃO
        </p>
      </div>
    </div>
  );
}
