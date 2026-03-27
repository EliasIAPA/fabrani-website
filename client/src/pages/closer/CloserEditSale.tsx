import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const PROJECT_LABELS: Record<string, string> = {
  certificacao_mec: "Certificação MEC",
  projeto_alianca: "Projeto Aliança",
  pos_mba_parceiros: "Pós/MBA Parceiros",
  mentoria_ni1: "Mentoria NI1 Negócios Inovadores",
};

const PAYMENT_STATUS = [
  { value: "pending", label: "Pendente" },
  { value: "processing", label: "Processando" },
  { value: "completed", label: "Concluído" },
  { value: "failed", label: "Falhou" },
  { value: "refunded", label: "Reembolsado" },
];

function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
}

export default function CloserEditSale() {
  const { closer } = useCloserAuth();
  const [, setLocation] = useLocation();
  const params = useParams();
  const saleId = parseInt(params.id || "0");
  const utils = trpc.useUtils();

  const salesInput = useMemo(() => ({ page: 1, limit: 200 }), []);
  const { data: salesData, isLoading } = trpc.closer.listSales.useQuery(salesInput, { enabled: !!closer });

  const sale = salesData?.sales?.find((s: any) => s.id === saleId);

  const [form, setForm] = useState({
    paymentPlatform: "",
    paymentId: "",
    paymentStatus: "pending",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (sale) {
      setForm({
        paymentPlatform: (sale as any).paymentPlatform || "",
        paymentId: (sale as any).paymentId || "",
        paymentStatus: (sale as any).paymentStatus || "pending",
      });
    }
  }, [sale]);

  const updateMutation = trpc.closer.updateSale.useMutation({
    onSuccess: () => {
      toast.success("Venda atualizada com sucesso!");
      utils.closer.listSales.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/vendas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao atualizar venda");
    },
  });

  const deleteMutation = trpc.closer.deleteSale.useMutation({
    onSuccess: () => {
      toast.success("Venda removida com sucesso!");
      utils.closer.listSales.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/vendas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao remover venda");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id: saleId,
      paymentPlatform: form.paymentPlatform || undefined,
      paymentId: form.paymentId || undefined,
      paymentStatus: form.paymentStatus as any,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: saleId });
  };

  if (isLoading) {
    return (
      <CloserLayout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 animate-pulse space-y-4">
            <div className="h-8 w-48 bg-white/5 rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-11 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </CloserLayout>
    );
  }

  if (!sale) {
    return (
      <CloserLayout>
        <div className="max-w-3xl mx-auto text-center py-12">
          <p className="text-gray-400">Venda não encontrada</p>
          <Link href="/closer/vendas">
            <Button className="mt-4 bg-green-600 hover:bg-green-500 text-white rounded-xl">
              Voltar para Vendas
            </Button>
          </Link>
        </div>
      </CloserLayout>
    );
  }

  return (
    <CloserLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/closer/vendas">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              Editar Venda
            </h1>
            <p className="text-sm text-gray-500">ID: {saleId}</p>
          </div>
        </div>

        {/* Resumo da venda (somente leitura) */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resumo da Venda</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Projeto</p>
              <p className="text-white font-medium">{PROJECT_LABELS[sale.projectType] || sale.projectType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Valor Total</p>
              <p className="text-green-400 font-bold font-mono">{formatCurrency(sale.totalValue)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Data de Registro</p>
              <p className="text-white">{new Date(sale.createdAt).toLocaleDateString("pt-BR")}</p>
            </div>
          </div>
          {sale.observation && (
            <div>
              <p className="text-xs text-gray-500">Observação</p>
              <p className="text-gray-300 text-sm">{sale.observation}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status e Plataforma de Pagamento */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Pagamento</h2>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Status do Pagamento</Label>
              <Select
                value={form.paymentStatus}
                onValueChange={(v) => setForm((p) => ({ ...p, paymentStatus: v }))}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Plataforma de Pagamento</Label>
                <Input
                  value={form.paymentPlatform}
                  onChange={(e) => setForm((p) => ({ ...p, paymentPlatform: e.target.value }))}
                  placeholder="Ex: Stripe, PagSeguro, Hotmart"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-green-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">ID da Transação</Label>
                <Input
                  value={form.paymentId}
                  onChange={(e) => setForm((p) => ({ ...p, paymentId: e.target.value }))}
                  placeholder="ID único da transação"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-green-500/50"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 flex-wrap">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20"
            >
              {updateMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </div>
              )}
            </Button>

            {!showDeleteConfirm ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="h-12 px-4 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="h-12 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  {deleteMutation.isPending ? "Removendo..." : "Confirmar Exclusão"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="h-12 px-4 border-white/10 text-gray-400 rounded-xl"
                >
                  Cancelar
                </Button>
              </>
            )}

            {!showDeleteConfirm && (
              <Link href="/closer/vendas">
                <Button type="button" variant="outline" className="h-12 px-6 border-white/10 text-gray-400 hover:text-white rounded-xl">
                  Cancelar
                </Button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </CloserLayout>
  );
}
