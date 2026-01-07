import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-12 text-muted-foreground hover:text-neon-cyan pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Futuro
          </Button>
        </Link>

        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="border-l-2 border-neon-cyan pl-6">
            <div className="flex items-center gap-2 text-neon-cyan mb-4 font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>MANIFESTO_V1.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              NÃO ESTAMOS AQUI PARA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">ADAPTAR VOCÊ AO FUTURO.</span>
            </h1>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
              Estamos aqui para garantir que você seja quem <strong className="text-white">escreve o código dele.</strong>
            </p>

            <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <h3 className="text-2xl font-bold text-white mb-4">O Velho Mundo Acabou</h3>
            <p className="text-gray-400 mb-8">
              A educação tradicional morreu no dia em que a Inteligência Artificial passou no exame da OAB, diagnosticou doenças complexas e escreveu códigos melhores que seniores. Continuar aprendendo como se estivéssemos em 2020 não é apenas ineficiente. É perigoso.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">A Era da Liderança Aumentada</h3>
            <p className="text-gray-400 mb-8">
              Na FABRANI, não formamos "operadores de ferramentas". Formamos arquitetos de sistemas. Profissionais que não competem com a IA, mas que a utilizam como uma extensão do próprio intelecto.
            </p>
            
            <blockquote className="border-l-4 border-neon-purple pl-6 italic text-xl text-gray-300 my-12 bg-white/5 p-8 rounded-r-lg">
              "A IA não vai substituir médicos, advogados ou gestores. Mas médicos, advogados e gestores que usam IA vão substituir os que não usam."
            </blockquote>

            <h3 className="text-2xl font-bold text-white mb-4">Nosso Compromisso Radical</h3>
            <ul className="list-none space-y-4 text-gray-400 mb-12">
              <li className="flex gap-3">
                <span className="text-neon-cyan font-bold">01.</span>
                <span>Zero obsolescência: Nossos currículos são atualizados semanalmente, não anualmente.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan font-bold">02.</span>
                <span>Prática Brutal: Você não vai "estudar sobre" IA. Você vai construir com IA desde o dia 1.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan font-bold">03.</span>
                <span>Elite Intelectual: Acesso direto a mentes que estão construindo a fronteira da tecnologia.</span>
              </li>
            </ul>

            <div className="bg-neon-cyan/10 border border-neon-cyan/30 p-8 rounded-lg text-center mt-16">
              <h4 className="text-2xl font-bold text-white mb-4">Você está pronto para liderar a revolução?</h4>
              <p className="text-gray-300 mb-8">
                A história não pede licença. Ela atropela quem está parado e eleva quem se move rápido.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
