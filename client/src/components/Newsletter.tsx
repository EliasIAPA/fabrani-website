import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulação de envio para API (Brevo/Mailchimp)
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Inscrição realizada com sucesso! Bem-vindo à revolução da IA.");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="w-full bg-zinc-900/50 border border-neon-cyan/20 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
      {/* Efeitos de Fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] group-hover:bg-neon-purple/20 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px] group-hover:bg-neon-cyan/20 transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-neon-cyan/10 rounded-lg">
              <Mail className="w-6 h-6 text-neon-cyan" />
            </div>
            <span className="text-neon-cyan font-bold tracking-wider text-sm">FABRANI INSIGHTS</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Receba a Inteligência do Futuro
          </h3>
          <p className="text-gray-400 text-lg">
            Junte-se a +15.000 líderes e receba semanalmente análises exclusivas sobre IA, tendências de mercado e estratégias de negócios.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[350px]">
          {isSuccess ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-white font-bold">Inscrição Confirmada!</p>
                <p className="text-green-400 text-sm">Verifique seu e-mail em breve.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Seu melhor e-mail corporativo" 
                  className="bg-black/50 border-white/10 text-white h-14 pl-4 pr-4 rounded-xl focus:border-neon-cyan/50 focus:ring-neon-cyan/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80 text-white font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Inscrever-se Gratuitamente"
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Zero spam. Apenas conteúdo de alto valor. Cancele quando quiser.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
