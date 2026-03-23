import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function CloserNewClient() {
  useCloserAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    companyName: "",
    mainPartner: "",
    cnpj: "",
    cpf: "",
    rg: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    whatsapp: "",
  });

  const createMutation = trpc.closer.createClient.useMutation({
    onSuccess: () => {
      toast.success("Cliente cadastrado com sucesso!");
      utils.closer.listClients.invalidate();
      setLocation("/closer/clientes");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao cadastrar cliente");
    },
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.mainPartner || !form.whatsapp) {
      toast.error("Preencha os campos obrigatórios: Nome da Empresa, Sócio Principal e WhatsApp");
      return;
    }
    createMutation.mutate(form);
  };

  return (
    <CloserLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/closer/clientes">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-red-400" />
              Novo Cliente
            </h1>
            <p className="text-sm text-gray-500">Cadastre os dados do cliente</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados da Empresa */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Dados da Empresa</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Nome da Empresa *</Label>
                <Input
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="Razão Social ou Nome Fantasia"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Sócio Principal *</Label>
                <Input
                  value={form.mainPartner}
                  onChange={(e) => handleChange("mainPartner", e.target.value)}
                  placeholder="Nome completo do sócio"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">CNPJ</Label>
                <Input
                  value={form.cnpj}
                  onChange={(e) => handleChange("cnpj", e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">CPF</Label>
                <Input
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">RG</Label>
                <Input
                  value={form.rg}
                  onChange={(e) => handleChange("rg", e.target.value)}
                  placeholder="00.000.000-0"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">WhatsApp *</Label>
              <Input
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="(00) 00000-0000"
                className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Endereço Completo</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label className="text-gray-400 text-xs">Rua / Logradouro</Label>
                <Input
                  value={form.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  placeholder="Rua, Avenida, etc."
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Número</Label>
                <Input
                  value={form.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                  placeholder="123"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Complemento</Label>
                <Input
                  value={form.complement}
                  onChange={(e) => handleChange("complement", e.target.value)}
                  placeholder="Sala, Andar, etc."
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Bairro</Label>
                <Input
                  value={form.neighborhood}
                  onChange={(e) => handleChange("neighborhood", e.target.value)}
                  placeholder="Bairro"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Cidade</Label>
                <Input
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Cidade"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Estado</Label>
                <Input
                  value={form.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="SP"
                  maxLength={2}
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">CEP</Label>
                <Input
                  value={form.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  placeholder="00000-000"
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
                Salvando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Cadastrar Cliente
              </div>
            )}
          </Button>
        </form>
      </div>
    </CloserLayout>
  );
}
