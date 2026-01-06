import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    NOME: "",
    EMAIL: "",
    WHATSAPP: ""
  });

  // URL de ação do formulário Brevo (Placeholder - O usuário deve substituir)
  // Exemplo: https://sibforms.com/serve/MUIE...
  const BREVO_ACTION_URL = "https://sibforms.com/serve/YOUR_FORM_ID_HERE"; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio para demonstração (já que não temos a URL real)
    // Em produção, isso seria um fetch POST para a URL da Brevo ou submissão de form nativo
    try {
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success("Cadastro realizado com sucesso!");
      
      if (onSuccess) {
        setTimeout(onSuccess, 1000); // Executa callback após sucesso
      }
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
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
          <Label htmlFor="NOME" className="text-gray-300">Nome Completo</Label>
          <Input
            id="NOME"
            name="NOME"
            placeholder="Seu nome"
            required
            value={formData.NOME}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="EMAIL" className="text-gray-300">E-mail Corporativo</Label>
          <Input
            id="EMAIL"
            name="EMAIL"
            type="email"
            placeholder="seu@email.com"
            required
            value={formData.EMAIL}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="WHATSAPP" className="text-gray-300">WhatsApp</Label>
          <Input
            id="WHATSAPP"
            name="WHATSAPP"
            type="tel"
            placeholder="(11) 99999-9999"
            required
            value={formData.WHATSAPP}
            onChange={handleChange}
            className="bg-zinc-900/50 border-white/10 focus:border-neon-cyan/50 text-white"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className={`w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold mt-2 ${layout === "horizontal" ? "md:col-span-3" : ""}`}
      >
        {isLoading ? (
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
