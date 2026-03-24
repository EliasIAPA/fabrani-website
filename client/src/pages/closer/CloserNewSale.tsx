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
import CloserLayout from "@/components/CloserLayout";

const PROJECT_TYPES = [
  { value: "certificacao_mec", label: "Certificação MEC" },
  { value: "projeto_alianca", label: "Projeto Aliança" },
  { value: "pos_mba_parceiros", label: "Pós/MBA Parceiros" },
  { value: "mentoria_ni1", label: "Mentoria NI1 Negócios Inovadores" },
];

const PAYMENT_STATUS = [
  { value: "pending", label: "Pendente" },
  { value: "processing", label: "Processando" },
  { value: "completed", label: "Concluído" },
  { value: "failed", label: "Falhou" },
  { value: "refunded", label: "Reembolsado" },
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
    numberOfCourses: params.get("courses") || "1",
    observation: "",
    // Plataforma de pagamento
    paymentPlatform: "",
    paymentId: "",
    paymentStatus: "pending",
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
    if (!form.proposalId || !form.clientId || !form.projectType || !form.totalValue) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const payload: any = {
      proposalId: parseInt(form.proposalId),
      clientId: parseInt(form.clientId),
      projectType: form.projectType as any,
      totalValue: form.totalValue,
      numberOfCourses: parseInt(form.numberOfCourses) || 1,
      observation: form.observation || undefined,
      paymentPlatform: form.paymentPlatform || undefined,
      paymentId: form.paymentId || undefined,
      paymentStatus: form.paymentStatus as any,
    };

    createMutation.mutate(payload);
  };

  return (
    <CloserLayout>
      <div className="max-w-3xl mx-auto space-y-6">
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
              Registrar Nova Venda
            </h1>
            <p className="text-sm text-gray-400">Registre uma proposta fechada como venda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
          {/* Seção 1: Dados Básicos */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Dados da Venda</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Proposta *</Label>
                <Select value={form.proposalId} onValueChange={(val) => setForm({ ...form, proposalId: val })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione uma proposta" />
                  </SelectTrigger>
                  <SelectContent>
                    {proposalsData?.proposals?.map((p: any) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.clientName} - {p.projectType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Cliente *</Label>
                <Select value={form.clientId} onValueChange={(val) => setForm({ ...form, clientId: val })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsData?.clients?.map((c: any) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Tipo de Projeto *</Label>
                <Select value={form.projectType} onValueChange={(val) => setForm({ ...form, projectType: val })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Valor Total *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.totalValue}
                  onChange={(e) => setForm({ ...form, totalValue: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label className="text-gray-300">Quantidade de Cursos</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.numberOfCourses}
                  onChange={(e) => setForm({ ...form, numberOfCourses: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Observações</Label>
              <Textarea
                value={form.observation}
                onChange={(e) => setForm({ ...form, observation: e.target.value })}
                placeholder="Adicione observações sobre esta venda..."
                className="bg-gray-800 border-gray-700 text-white min-h-20"
              />
            </div>
          </div>

          {/* Seção 2: Plataforma de Pagamento */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Integração com Plataforma de Pagamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Plataforma (Stripe, PagSeguro, etc)</Label>
                <Input
                  type="text"
                  value={form.paymentPlatform}
                  onChange={(e) => setForm({ ...form, paymentPlatform: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Ex: Stripe"
                />
              </div>

              <div>
                <Label className="text-gray-300">ID da Transação</Label>
                <Input
                  type="text"
                  value={form.paymentId}
                  onChange={(e) => setForm({ ...form, paymentId: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="ID único da transação"
                />
              </div>

              <div>
                <Label className="text-gray-300">Status do Pagamento</Label>
                <Select value={form.paymentStatus} onValueChange={(val) => setForm({ ...form, paymentStatus: val })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_STATUS.map((ps) => (
                      <SelectItem key={ps.value} value={ps.value}>
                        {ps.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {createMutation.isPending ? "Registrando..." : "Registrar Venda"}
            </Button>
            <Link href="/closer/vendas">
              <Button type="button" variant="outline" className="flex-1">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </CloserLayout>
  );
}
