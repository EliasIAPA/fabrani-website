import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, ShieldX, Eye, Ban, Unlock, ArrowLeft, RefreshCw, Search } from "lucide-react";
import { Link } from "wouter";

export default function AntiFraudDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [blockIpInput, setBlockIpInput] = useState("");
  const [blockReasonInput, setBlockReasonInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  // Queries
  const suspiciousIps = trpc.antiFraud.suspiciousIps.useQuery(undefined, {
    enabled: user?.role === "admin",
    refetchInterval: 30000, // Atualizar a cada 30s
  });

  const blockedIps = trpc.antiFraud.blockedIps.useQuery(undefined, {
    enabled: user?.role === "admin",
    refetchInterval: 30000,
  });

  const ipHistory = trpc.antiFraud.ipHistory.useQuery(
    { ip: selectedIp || "" },
    { enabled: !!selectedIp && user?.role === "admin" }
  );

  // Mutations
  const blockMutation = trpc.antiFraud.blockIp.useMutation({
    onSuccess: () => {
      blockedIps.refetch();
      suspiciousIps.refetch();
      setBlockIpInput("");
      setBlockReasonInput("");
    },
  });

  const unblockMutation = trpc.antiFraud.unblockIp.useMutation({
    onSuccess: () => {
      blockedIps.refetch();
      suspiciousIps.refetch();
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">Apenas administradores podem acessar o painel anti-fraude.</p>
          <Link href="/">
            <Button variant="outline" className="border-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredSuspicious = suspiciousIps.data?.filter(
    (item) =>
      !searchFilter ||
      item.ip.includes(searchFilter) ||
      item.lastLeadName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.lastLeadEmail?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-bold">Painel Anti-Fraude</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
            onClick={() => {
              suspiciousIps.refetch();
              blockedIps.refetch();
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Atualizar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">IPs Suspeitos (24h)</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">
              {suspiciousIps.data?.length || 0}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <Ban className="w-5 h-5 text-red-500" />
              <span className="text-sm text-muted-foreground">IPs Bloqueados (Ativos)</span>
            </div>
            <p className="text-3xl font-bold text-red-500">
              {blockedIps.data?.filter((b) => b.isActive === "yes").length || 0}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Total Bloqueios</span>
            </div>
            <p className="text-3xl font-bold text-green-500">
              {blockedIps.data?.length || 0}
            </p>
          </div>
        </div>

        {/* Bloquear IP Manualmente */}
        <div className="bg-white/5 border border-red-500/20 rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Ban className="w-5 h-5 text-red-500" /> Bloquear IP Manualmente
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Endereço IP (ex: 192.168.1.1)"
              value={blockIpInput}
              onChange={(e) => setBlockIpInput(e.target.value)}
              className="flex-1 bg-black border border-white/20 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Motivo do bloqueio"
              value={blockReasonInput}
              onChange={(e) => setBlockReasonInput(e.target.value)}
              className="flex-1 bg-black border border-white/20 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            />
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (blockIpInput && blockReasonInput) {
                  blockMutation.mutate({ ip: blockIpInput, reason: blockReasonInput });
                }
              }}
              disabled={!blockIpInput || !blockReasonInput || blockMutation.isPending}
            >
              <Ban className="w-4 h-4 mr-2" />
              {blockMutation.isPending ? "Bloqueando..." : "Bloquear"}
            </Button>
          </div>
        </div>

        {/* IPs Suspeitos (últimas 24h) */}
        <div className="bg-white/5 border border-white/10 rounded-lg mb-8 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-yellow-500" /> IPs Suspeitos (24h)
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Filtrar por IP, nome ou email"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-black border border-white/20 rounded pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-neon-cyan focus:outline-none"
              />
            </div>
          </div>

          {suspiciousIps.isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando...</div>
          ) : !filteredSuspicious?.length ? (
            <div className="p-8 text-center text-muted-foreground">
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-green-500/50" />
              Nenhuma atividade suspeita nas últimas 24h
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">IP</th>
                    <th className="px-4 py-3 font-medium">Submissões</th>
                    <th className="px-4 py-3 font-medium">Último Nome</th>
                    <th className="px-4 py-3 font-medium">Último Email</th>
                    <th className="px-4 py-3 font-medium">Último Telefone</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuspicious.map((item) => (
                    <tr key={item.ip} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-neon-cyan">{item.ip}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                            item.totalSubmissions >= 6
                              ? "bg-red-500/20 text-red-400"
                              : item.totalSubmissions >= 3
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {item.totalSubmissions}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.lastLeadName || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.lastLeadEmail || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.lastLeadPhone || "—"}</td>
                      <td className="px-4 py-3">
                        {item.isBlocked ? (
                          <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                            <Ban className="w-3 h-3" /> Bloqueado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-yellow-400 text-xs">
                            <ShieldAlert className="w-3 h-3" /> Suspeito
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedIp(item.ip)}
                            className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                            title="Ver histórico"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!item.isBlocked && (
                            <button
                              onClick={() =>
                                blockMutation.mutate({
                                  ip: item.ip,
                                  reason: `Bloqueio manual: ${item.totalSubmissions} submissões em 24h`,
                                })
                              }
                              className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                              title="Bloquear IP"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                          {item.isBlocked && (
                            <button
                              onClick={() => unblockMutation.mutate({ ip: item.ip })}
                              className="p-1.5 rounded hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                              title="Desbloquear IP"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* IPs Bloqueados */}
        <div className="bg-white/5 border border-white/10 rounded-lg mb-8 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-500" /> IPs Bloqueados
            </h2>
          </div>

          {blockedIps.isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando...</div>
          ) : !blockedIps.data?.length ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum IP bloqueado</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">IP</th>
                    <th className="px-4 py-3 font-medium">Motivo</th>
                    <th className="px-4 py-3 font-medium">Submissões</th>
                    <th className="px-4 py-3 font-medium">Tipo</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Data</th>
                    <th className="px-4 py-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedIps.data.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-red-400">{item.ip}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">
                        {item.reason || "—"}
                      </td>
                      <td className="px-4 py-3 font-bold">{item.totalSubmissions}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            item.blockedBy === "auto"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {item.blockedBy === "auto" ? "Automático" : "Manual"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            item.isActive === "yes"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {item.isActive === "yes" ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {new Date(item.createdAt).toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedIp(item.ip)}
                            className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                            title="Ver histórico"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {item.isActive === "yes" ? (
                            <button
                              onClick={() => unblockMutation.mutate({ ip: item.ip })}
                              className="p-1.5 rounded hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                              title="Desbloquear"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                blockMutation.mutate({
                                  ip: item.ip,
                                  reason: item.reason || "Reativação manual",
                                })
                              }
                              className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                              title="Rebloquear"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de Histórico do IP */}
        {selectedIp && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedIp(null)} />
            <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl max-h-[80vh] overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Histórico do IP</h3>
                  <p className="text-sm text-neon-cyan font-mono">{selectedIp}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedIp(null)}>
                  ✕
                </Button>
              </div>

              <div className="overflow-auto max-h-[60vh]">
                {ipHistory.isLoading ? (
                  <div className="p-8 text-center text-muted-foreground">Carregando histórico...</div>
                ) : !ipHistory.data?.length ? (
                  <div className="p-8 text-center text-muted-foreground">Nenhuma submissão encontrada</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-[#0a0a0a]">
                      <tr className="border-b border-white/10 text-left text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Data/Hora</th>
                        <th className="px-4 py-3 font-medium">Página</th>
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Telefone</th>
                        <th className="px-4 py-3 font-medium">Suspeito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipHistory.data.map((sub) => (
                        <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(sub.createdAt).toLocaleString("pt-BR")}
                          </td>
                          <td className="px-4 py-3 text-xs">{sub.page}</td>
                          <td className="px-4 py-3 text-xs">{sub.leadName || "—"}</td>
                          <td className="px-4 py-3 text-xs">{sub.leadEmail || "—"}</td>
                          <td className="px-4 py-3 text-xs">{sub.leadPhone || "—"}</td>
                          <td className="px-4 py-3">
                            {sub.isSuspicious === "yes" ? (
                              <span className="text-red-400 text-xs font-bold">SIM</span>
                            ) : (
                              <span className="text-green-400 text-xs">Não</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
