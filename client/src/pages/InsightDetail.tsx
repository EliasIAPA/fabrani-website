import { useRoute, Link } from "wouter";
import { insights } from "@/data/insights";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Download, Calendar, Clock, User } from "lucide-react";
import { useEffect } from "react";

export default function InsightDetail() {
  const [match, params] = useRoute("/hub-insights/:id");
  const insightId = params ? parseInt(params.id) : 0;
  const insight = insights.find(i => i.id === insightId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [insightId]);

  if (!insight) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <h1 className="text-4xl font-bold text-neon-cyan">Insight não encontrado</h1>
        <Link href="/hub-insights">
          <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
            <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para o Hub
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero do Artigo */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${insight.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Link href="/hub-insights">
              <Button variant="ghost" className="text-gray-400 hover:text-white mb-6 pl-0 hover:bg-transparent">
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Insights
              </Button>
            </Link>
            
            <div className={`inline-block px-3 py-1 rounded border ${insight.borderColor} bg-black/50 backdrop-blur-md text-xs font-bold ${insight.color} mb-4`}>
              {insight.category}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {insight.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Equipe FABRANI Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Atualizado em Jan 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min de leitura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-[1fr_300px] gap-12">
        <article className="prose prose-invert prose-lg max-w-none">
          <div className="bg-zinc-900/50 border-l-4 border-neon-cyan p-6 mb-10 rounded-r-lg">
            <h3 className="text-xl font-bold text-white m-0 mb-2">Impacto Esperado</h3>
            <p className="text-gray-300 m-0">{insight.stats}</p>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: insight.fullContent || "" }} />
          
          <div className="mt-12 p-8 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Quer aplicar isso na sua empresa?</h3>
            <p className="text-gray-400 mb-6">
              Nossos especialistas podem ajudar você a implementar essas estratégias de IA em tempo recorde.
            </p>
            <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
              <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold w-full md:w-auto">
                Agendar Consultoria Gratuita
              </Button>
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 sticky top-24">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-neon-purple" /> Downloads
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white block">Checklist de Implementação</span>
                  <span className="text-xs text-gray-500">PDF • 2.4 MB</span>
                </a>
              </li>
              <li>
                <a href="#" className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white block">Infográfico Resumo</span>
                  <span className="text-xs text-gray-500">PNG • 1.1 MB</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-neon-cyan" /> Compartilhar
              </h4>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-neon-cyan">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10 hover:text-neon-cyan">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
