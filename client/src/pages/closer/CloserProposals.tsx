import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, DollarSign, CheckCircle, XCircle, Clock, Download, Edit2 } from "lucide-react";
import { generateProposalPDF } from "@/lib/generateProposalPDF";
import { Link } from "wouter";
import { toast } from "sonner";

const PROJECT_LABELS: Record<string, string> = {
  certificacao_mec: "Certificação MEC",
  projeto_alianca: "Projeto Aliança",
  pos_mba_parceiros: "Pós/MBA Parceiros",
  mentoria_ni1: "Mentoria NI1",
};

function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
}

export default function CloserProposals() {
  const { closer } = useCloserAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const utils = trpc.useUtils();

  const queryInput = useMemo(
    () => ({
      status: statusFilter !== "all" ? (statusFilter as any) : undefined,
      page,
      limit: 20,
    }),
    [statusFilter, page]
  );
  const { data, isLoading } = trpc.closer.listProposals.useQuery(queryInput, { enabled: !!closer });

  const updateStatusMutation = trpc.closer.updateProposalStatus.useMutation({
    onSuccess: () => {
      toast.success("Status atualizado!");
      utils.closer.listProposals.invalidate();
      utils.closer.stats.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <CloserLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-400" />
              Propostas
            </h1>
            <p className="text-sm text-gray-500">{data?.total || 0} propostas no total</p>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[160px] bg-[#111111] border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-white/10">
                <SelectItem value="all" className="text-white">Todos</SelectItem>
                <SelectItem value="enviada" className="text-white">Enviadas</SelectItem>
                <SelectItem value="fechada" className="text-white">Fechadas</SelectItem>
                <SelectItem value="perdida" className="text-white">Perdidas</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/closer/nova-proposta">
              <Button className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Nova Proposta
              </Button>
            </Link>
          </div>
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
        ) : data?.proposals?.length === 0 ? (
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">Nenhuma proposta encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.proposals?.map((p) => (
              <div
                key={p.id}
                className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">
                        {PROJECT_LABELS[p.projectType] || p.projectType}
                      </h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="text-sm text-gray-500">
                      Cliente #{p.clientId} &middot; {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                      {p.numberOfCourses && p.numberOfCourses > 1 && ` · ${p.numberOfCourses} cursos`}
                    </p>
                    {p.observation && (
                      <p className="text-xs text-gray-600 mt-1">{p.observation}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-lg text-white font-mono font-bold">
                      {formatCurrency(p.value)}
                    </p>
                    {closer?.role === "admin" && (
                      <>
                        <Link href={`/closer/editar-proposta/${p.id}`}>
                          <Button
                            size="sm"
                            className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg"
                          >
                            <Edit2 className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="text-xs bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
                          onClick={() => {
                            const data = trpc.closer.exportProposalPDF.useQuery({ id: p.id }, { enabled: true }).data;
                            if (data) generateProposalPDF(data);
                          }}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      </>
                    )}
                    {p.status === "enviada" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-green-500/20 text-green-400 hover:bg-green-500/10 rounded-lg"
                          onClick={() => updateStatusMutation.mutate({ id: p.id, status: "fechada" })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Fechar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg"
                          onClick={() => updateStatusMutation.mutate({ id: p.id, status: "perdida" })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Perder
                        </Button>
                        <Link href={`/closer/nova-venda?proposalId=${p.id}&clientId=${p.clientId}&projectType=${p.projectType}&value=${p.value}&courses=${p.numberOfCourses || 1}`}>
                          <Button
                            size="sm"
                            className="text-xs bg-green-600 hover:bg-green-500 text-white rounded-lg"
                          >
                            <DollarSign className="w-3 h-3 mr-1" />
                            Registrar Venda
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: any; style: string; label: string }> = {
    enviada: { icon: Clock, style: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Enviada" },
    fechada: { icon: CheckCircle, style: "bg-green-500/10 text-green-400 border-green-500/20", label: "Fechada" },
    perdida: { icon: XCircle, style: "bg-red-500/10 text-red-400 border-red-500/20", label: "Perdida" },
  };
  const c = config[status] || config.enviada;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${c.style}`}>
      <Icon className="w-2.5 h-2.5" />
      {c.label}
    </span>
  );
}
