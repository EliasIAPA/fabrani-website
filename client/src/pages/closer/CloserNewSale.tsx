import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const PROJECT_TYPES = [
  { value: "certificacao_mec", label: "Certificação MEC" },
  { value: "projeto_alianca", label: "Projeto Aliança" },
  { value: "pos_mba_parceiros", label: "Pós/MBA Parceiros" },
  { value: "mentoria_ni1", label: "Mentoria NI1 Negócios Inovadores" },
];

const PAYMENT_METHODS = [
  { value: "cartao_credito", label: "Cartão de Crédito" },
  { value: "pix", label: "PIX" },
  { value: "boleto", label: "Boleto" },
];

export default function CloserNewSale() {
  const { closer } = useCloserAuth();
  const [, setLocation] = useLocation();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const utils = trpc.useUtils();

  const clientsInput = useMemo(() => ({ limit: 200 }), []);
  const { data: clientsData } = trpc.closer.listClients.useQuery(clientsInput, { enabled: !!closer });
  const proposalsInput = useMemo(() => ({ status: "enviada" as const, limit: 200 }), []);
  const { data: proposalsData } = trpc.closer.listProposals.useQuery(proposalsInput, { enabled: !!closer });

  const [form, setForm] = useState({
    proposalId: params.get("proposalId") || "",
    clientId: params.get("clientId") || "",
    projectType: params.get("projectType") || "",
    totalValue: params.get("value") || "",
    paymentMethod: "",
    installments: "1",
    downPayment: "",
    installmentValue: "",
    numberOfCourses: params.get("courses") || "1",
    observation: "",
  });

  const createMutation = trpc.closer.createSale.useMutation({
    onSuccess: () => {
      toast.success("Venda registrada com sucesso!");
      utils.closer.listSales.invalidate();
      utils.closer.listProposals.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/vendas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao registrar venda");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.proposalId || !form.clientId || !form.projectType || !form.totalValue || !form.paymentMethod) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    createMutation.mutate({
      proposalId: parseInt(form.proposalId),
      clientId: parseInt(form.clientId),
      projectType: form.projectType as any,
      totalValue: form.totalValue,
      paymentMethod: form.paymentMethod as any,
      installments: parseInt(form.installments) || 1,
      downPayment: form.downPayment || undefined,
      installmentValue: form.installmentValue || undefined,
      numberOfCourses: parseInt(form.numberOfCourses) || 1,
      observation: form.observation || undefined,
    });
  };

  const showInstallments = form.paymentMethod === "cartao_credito" || form.paymentMethod === "boleto";

  return (
    <CloserLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/closer/vendas">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              Registrar Venda
            </h1>
            <p className="text-sm text-gray-500">Registre os detalhes da venda fechada</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados da Venda */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Dados da Venda</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Proposta *</Label>
                <Select value={form.proposalId} onValueChange={(v) => {
                  setForm((p) => ({ ...p, proposalId: v }));
                  const proposal = proposalsData?.proposals?.find((pr) => pr.id.toString() === v);
                  if (proposal) {
                    setForm((p) => ({
                      ...p,
                      proposalId: v,
                      clientId: proposal.clientId.toString(),
                      projectType: proposal.projectType,
                      totalValue: proposal.value,
                      numberOfCourses: (proposal.numberOfCourses || 1).toString(),
                    }));
                  }
                }}>
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                    <SelectValue placeholder="Selecione a proposta" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10">
                    {proposalsData?.proposals?.map((pr) => (
                      <SelectItem key={pr.id} value={pr.id.toString()} className="text-white hover:bg-white/5">
                        #{pr.id} - R$ {parseFloat(pr.value).toLocaleString("pt-BR")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Cliente *</Label>
                <Select value={form.clientId} onValueChange={(v) => setForm((p) => ({ ...p, clientId: v }))}>
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10">
                    {clientsData?.clients?.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()} className="text-white hover:bg-white/5">
                        {c.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Tipo de Projeto *</Label>
              <Select value={form.projectType} onValueChange={(v) => setForm((p) => ({ ...p, projectType: v }))}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-white hover:bg-white/5">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Valor Total (R$) *</Label>
                <Input
                  value={form.totalValue}
                  onChange={(e) => setForm((p) => ({ ...p, totalValue: e.target.value }))}
                  placeholder="10000.00"
                  type="number"
                  step="0.01"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Quantidade de Cursos</Label>
                <Input
                  value={form.numberOfCourses}
                  onChange={(e) => setForm((p) => ({ ...p, numberOfCourses: e.target.value }))}
                  type="number"
                  min="1"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Forma de Pagamento</h2>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Método *</Label>
              <Select value={form.paymentMethod} onValueChange={(v) => setForm((p) => ({ ...p, paymentMethod: v }))}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  {PAYMENT_METHODS.map((m) => (
                    <SelectItem key={m.value} value={m.value} className="text-white hover:bg-white/5">
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showInstallments && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs">Parcelas</Label>
                  <Input
                    value={form.installments}
                    onChange={(e) => setForm((p) => ({ ...p, installments: e.target.value }))}
                    type="number"
                    min="1"
                    max="48"
                    className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs">Valor Entrada (R$)</Label>
                  <Input
                    value={form.downPayment}
                    onChange={(e) => setForm((p) => ({ ...p, downPayment: e.target.value }))}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs">Valor Parcela (R$)</Label>
                  <Input
                    value={form.installmentValue}
                    onChange={(e) => setForm((p) => ({ ...p, installmentValue: e.target.value }))}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Observação */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Observação</Label>
              <Textarea
                value={form.observation}
                onChange={(e) => setForm((p) => ({ ...p, observation: e.target.value }))}
                placeholder="Detalhes adicionais sobre a venda..."
                className="bg-[#0a0a0a] border-white/10 text-white rounded-xl focus:border-red-500/50 min-h-[100px]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20"
          >
            {createMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registrando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Registrar Venda
              </div>
            )}
          </Button>
        </form>
      </div>
    </CloserLayout>
  );
}
