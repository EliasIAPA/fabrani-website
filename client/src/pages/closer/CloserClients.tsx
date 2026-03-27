import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, Plus, Phone, MapPin, FileText, Pencil } from "lucide-react";
import { Link } from "wouter";

export default function CloserClients() {
  const { closer } = useCloserAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const searchInput = useMemo(() => ({ search: search || undefined, page, limit: 20 }), [search, page]);
  const { data, isLoading } = trpc.closer.listClients.useQuery(searchInput, { enabled: !!closer });

  return (
    <CloserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-red-400" />
              Clientes
            </h1>
            <p className="text-sm text-gray-500">{data?.total || 0} clientes cadastrados</p>
          </div>
          <Link href="/closer/novo-cliente">
            <Button className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <Input
            placeholder="Buscar por empresa, sócio, CNPJ, CPF ou WhatsApp..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-[#111111] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
          />
        </div>

        {/* Client list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#111111] border border-white/5 rounded-2xl p-5 animate-pulse">
                <div className="h-5 w-48 bg-white/5 rounded mb-2" />
                <div className="h-4 w-32 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : data?.clients?.length === 0 ? (
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum cliente encontrado</p>
            <Link href="/closer/novo-cliente">
              <Button className="mt-4 bg-red-600 hover:bg-red-500 text-white rounded-xl" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Primeiro Cliente
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.clients?.map((client) => (
              <div
                key={client.id}
                className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-white font-semibold">{client.companyName}</h3>
                    <p className="text-sm text-gray-400">{client.mainPartner}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      {client.cnpj && <span>CNPJ: {client.cnpj}</span>}
                      {client.cpf && <span>CPF: {client.cpf}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Phone className="w-3 h-3" />
                      {client.whatsapp}
                    </div>
                    {client.city && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {client.city}{client.state ? ` - ${client.state}` : ""}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link href={`/closer/editar-cliente/${client.id}`}>
                        <Button size="sm" variant="outline" className="text-xs border-white/10 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg">
                          <Pencil className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                      </Link>
                      <Link href={`/closer/nova-proposta?clientId=${client.id}`}>
                        <Button size="sm" variant="outline" className="text-xs border-white/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 rounded-lg">
                          <FileText className="w-3 h-3 mr-1" />
                          Nova Proposta
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
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
