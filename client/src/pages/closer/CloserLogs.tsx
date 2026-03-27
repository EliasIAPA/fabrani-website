import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import {
  ScrollText,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Building2,
  DollarSign,
  Users,
  LogIn,
  LogOut,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

// ===== MAPEAMENTOS =====

const ACTION_LABELS: Record<string, string> = {
  client_created: "Cliente criado",
  client_updated: "Cliente editado",
  client_deleted: "Cliente deletado",
  proposal_created: "Proposta criada",
  proposal_updated: "Proposta editada",
  proposal_status_changed: "Status alterado",
  proposal_deleted: "Proposta deletada",
  proposal_pdf_exported: "PDF exportado",
  sale_created: "Venda registrada",
  sale_updated: "Venda editada",
  sale_deleted: "Venda deletada",
  closer_created: "Closer cadastrado",
  closer_updated: "Closer editado",
  closer_deleted: "Closer deletado",
  login: "Login",
  logout: "Logout",
};

const ACTION_COLORS: Record<string, string> = {
  client_created: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  client_updated: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  client_deleted: "bg-red-500/10 text-red-400 border-red-500/20",
  proposal_created: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  proposal_updated: "bg-purple-400/10 text-purple-300 border-purple-400/20",
  proposal_status_changed: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  proposal_deleted: "bg-red-500/10 text-red-400 border-red-500/20",
  proposal_pdf_exported: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  sale_created: "bg-green-500/10 text-green-400 border-green-500/20",
  sale_updated: "bg-green-400/10 text-green-300 border-green-400/20",
  sale_deleted: "bg-red-500/10 text-red-400 border-red-500/20",
  closer_created: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  closer_updated: "bg-orange-400/10 text-orange-300 border-orange-400/20",
  closer_deleted: "bg-red-500/10 text-red-400 border-red-500/20",
  login: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  logout: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const ENTITY_ICONS: Record<string, any> = {
  client: Building2,
  proposal: FileText,
  sale: DollarSign,
  closer: Users,
  session: User,
};

const ENTITY_LABELS: Record<string, string> = {
  client: "Cliente",
  proposal: "Proposta",
  sale: "Venda",
  closer: "Closer",
  session: "Sessão",
};

const ACTION_GROUPS = [
  { label: "Todos", value: "" },
  { label: "Clientes", value: "client" },
  { label: "Propostas", value: "proposal" },
  { label: "Vendas", value: "sale" },
  { label: "Closers", value: "closer" },
  { label: "Sessões", value: "session" },
];

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function CloserLogs() {
  const { closer, isAdmin } = useCloserAuth();
  const [entityTypeFilter, setEntityTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 30;

  const { data, isLoading, refetch, isFetching } = trpc.closer.listLogs.useQuery(
    {
      entityType: entityTypeFilter || undefined,
      page,
      limit: LIMIT,
    },
    { enabled: !!closer && isAdmin }
  );

  const logs = data?.logs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  // Exportar logs como CSV
  const handleExportCSV = () => {
    if (!logs.length) return;
    const headers = ["ID", "Data/Hora", "Closer", "Ação", "Entidade", "ID Entidade", "Descrição"];
    const rows = logs.map((log) => [
      log.id,
      formatDate(log.createdAt),
      log.closerName,
      ACTION_LABELS[log.action] || log.action,
      ENTITY_LABELS[log.entityType] || log.entityType,
      log.entityId ?? "",
      `"${log.description.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fabrani-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return (
      <CloserLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <ScrollText className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Acesso Restrito</h2>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            O histórico de logs é visível apenas para administradores.
          </p>
          <Link href="/closer">
            <Button variant="outline" className="border-white/10 text-gray-400 hover:bg-white/5">
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </CloserLayout>
    );
  }

  return (
    <CloserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <ScrollText className="w-7 h-7 text-red-400" />
              Histórico de Logs
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Registro completo de todas as ações realizadas no sistema — visível apenas para administradores
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-400 hover:bg-white/5"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-400 hover:bg-white/5"
              onClick={handleExportCSV}
              disabled={!logs.length}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filtros por tipo de entidade */}
        <div className="flex flex-wrap gap-2">
          {ACTION_GROUPS.map((group) => (
            <button
              key={group.value}
              onClick={() => {
                setEntityTypeFilter(group.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                entityTypeFilter === group.value
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : "text-gray-500 border-white/5 hover:border-white/10 hover:text-gray-300"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Contador */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">
            {total > 0 ? (
              <>
                Exibindo <span className="text-gray-400">{(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)}</span> de{" "}
                <span className="text-gray-400">{total}</span> registros
              </>
            ) : (
              "Nenhum registro encontrado"
            )}
          </p>
        </div>

        {/* Tabela de Logs */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Carregando logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ScrollText className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">Nenhum log encontrado para os filtros selecionados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 text-[11px] text-gray-600 uppercase tracking-wider font-semibold">
                      Data/Hora
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] text-gray-600 uppercase tracking-wider font-semibold">
                      Closer
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] text-gray-600 uppercase tracking-wider font-semibold">
                      Ação
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] text-gray-600 uppercase tracking-wider font-semibold hidden md:table-cell">
                      Entidade
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] text-gray-600 uppercase tracking-wider font-semibold">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {logs.map((log) => {
                    const EntityIcon = ENTITY_ICONS[log.entityType] || ScrollText;
                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        {/* Data/Hora */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-500 font-mono">
                            {formatDate(log.createdAt)}
                          </span>
                        </td>

                        {/* Closer */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                              {log.closerName?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <span className="text-xs text-gray-300 font-medium truncate max-w-[100px]">
                              {log.closerName}
                            </span>
                          </div>
                        </td>

                        {/* Ação */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${
                              ACTION_COLORS[log.action] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
                            }`}
                          >
                            {ACTION_LABELS[log.action] || log.action}
                          </span>
                        </td>

                        {/* Entidade */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            <EntityIcon className="w-3.5 h-3.5 text-gray-600" />
                            <span className="text-xs text-gray-500">
                              {ENTITY_LABELS[log.entityType] || log.entityType}
                              {log.entityId ? ` #${log.entityId}` : ""}
                            </span>
                          </div>
                        </td>

                        {/* Descrição */}
                        <td className="px-4 py-3">
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 max-w-xs">
                            {log.description}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-400 hover:bg-white/5"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      page === pageNum
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-400 hover:bg-white/5"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </CloserLayout>
  );
}
