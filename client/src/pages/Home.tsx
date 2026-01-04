import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, GraduationCap, ShieldCheck, Users, Activity, Lock, Cpu, BarChart, CheckCircle2, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import ObsolescenceSimulator from "@/components/ObsolescenceSimulator";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Seção 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            PROTOCOLO DE EVOLUÇÃO: ATIVO
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            O MUNDO FOI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">REESCRITO.</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            VOCÊ JÁ DOMINA O <span className="text-neon-purple underline decoration-neon-purple/50 underline-offset-4">NOVO CÓDIGO?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 border-l-2 border-neon-cyan/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            A primeira faculdade <strong className="text-white">100% AI-Native</strong> do Brasil. Transformamos profissionais em <strong className="text-white">Líderes Aumentados</strong> com chancela MEC e a velocidade do Vale do Silício.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button 
              size="lg" 
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-8 rounded-none w-full sm:w-auto shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-1"
              onClick={() => {
                const element = document.getElementById('simulador');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              INICIAR MINHA EVOLUÇÃO <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
             onClick={() => {
               const element = document.getElementById('simulador');
               element?.scrollIntoView({ behavior: 'smooth' });
             }}>
          <ChevronDown className="w-10 h-10 text-neon-cyan opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* Seção 2: Interatividade (Simulador de Obsolescência) */}
      <section id="simulador" className="py-24 relative bg-secondary/5 border-y border-white/5 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="border-neon-purple text-neon-purple rounded-none px-4 py-1">FERRAMENTA EXCLUSIVA</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Simulador de <br />
                <span className="text-neon-purple">Obsolescência</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Descubra quanto do seu trabalho será automatizado nos próximos 3 anos e como a FABRANI é a sua vacina contra a irrelevância profissional.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Análise baseada em dados reais do mercado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Relatório personalizado de risco</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Plano de ação imediato</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-30 blur-xl"></div>
              <ObsolescenceSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Autoridade (Elite Intelectual) */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-neon-cyan/5 blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              A Elite Intelectual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">ao seu lado</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Conexão direta com <span className="text-white font-bold">400 mestres e doutores</span>. Não ensinamos teoria, entregamos implementação real.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-10 h-10 text-neon-cyan" />,
                title: "Rigor Acadêmico",
                desc: "Metodologia validada e corpo docente com a mais alta titulação acadêmica do país."
              },
              {
                icon: <Cpu className="w-10 h-10 text-neon-purple" />,
                title: "DNA de Inovação",
                desc: "Professores que lideram projetos de IA em grandes corporações e startups globais."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-white" />,
                title: "Chancela MEC",
                desc: "Segurança de um diploma reconhecido com a agilidade de um bootcamp de tecnologia."
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 bg-black/50 w-20 h-20 flex items-center justify-center rounded-full border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 4: Lead Magnet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border border-neon-cyan/30">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 z-0"></div>
            <div className="absolute inset-0 bg-[url('/images/ai-starter-pack.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan text-black text-xs font-bold uppercase tracking-wider">
                  Download Gratuito
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  BAIXE O GUIA: <br />
                  <span className="text-neon-cyan">50 Prompts de Ouro</span> para Executivos
                </h2>
                <p className="text-lg text-gray-300">
                  Economize 20h da sua semana. Uma curadoria exclusiva dos comandos mais poderosos para liderança, estratégia e produtividade.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-10 py-8 rounded-none shadow-lg flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  BAIXAR AGORA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Prova Social e Parceiros */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-12">
            Reconhecimento e Parcerias Estratégicas
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos - Using text for now as we don't have SVG assets */}
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <ShieldCheck className="w-8 h-8" /> MEC <span className="text-xs font-normal border border-white/30 px-2 py-0.5 rounded ml-2">NOTA MÁXIMA</span>
            </div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Cpu className="w-6 h-6" /> TECH_GIANTS</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Globe className="w-6 h-6" /> GLOBAL_CORPS</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Lock className="w-6 h-6" /> CYBER_SEC</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><BarChart className="w-6 h-6" /> DATA_INC</div>
          </div>
        </div>
      </section>
    </div>
  );
}
