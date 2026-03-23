import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import {
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Building2,
  Trophy,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const PROJECT_LABELS: Record<string, string> = {
  certificacao_mec: "Certificação MEC",
  projeto_alianca: "Projeto Aliança",
  pos_mba_parceiros: "Pós/MBA Parceiros",
  mentoria_ni1: "Mentoria NI1",
};

function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
}

export default function CloserDashboard() {
  const { closer, isAdmin } = useCloserAuth();
  const { data: stats, isLoading: statsLoading } = trpc.closer.stats.useQuery(undefined, { enabled: !!closer });
  const { data: ranking } = trpc.closer.ranking.useQuery(undefined, { enabled: !!closer && isAdmin });
  const { data: recentProposals } = trpc.closer.listProposals.useQuery({ limit: 5 }, { enabled: !!closer });
  const { data: recentSales } = trpc.closer.listSales.useQuery({ limit: 5 }, { enabled: !!closer });

  return (
    <CloserLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Olá, {closer?.name?.split(" ")[0] || "Closer"} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isAdmin ? "Visão geral de todos os closers" : "Suas métricas de performance"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/closer/novo-cliente">
              <Button className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </Link>
            <Link href="/closer/nova-proposta">
              <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-xl">
                <FileText className="w-4 h-4 mr-2" />
                Nova Proposta
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Propostas Enviadas"
            value={stats?.proposalsEnviadas?.toString() || "0"}
            icon={FileText}
            color="blue"
            loading={statsLoading}
          />
          <StatCard
            title="Vendas Fechadas"
            value={stats?.totalSales?.toString() || "0"}
            icon={DollarSign}
            color="green"
            loading={statsLoading}
          />
          <StatCard
            title="Receita Total"
            value={formatCurrency(stats?.totalRevenue || "0")}
            icon={TrendingUp}
            color="red"
            loading={statsLoading}
          />
          <StatCard
            title="Taxa Conversão"
            value={`${stats?.conversionRate || "0"}%`}
            icon={Trophy}
            color="yellow"
            loading={statsLoading}
          />
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Propostas"
            value={stats?.totalProposals?.toString() || "0"}
            icon={FileText}
            color="purple"
            loading={statsLoading}
            small
          />
          <StatCard
            title="Propostas Perdidas"
            value={stats?.proposalsPerdidas?.toString() || "0"}
            icon={FileText}
            color="orange"
            loading={statsLoading}
            small
          />
          <StatCard
            title="Clientes Cadastrados"
            value={stats?.totalClients?.toString() || "0"}
            icon={Building2}
            color="cyan"
            loading={statsLoading}
            small
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Propostas recentes */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Propostas Recentes</h2>
              <Link href="/closer/propostas">
                <span className="text-xs text-red-400 hover:text-red-300 cursor-pointer flex items-center gap-1">
                  Ver todas <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
            {recentProposals?.proposals?.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-8">Nenhuma proposta cadastrada</p>
            ) : (
              <div className="space-y-3">
                {recentProposals?.proposals?.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">
                        {PROJECT_LABELS[p.projectType] || p.projectType}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white font-mono">{formatCurrency(p.value)}</p>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vendas recentes */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Vendas Recentes</h2>
              <Link href="/closer/vendas">
                <span className="text-xs text-red-400 hover:text-red-300 cursor-pointer flex items-center gap-1">
                  Ver todas <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
            {recentSales?.sales?.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-8">Nenhuma venda registrada</p>
            ) : (
              <div className="space-y-3">
                {recentSales?.sales?.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">
                        {PROJECT_LABELS[s.projectType] || s.projectType}
                      </p>
                      <p className="text-xs text-gray-500">
                        {s.paymentMethod === "cartao_credito"
                          ? `Cartão ${s.installments}x`
                          : s.paymentMethod === "pix"
                          ? "PIX"
                          : "Boleto"}
                      </p>
                    </div>
                    <p className="text-sm text-green-400 font-mono font-bold">
                      {formatCurrency(s.totalValue)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ranking (admin only) */}
        {isAdmin && ranking && ranking.length > 0 && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Ranking de Closers
            </h2>
            <div className="space-y-3">
              {ranking.map((r, idx) => (
                <div
                  key={r.closerId}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : idx === 1
                        ? "bg-gray-400/20 text-gray-300"
                        : idx === 2
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{r.closerName}</p>
                    <p className="text-xs text-gray-500">{r.totalSales} vendas</p>
                  </div>
                  <p className="text-sm text-green-400 font-mono font-bold">
                    {formatCurrency(r.totalRevenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CloserLayout>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading,
  small,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  loading?: boolean;
  small?: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-blue-600/5 border-blue-500/10 text-blue-400",
    green: "from-green-500/10 to-green-600/5 border-green-500/10 text-green-400",
    red: "from-red-500/10 to-red-600/5 border-red-500/10 text-red-400",
    yellow: "from-yellow-500/10 to-yellow-600/5 border-yellow-500/10 text-yellow-400",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/10 text-purple-400",
    orange: "from-orange-500/10 to-orange-600/5 border-orange-500/10 text-orange-400",
    cyan: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/10 text-cyan-400",
  };

  const iconColorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    purple: "bg-purple-500/10 text-purple-400",
    orange: "bg-orange-500/10 text-orange-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl ${
        small ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg ${iconColorMap[color]} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {loading ? (
        <div className="h-6 w-20 bg-white/5 rounded animate-pulse" />
      ) : (
        <p className={`${small ? "text-xl" : "text-2xl"} font-bold text-white`}>{value}</p>
      )}
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    enviada: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    fechada: "bg-green-500/10 text-green-400 border-green-500/20",
    perdida: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const labels: Record<string, string> = {
    enviada: "Enviada",
    fechada: "Fechada",
    perdida: "Perdida",
  };
  return (
    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border ${styles[status] || ""}`}>
      {labels[status] || status}
    </span>
  );
}
