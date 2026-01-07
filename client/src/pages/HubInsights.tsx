import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Lock, ChevronRight, Search, TrendingUp, Users, DollarSign, Zap, BarChart, ShieldCheck, Rocket } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { insights } from "@/data/insights";
import BrevoDownloadForm from "@/components/BrevoDownloadForm";

export default function HubInsights() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    "Todos", "Marketing", "Vendas", "RH", "Atendimento", "Processos", "Produtos"
  ];

  // Mapeamento de ícones (já que não podemos serializar componentes React no arquivo de dados)
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "DollarSign": return <DollarSign className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5" />;
      case "Zap": return <Zap className="w-5 h-5" />;
      case "Rocket": return <Rocket className="w-5 h-5" />;
      default: return <BarChart className="w-5 h-5" />;
    }
  };

  const filteredInsights = activeCategory === "Todos" 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section - Estilo Netflix Destaque */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hub-hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-end pb-20 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Badge variant="outline" className="border-neon-cyan text-neon-cyan px-4 py-1 mb-4 text-sm tracking-wider uppercase">
              Relatório Exclusivo 2025
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              A VERDADE BRUTAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">SOBRE IA E NEGÓCIOS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Enquanto seus concorrentes discutem "se vale a pena", empresas ágeis já estão usando IA para multiplicar lucros por 5x. Descubra as 48 aplicações que estão reescrevendo as regras do jogo.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('download-guia')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-8 py-6 rounded-none flex items-center gap-3 cursor-pointer"
              >
                <Download className="w-6 h-6" /> BAIXAR RELATÓRIO COMPLETO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Download com Formulário Brevo */}
      <section id="download-guia" className="py-20 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-y border-neon-cyan/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 mb-4 text-sm font-bold px-4 py-1">
                MATERIAL EXCLUSIVO
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                BAIXE O GUIA:<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                  50 Prompts de Ouro para Executivos
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Economize 20h da sua semana. Uma curadoria exclusiva dos comandos mais poderosos para liderança, estratégia e produtividade.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-md border border-neon-cyan/20 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,217,255,0.1)]">
              <BrevoDownloadForm />
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-neon-cyan" />
                <span>Download Instantâneo</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-neon-cyan" />
                <span>Dados Protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação de Categorias */}
      <section className="sticky top-20 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-white text-black scale-105" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar insights..." 
                className="bg-transparent border-none focus:outline-none text-sm text-white w-32 md:w-48 placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Conteúdo */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Tendências em Destaque</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10"><ChevronRight className="w-6 h-6 rotate-180" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10"><ChevronRight className="w-6 h-6" /></Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card de Download do Guia de Prompts 2026 */}
          <div className="group relative bg-gradient-to-br from-zinc-900 to-black border border-neon-cyan/30 hover:border-neon-cyan/60 transition-all duration-500 overflow-hidden rounded-xl cursor-pointer h-full flex flex-col shadow-[0_0_20px_rgba(0,217,255,0.1)] hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]">
            <div className="relative h-48 overflow-hidden shrink-0 bg-zinc-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="relative z-20 flex flex-col items-center gap-2">
                <Download className="w-12 h-12 text-neon-cyan animate-bounce" />
                <Badge className="bg-neon-cyan text-black font-bold border-none">NOVO</Badge>
              </div>
            </div>
            
            <div className="p-8 relative z-20 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors leading-tight">
                Guia de Prompts 2026
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                Domine a engenharia de prompts com nosso guia exclusivo. Aprenda a extrair o máximo dos LLMs mais avançados do mercado.
              </p>
              
              <Button 
                onClick={() => document.getElementById('download-guia')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="w-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan hover:text-black font-bold transition-all"
              >
                BAIXAR PDF AGORA
              </Button>
            </div>
          </div>

          {filteredInsights.map((insight) => (
            <Link key={insight.id} href={`/hub-insights/${insight.id}`}>
              <div className="group relative bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden rounded-xl cursor-pointer h-full flex flex-col">
                {/* Imagem com Overlay */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10`}></div>
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold border border-white/10 flex items-center gap-2">
                    {getIcon(insight.icon)} {insight.category}
                  </div>
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${insight.image})` }}
                  ></div> 
                </div>

                {/* Conteúdo */}
                <div className="p-8 relative z-20 -mt-12 flex flex-col flex-grow">
                  <div className={`inline-block px-3 py-1 rounded border ${insight.borderColor} bg-black/50 backdrop-blur-md text-xs font-bold ${insight.color} mb-4 self-start`}>
                    {insight.stats}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors leading-tight">
                    {insight.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-gray-500">
                          <Users className="w-3 h-3" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-white font-bold pl-1">
                        +2k
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="text-white hover:text-neon-cyan p-0 hover:bg-transparent group-hover:translate-x-2 transition-transform">
                      LER AGORA <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>



      {/* Seção Bloqueada (Lead Magnet) */}
      <section className="py-20 bg-zinc-900/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-neon-purple/50 animate-pulse">
            <Lock className="w-8 h-8 text-neon-purple" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Diagnóstico de IA <span className="text-neon-purple">Personalizado</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Responda 7 perguntas estratégicas e descubra as 3 aplicações de IA que vão transformar sua empresa nos próximos 90 dias.
          </p>
          

          
          <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Suas respostas são anônimas e seguras
          </p>
        </div>
      </section>
    </div>
  );
}
