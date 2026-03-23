import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function CloserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const loginMutation = trpc.closer.login.useMutation({
    onSuccess: () => {
      utils.closer.me.invalidate();
      toast.success("Login realizado com sucesso!");
      setLocation("/closer");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao fazer login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 mb-4 shadow-lg shadow-red-500/20">
            <span className="text-white font-black text-3xl">F</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">FABRANI</h1>
          <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mt-1">Painel do Closer</p>
        </div>

        {/* Form */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-1">Bem-vindo de volta</h2>
          <p className="text-sm text-gray-500 mb-8">Acesse sua conta para gerenciar vendas</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-red-500/50 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-red-500/50 focus:ring-red-500/20"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all"
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-wider">
          FABRANI &mdash; Faculdade Brasileira de Negócios Inovadores
        </p>
      </div>
    </div>
  );
}
