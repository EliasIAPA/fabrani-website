import { Mail } from "lucide-react";
import BrevoForm from "./BrevoForm";

export default function Newsletter() {
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
          <BrevoForm buttonText="Inscrever-se Gratuitamente" />
        </div>
      </div>
    </div>
  );
}
