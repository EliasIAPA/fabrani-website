import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, ArrowLeft, Save, Shield } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function CloserNewCloser() {
  const { isAdmin } = useCloserAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "closer",
  });

  const createMutation = trpc.closer.createCloser.useMutation({
    onSuccess: () => {
      toast.success("Closer cadastrado com sucesso!");
      utils.closer.listClosers.invalidate();
      setLocation("/closer/closers");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao cadastrar closer");
    },
  });

  if (!isAdmin) {
    return (
      <CloserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="w-12 h-12 text-red-500/50 mx-auto mb-3" />
            <p className="text-gray-500">Acesso restrito a administradores</p>
          </div>
        </div>
      </CloserLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Preencha os campos obrigatórios: Nome, Email e Senha");
      return;
    }
    if (form.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }
    createMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      password: form.password,
      role: form.role as "closer" | "admin",
    });
  };

  return (
    <CloserLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/closer/closers">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-red-400" />
              Novo Closer
            </h1>
            <p className="text-sm text-gray-500">Cadastre um novo vendedor na equipe</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Dados do Closer</h2>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Nome Completo *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Nome do closer"
                className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Email *</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="email@exemplo.com"
                type="email"
                className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Telefone / WhatsApp</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="(00) 00000-0000"
                className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Perfil de Acesso</Label>
              <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="closer" className="text-white">Closer (acesso restrito)</SelectItem>
                  <SelectItem value="admin" className="text-white">Administrador (acesso total)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Senha *</Label>
                <Input
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Confirmar Senha *</Label>
                <Input
                  value={form.confirmPassword}
                  onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="Repita a senha"
                  type="password"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20"
          >
            {createMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Cadastrando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Cadastrar Closer
              </div>
            )}
          </Button>
        </form>
      </div>
    </CloserLayout>
  );
}
