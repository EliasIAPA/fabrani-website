import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus, CreditCard, Banknote, QrCode, Pencil } from "lucide-react";
import { Link } from "wouter";

const PROJECT_LABELS: Record<string, string> = {
  certificacao_mec: "Certificação MEC",
  projeto_alianca: "Projeto Aliança",
  pos_mba_parceiros: "Pós/MBA Parceiros",
  mentoria_ni1: "Mentoria NI1",
};

const PAYMENT_LABELS: Record<string, { label: string; icon: any }> = {
  cartao_credito: { label: "Cartão de Crédito", icon: CreditCard },
  pix: { label: "PIX", icon: QrCode },
  boleto: { label: "Boleto", icon: Banknote },
};

function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
}

export default function CloserSales() {
  const { closer } = useCloserAuth();
  const [page, setPage] = useState(1);

  const queryInput = useMemo(() => ({ page, limit: 20 }), [page]);
  const { data, isLoading } = trpc.closer.listSales.useQuery(queryInput, { enabled: !!closer });

  return (
    <CloserLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              Vendas
            </h1>
            <p className="text-sm text-gray-500">{data?.total || 0} vendas registradas</p>
          </div>
          <Link href="/closer/nova-venda">
            <Button className="bg-green-600 hover:bg-green-500 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#111111] border border-white/5 rounded-2xl p-5 animate-pulse">
                <div className="h-5 w-48 bg-white/5 rounded mb-2" />
                <div className="h-4 w-32 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : data?.sales?.length === 0 ? (
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">Nenhuma venda registrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.sales?.map((s) => {
              const payment = PAYMENT_LABELS[s.paymentMethod] || PAYMENT_LABELS.pix;
              const PayIcon = payment.icon;
              return (
                <div
                  key={s.id}
                  className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">
                          {PROJECT_LABELS[s.projectType] || s.projectType}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-green-500/10 text-green-400 border-green-500/20">
                          Venda Fechada
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <PayIcon className="w-3 h-3" />
                          {payment.label}
                          {s.paymentMethod === "cartao_credito" && s.installments && s.installments > 1
                            ? ` (${s.installments}x)`
                            : ""}
                        </span>
                        {s.numberOfCourses && s.numberOfCourses > 1 && (
                          <span>{s.numberOfCourses} cursos</span>
                        )}
                        <span>{new Date(s.createdAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                      {s.observation && (
                        <p className="text-xs text-gray-600 mt-1">{s.observation}</p>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-xl text-green-400 font-mono font-bold">
                        {formatCurrency(s.totalValue)}
                      </p>
                      {s.downPayment && parseFloat(s.downPayment) > 0 && (
                        <p className="text-xs text-gray-500">
                          Entrada: {formatCurrency(s.downPayment)}
                        </p>
                      )}
                      {s.installmentValue && parseFloat(s.installmentValue) > 0 && (
                        <p className="text-xs text-gray-500">
                          Parcela: {formatCurrency(s.installmentValue)}
                        </p>
                      )}
                      <Link href={`/closer/editar-venda/${s.id}`}>
                        <Button size="sm" variant="outline" className="text-xs border-white/10 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg">
                          <Pencil className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {data && data.total > 20 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-white/10 text-gray-400 rounded-lg"
            >
              Anterior
            </Button>
            <span className="text-sm text-gray-500">
              Página {page} de {Math.ceil(data.total / 20)}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= Math.ceil(data.total / 20)}
              onClick={() => setPage((p) => p + 1)}
              className="border-white/10 text-gray-400 rounded-lg"
            >
              Próxima
            </Button>
          </div>
        )}
      </div>
    </CloserLayout>
  );
}
