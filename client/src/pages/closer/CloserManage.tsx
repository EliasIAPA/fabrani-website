import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Users, Plus, Shield, ShieldOff, UserCheck, UserX } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function CloserManage() {
  const { isAdmin } = useCloserAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const { data: closersList, isLoading } = trpc.closer.listClosers.useQuery(undefined, {
    enabled: isAdmin,
  });

  const updateMutation = trpc.closer.updateCloser.useMutation({
    onSuccess: () => {
      toast.success("Closer atualizado!");
      utils.closer.listClosers.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  if (!isAdmin) {
    return (
      <CloserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="w-12 h-12 text-red-500/50 mx-auto mb-3" />
            <p className="text-gray-500">Acesso restrito a administradores</p>
          </div>
        </div>
      </CloserLayout>
    );
  }

  return (
    <CloserLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-red-400" />
              Closers
            </h1>
            <p className="text-sm text-gray-500">Gerencie os vendedores da equipe</p>
          </div>
          <Link href="/closer/novo-closer">
            <Button className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Novo Closer
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
        ) : closersList?.length === 0 ? (
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-12 text-center">
            <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum closer cadastrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {closersList?.map((c) => (
              <div
                key={c.id}
                className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        c.isActive === "yes"
                          ? "bg-gradient-to-br from-red-500 to-red-700"
                          : "bg-gray-700"
                      }`}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{c.name}</h3>
                        {c.role === "admin" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            Admin
                          </span>
                        )}
                        {c.isActive !== "yes" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{c.email}</p>
                      {c.phone && <p className="text-xs text-gray-600">{c.phone}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {c.isActive === "yes" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg"
                        onClick={() => updateMutation.mutate({ id: c.id, isActive: "no" })}
                        disabled={updateMutation.isPending}
                      >
                        <UserX className="w-3 h-3 mr-1" />
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-green-500/20 text-green-400 hover:bg-green-500/10 rounded-lg"
                        onClick={() => updateMutation.mutate({ id: c.id, isActive: "yes" })}
                        disabled={updateMutation.isPending}
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        Ativar
                      </Button>
                    )}
                    {c.role === "closer" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 rounded-lg"
                        onClick={() => updateMutation.mutate({ id: c.id, role: "admin" })}
                        disabled={updateMutation.isPending}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        Tornar Admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-gray-500/20 text-gray-400 hover:bg-gray-500/10 rounded-lg"
                        onClick={() => updateMutation.mutate({ id: c.id, role: "closer" })}
                        disabled={updateMutation.isPending}
                      >
                        <ShieldOff className="w-3 h-3 mr-1" />
                        Remover Admin
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CloserLayout>
  );
}
