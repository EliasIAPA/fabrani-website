import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function BrevoDownloadForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const subscribeMutation = trpc.brevo.subscribe.useMutation({
    onSuccess: () => {
      setStatus("success");
      setEmail("");
      setNome("");
      setWhatsapp("");
      
      // Iniciar download do PDF após 2 segundos
      setTimeout(() => {
        window.open("/downloads/g.prompt2026.pdf", "_blank");
      }, 2000);
    },
    onError: (error) => {
      setStatus("error");
      setErrorMessage(error.message || "Erro ao processar sua solicitação. Tente novamente.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !nome || !whatsapp) {
      setStatus("error");
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    subscribeMutation.mutate({
      email,
      nome,
      whatsapp,
    });
  };

  if (status === "success") {
    return (
      <div className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-2xl p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-neon-cyan mx-auto mb-6 animate-pulse" />
        <h3 className="text-2xl font-bold mb-3 text-white">
          🎉 Cadastro Realizado com Sucesso!
        </h3>
        <p className="text-gray-300 text-lg mb-2">
          O download do <span className="text-neon-cyan font-bold">Guia de Prompts 2026</span> iniciará em instantes...
        </p>
        <p className="text-gray-400 text-sm">
          Verifique também seu e-mail para acessar o material a qualquer momento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-bold text-gray-300 mb-2">
            Nome Completo *
          </label>
          <Input
            id="nome"
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-12 text-base text-white focus:ring-neon-cyan focus:border-neon-cyan" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
            E-mail *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base text-white focus:ring-neon-cyan focus:border-neon-cyan" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-300 mb-2">
            WhatsApp (com DDD) *
          </label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="(16) 99999-9999"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="h-12 text-base text-white focus:ring-neon-cyan focus:border-neon-cyan" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
            disabled={status === "loading"}
            required
          />
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-black font-bold text-lg h-14 rounded-lg transition-all shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:shadow-[0_0_50px_rgba(0,217,255,0.5)]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            PROCESSANDO...
          </>
        ) : (
          "BAIXAR GUIA AGORA"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Ao preencher este formulário, você concorda em receber comunicações da FABRANI sobre IA e educação.
      </p>
    </form>
  );
}
