import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface BrevoFormProps {
  onSuccess?: () => void;
  buttonText?: string;
  className?: string;
  layout?: "vertical" | "horizontal";
}

export default function BrevoForm({ 
  onSuccess, 
  buttonText = "Inscrever-se", 
  className = "",
  layout = "vertical"
}: BrevoFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: ""
  });

  const subscribeMutation = trpc.brevo.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      if (onSuccess) {
        setTimeout(onSuccess, 1000);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao enviar. Tente novamente.");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate(formData);
  };

  if (subscribeMutation.isSuccess) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-300 h-full min-h-[200px]">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Sucesso!</h3>
          <p className="text-green-400">Seus dados foram recebidos.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      <div className={layout === "horizontal" ? "grid md:grid-cols-3 gap-4" : "space-y-4"}>
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-gray-300">Nome Completo</Label>
          <Input
            id="nome"
            name="nome"
            placeholder="Seu nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">E-mail Corporativo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
            required
            value={formData.whatsapp}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={subscribeMutation.isPending}
        className={`w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold mt-2 ${layout === "horizontal" ? "md:col-span-3" : ""}`}
      >
        {subscribeMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
          </>
        ) : (
          <>
            {buttonText} <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        Seus dados estão seguros. Política de Privacidade FABRANI.
      </p>
    </form>
  );
}
