import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import CloserLayout from "@/components/CloserLayout";

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
    paymentMethod: "",
    installments: "1",
    downPayment: "",
    installmentValue: "",
    numberOfCourses: params.get("courses") || "1",
    observation: "",
    // Novos campos: pagamento misto
    mixedPaymentEnabled: "no",
    pixDownPayment: "",
    cardInstallments: "0",
    cardInstallmentValue: "",
    boletoInstallments: "0",
    boletoInstallmentValue: "",
    // Datas
    proposalSentDate: "",
    expectedPaymentDate: "",
    paymentReceivedDate: "",
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
    if (!form.proposalId || !form.clientId || !form.projectType || !form.totalValue || !form.paymentMethod) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const payload: any = {
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
      mixedPaymentEnabled: form.mixedPaymentEnabled as any,
      pixDownPayment: form.pixDownPayment || undefined,
      cardInstallments: parseInt(form.cardInstallments) || 0,
      cardInstallmentValue: form.cardInstallmentValue || undefined,
      boletoInstallments: parseInt(form.boletoInstallments) || 0,
      boletoInstallmentValue: form.boletoInstallmentValue || undefined,
      proposalSentDate: form.proposalSentDate ? new Date(form.proposalSentDate) : undefined,
      expectedPaymentDate: form.expectedPaymentDate ? new Date(form.expectedPaymentDate) : undefined,
      paymentReceivedDate: form.paymentReceivedDate ? new Date(form.paymentReceivedDate) : undefined,
      paymentPlatform: form.paymentPlatform || undefined,
      paymentId: form.paymentId || undefined,
      paymentStatus: form.paymentStatus as any,
    };

    createMutation.mutate(payload);
  };

  const showInstallments = form.paymentMethod === "cartao_credito" || form.paymentMethod === "boleto";

  return (
    <CloserLayout>
      <div className="max-w-4xl mx-auto space-y-6">
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
            <p className="text-sm text-gray-400">Preencha todos os detalhes da venda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
          {/* Seção 1: Dados Básicos */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Dados Básicos</h2>

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
          </div>

          {/* Seção 2: Pagamento Simples ou Misto */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Configuração de Pagamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Tipo de Pagamento *</Label>
                <Select value={form.paymentMethod} onValueChange={(val) => setForm({ ...form, paymentMethod: val })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((pm) => (
                      <SelectItem key={pm.value} value={pm.value}>
                        {pm.label}
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
            </div>

            {/* Pagamento Simples */}
            {form.paymentMethod && form.mixedPaymentEnabled === "no" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800 rounded border border-gray-700">
                <div>
                  <Label className="text-gray-300">Valor da Entrada</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.downPayment}
                    onChange={(e) => setForm({ ...form, downPayment: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>

                {showInstallments && (
                  <>
                    <div>
                      <Label className="text-gray-300">Quantidade de Parcelas</Label>
                      <Input
                        type="number"
                        min="1"
                        value={form.installments}
                        onChange={(e) => setForm({ ...form, installments: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Valor de Cada Parcela</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={form.installmentValue}
                        onChange={(e) => setForm({ ...form, installmentValue: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Pagamento Misto */}
            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.mixedPaymentEnabled === "yes"}
                  onChange={(e) => setForm({ ...form, mixedPaymentEnabled: e.target.checked ? "yes" : "no" })}
                  className="w-4 h-4"
                />
                Ativar Pagamento Misto (PIX entrada + Cartão + Boleto)
              </Label>
            </div>

            {form.mixedPaymentEnabled === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-900 bg-opacity-20 rounded border border-blue-700">
                <div>
                  <Label className="text-blue-300">PIX - Valor da Entrada</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.pixDownPayment}
                    onChange={(e) => setForm({ ...form, pixDownPayment: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Cartão - Parcelas</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.cardInstallments}
                    onChange={(e) => setForm({ ...form, cardInstallments: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Cartão - Valor por Parcela</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.cardInstallmentValue}
                    onChange={(e) => setForm({ ...form, cardInstallmentValue: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Boleto - Parcelas</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.boletoInstallments}
                    onChange={(e) => setForm({ ...form, boletoInstallments: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Boleto - Valor por Parcela</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.boletoInstallmentValue}
                    onChange={(e) => setForm({ ...form, boletoInstallmentValue: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Seção 3: Datas Importantes */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendário de Pagamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Data de Envio da Proposta</Label>
                <Input
                  type="datetime-local"
                  value={form.proposalSentDate}
                  onChange={(e) => setForm({ ...form, proposalSentDate: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Data Prevista de Pagamento</Label>
                <Input
                  type="datetime-local"
                  value={form.expectedPaymentDate}
                  onChange={(e) => setForm({ ...form, expectedPaymentDate: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Data de Pagamento Realizado</Label>
                <Input
                  type="datetime-local"
                  value={form.paymentReceivedDate}
                  onChange={(e) => setForm({ ...form, paymentReceivedDate: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Seção 4: Plataforma de Pagamento */}
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

          {/* Seção 5: Observações */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Observações</h2>
            <Textarea
              value={form.observation}
              onChange={(e) => setForm({ ...form, observation: e.target.value })}
              placeholder="Adicione observações sobre esta venda..."
              className="bg-gray-800 border-gray-700 text-white min-h-24"
            />
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
