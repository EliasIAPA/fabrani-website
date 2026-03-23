import CloserLayout from "@/components/CloserLayout";
import { useCloserAuth } from "@/hooks/useCloserAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const PROJECT_TYPES = [
  { value: "certificacao_mec", label: "Certificação MEC" },
  { value: "projeto_alianca", label: "Projeto Aliança" },
  { value: "pos_mba_parceiros", label: "Pós/MBA Parceiros" },
  { value: "mentoria_ni1", label: "Mentoria NI1 Negócios Inovadores" },
];

export default function CloserNewProposal() {
  const { closer } = useCloserAuth();
  const [, setLocation] = useLocation();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const preselectedClientId = params.get("clientId");
  const utils = trpc.useUtils();

  const clientsInput = useMemo(() => ({ limit: 200 }), []);
  const { data: clientsData } = trpc.closer.listClients.useQuery(clientsInput, { enabled: !!closer });

  const [form, setForm] = useState({
    clientId: preselectedClientId || "",
    projectType: "",
    value: "",
    numberOfCourses: "1",
    observation: "",
  });

  const createMutation = trpc.closer.createProposal.useMutation({
    onSuccess: () => {
      toast.success("Proposta cadastrada com sucesso!");
      utils.closer.listProposals.invalidate();
      utils.closer.stats.invalidate();
      setLocation("/closer/propostas");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao cadastrar proposta");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientId || !form.projectType || !form.value) {
      toast.error("Preencha os campos obrigatórios: Cliente, Tipo de Projeto e Valor");
      return;
    }
    createMutation.mutate({
      clientId: parseInt(form.clientId),
      projectType: form.projectType as any,
      value: form.value,
      numberOfCourses: parseInt(form.numberOfCourses) || 1,
      observation: form.observation || undefined,
    });
  };

  return (
    <CloserLayout>
      <div className="max-w-2xl mx-auto space-y-6">
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
              Nova Proposta
            </h1>
            <p className="text-sm text-gray-500">Registre uma proposta enviada ao cliente</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Dados da Proposta</h2>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Cliente *</Label>
              <Select value={form.clientId} onValueChange={(v) => setForm((p) => ({ ...p, clientId: v }))}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  {clientsData?.clients?.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()} className="text-white hover:bg-white/5">
                      {c.companyName} - {c.mainPartner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Tipo de Projeto *</Label>
              <Select value={form.projectType} onValueChange={(v) => setForm((p) => ({ ...p, projectType: v }))}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-white hover:bg-white/5">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Valor da Proposta (R$) *</Label>
                <Input
                  value={form.value}
                  onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
                  placeholder="10000.00"
                  type="number"
                  step="0.01"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">Quantidade de Cursos</Label>
                <Input
                  value={form.numberOfCourses}
                  onChange={(e) => setForm((p) => ({ ...p, numberOfCourses: e.target.value }))}
                  type="number"
                  min="1"
                  className="bg-[#0a0a0a] border-white/10 text-white h-11 rounded-xl focus:border-red-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs">Observação</Label>
              <Textarea
                value={form.observation}
                onChange={(e) => setForm((p) => ({ ...p, observation: e.target.value }))}
                placeholder="Detalhes adicionais sobre a proposta..."
                className="bg-[#0a0a0a] border-white/10 text-white rounded-xl focus:border-red-500/50 min-h-[100px]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20"
          >
            {createMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Salvando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Registrar Proposta
              </div>
            )}
          </Button>
        </form>
      </div>
    </CloserLayout>
  );
}
