import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowLeft, Trash2, Calendar } from "lucide-react";
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

export default function CloserEditProposal() {
  const { closer } = useCloserAuth();
  const [, setLocation] = useLocation();
  const params = useParams();
  const proposalId = parseInt(params.id || "0");
  const utils = trpc.useUtils();

  const { data: proposal, isLoading } = trpc.closer.getProposal.useQuery(
    { id: proposalId },
    { enabled: !!closer && proposalId > 0 }
  );

  const [form, setForm] = useState({
    clientId: "",
    projectType: "",
    value: "",
    numberOfCourses: "1",
    observation: "",
    paymentMethod: "",
    installments: "1",
    downPayment: "",
    installmentValue: "",
    mixedPaymentEnabled: "no",
    pixDownPayment: "",
    cardInstallments: "0",
    cardInstallmentValue: "",
    boletoInstallments: "0",
    boletoInstallmentValue: "",
    proposalSentDate: "",
    expectedPaymentDate: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (proposal) {
      setForm({
        clientId: proposal.clientId?.toString() || "",
        projectType: proposal.projectType || "",
        value: proposal.value || "",
        numberOfCourses: proposal.numberOfCourses?.toString() || "1",
        observation: proposal.observation || "",
        paymentMethod: proposal.paymentMethod || "",
        installments: proposal.installments?.toString() || "1",
        downPayment: proposal.downPayment || "",
        installmentValue: proposal.installmentValue || "",
        mixedPaymentEnabled: proposal.mixedPaymentEnabled || "no",
        pixDownPayment: proposal.pixDownPayment || "",
        cardInstallments: proposal.cardInstallments?.toString() || "0",
        cardInstallmentValue: proposal.cardInstallmentValue || "",
        boletoInstallments: proposal.boletoInstallments?.toString() || "0",
        boletoInstallmentValue: proposal.boletoInstallmentValue || "",
        proposalSentDate: proposal.proposalSentDate ? new Date(proposal.proposalSentDate).toISOString().slice(0, 16) : "",
        expectedPaymentDate: proposal.expectedPaymentDate ? new Date(proposal.expectedPaymentDate).toISOString().slice(0, 16) : "",
      });
    }
  }, [proposal]);

  const updateMutation = trpc.closer.updateProposal.useMutation({
    onSuccess: () => {
      toast.success("Proposta atualizada com sucesso!");
      utils.closer.listProposals.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/propostas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao atualizar proposta");
    },
  });

  const deleteMutation = trpc.closer.deleteProposal.useMutation({
    onSuccess: () => {
      toast.success("Proposta deletada com sucesso!");
      utils.closer.listProposals.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/propostas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao deletar proposta");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientId || !form.projectType || !form.value) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const payload: any = {
      id: proposalId,
      clientId: parseInt(form.clientId),
      projectType: form.projectType as any,
      value: form.value,
      numberOfCourses: parseInt(form.numberOfCourses) || 1,
      observation: form.observation || undefined,
      paymentMethod: form.paymentMethod || undefined,
      installments: parseInt(form.installments) || 1,
      downPayment: form.downPayment || undefined,
      installmentValue: form.installmentValue || undefined,
      mixedPaymentEnabled: form.mixedPaymentEnabled as any,
      pixDownPayment: form.pixDownPayment || undefined,
      cardInstallments: parseInt(form.cardInstallments) || 0,
      cardInstallmentValue: form.cardInstallmentValue || undefined,
      boletoInstallments: parseInt(form.boletoInstallments) || 0,
      boletoInstallmentValue: form.boletoInstallmentValue || undefined,
      proposalSentDate: form.proposalSentDate ? new Date(form.proposalSentDate) : undefined,
      expectedPaymentDate: form.expectedPaymentDate ? new Date(form.expectedPaymentDate) : undefined,
    };

    updateMutation.mutate(payload);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: proposalId });
  };

  if (isLoading) {
    return (
      <CloserLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 animate-pulse">
            <div className="h-8 w-48 bg-gray-700 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-700 rounded" />
              ))}
            </div>
          </div>
        </div>
      </CloserLayout>
    );
  }

  if (!proposal) {
    return (
      <CloserLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-400">Proposta não encontrada</p>
          <Link href="/closer/propostas">
            <Button className="mt-4">Voltar para Propostas</Button>
          </Link>
        </div>
      </CloserLayout>
    );
  }

  const showInstallments = form.paymentMethod === "cartao_credito" || form.paymentMethod === "boleto";

  return (
    <CloserLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/closer/propostas">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-400" />
              Editar Proposta
            </h1>
            <p className="text-sm text-gray-500">ID: {proposalId}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
          {/* Seção 1: Dados Básicos */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Dados da Proposta</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Tipo de Projeto *</Label>
                <Select value={form.projectType} onValueChange={(v) => setForm((p) => ({ ...p, projectType: v }))}>
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
                <Label className="text-gray-300">Valor da Proposta *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.value}
                  onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
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
                  onChange={(e) => setForm((p) => ({ ...p, numberOfCourses: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Observações</Label>
              <Textarea
                value={form.observation}
                onChange={(e) => setForm((p) => ({ ...p, observation: e.target.value }))}
                placeholder="Adicione observações..."
                className="bg-gray-800 border-gray-700 text-white min-h-20"
              />
            </div>
          </div>

          {/* Seção 2: Configuração de Pagamento */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Configuração de Pagamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Tipo de Pagamento</Label>
                <Select value={form.paymentMethod} onValueChange={(v) => setForm((p) => ({ ...p, paymentMethod: v }))}>
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
            </div>

            {form.paymentMethod && form.mixedPaymentEnabled === "no" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800 rounded border border-gray-700">
                <div>
                  <Label className="text-gray-300">Valor da Entrada</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.downPayment}
                    onChange={(e) => setForm((p) => ({ ...p, downPayment: e.target.value }))}
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
                        onChange={(e) => setForm((p) => ({ ...p, installments: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Valor de Cada Parcela</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={form.installmentValue}
                        onChange={(e) => setForm((p) => ({ ...p, installmentValue: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <div>
              <Label className="text-gray-300 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.mixedPaymentEnabled === "yes"}
                  onChange={(e) => setForm((p) => ({ ...p, mixedPaymentEnabled: e.target.checked ? "yes" : "no" }))}
                  className="w-4 h-4"
                />
                Ativar Pagamento Misto
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
                    onChange={(e) => setForm((p) => ({ ...p, pixDownPayment: e.target.value }))}
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
                    onChange={(e) => setForm((p) => ({ ...p, cardInstallments: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Cartão - Valor por Parcela</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.cardInstallmentValue}
                    onChange={(e) => setForm((p) => ({ ...p, cardInstallmentValue: e.target.value }))}
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
                    onChange={(e) => setForm((p) => ({ ...p, boletoInstallments: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label className="text-blue-300">Boleto - Valor por Parcela</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.boletoInstallmentValue}
                    onChange={(e) => setForm((p) => ({ ...p, boletoInstallmentValue: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Seção 3: Calendário */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendário de Proposta
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Data de Envio da Proposta</Label>
                <Input
                  type="datetime-local"
                  value={form.proposalSentDate}
                  onChange={(e) => setForm((p) => ({ ...p, proposalSentDate: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Data Prevista de Pagamento</Label>
                <Input
                  type="datetime-local"
                  value={form.expectedPaymentDate}
                  onChange={(e) => setForm((p) => ({ ...p, expectedPaymentDate: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Link href="/closer/propostas">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>

        {/* Modal de Confirmação de Exclusão */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm">
              <h3 className="text-lg font-bold text-white mb-2">Confirmar Exclusão</h3>
              <p className="text-gray-400 mb-6">
                Tem certeza que deseja excluir esta proposta? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleteMutation.isPending ? "Deletando..." : "Deletar"}
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CloserLayout>
  );
}
