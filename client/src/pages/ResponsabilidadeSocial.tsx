import { motion } from "framer-motion";
import { Heart, Globe, Users, Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResponsabilidadeSocial() {
  return (
    <div className="min-h-screen bg-void-black text-white selection:bg-neon-cyan selection:text-void-black overflow-hidden pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-mono mb-6">
              <Heart className="w-3 h-3" />
              <span>TECH FOR GOOD</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-display">
              CODIFICANDO UM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">FUTURO MAIS HUMANO</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Na FABRANI, acreditamos que a Inteligência Artificial é a ferramenta mais poderosa para reduzir desigualdades. Nossa missão vai além do código: formamos líderes éticos comprometidos com o impacto social positivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pilares de Atuação */}
      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Globe,
                title: "Inclusão Digital 4.0",
                desc: "Levamos letramento em IA para comunidades carentes, democratizando o acesso às ferramentas do futuro.",
                color: "text-neon-cyan"
              },
              {
                icon: Users,
                title: "Diversidade Tech",
                desc: "Programas de bolsas focados em grupos sub-representados na tecnologia. A inovação precisa de múltiplas visões.",
                color: "text-neon-purple"
              },
              {
                icon: Leaf,
                title: "Sustentabilidade",
                desc: "Green AI: Incentivamos projetos que utilizam algoritmos para otimizar recursos e proteger o meio ambiente.",
                color: "text-green-400"
              },
              {
                icon: ShieldCheck,
                title: "Ética em IA",
                desc: "Nossos alunos aprendem a desenvolver sistemas justos, transparentes e livres de vieses discriminatórios.",
                color: "text-yellow-400"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-neon-cyan/50 transition-all duration-300 h-full group">
                  <CardHeader>
                    <item.icon className={`w-10 h-10 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos em Destaque */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Impacto Real</h2>
              <p className="text-muted-foreground max-w-xl">
                Conheça algumas das iniciativas desenvolvidas por nossos alunos e professores que estão transformando a realidade local.
              </p>
            </div>
            <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black">
              Ver Todos os Projetos <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-video flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              {/* Placeholder visual - em produção seria uma imagem real */}
              <div className="absolute inset-0 bg-neon-purple/20 group-hover:bg-neon-purple/30 transition-colors"></div>
              
              <div className="relative z-20">
                <div className="text-neon-cyan text-xs font-mono mb-2">PROJETO DESTAQUE</div>
                <h3 className="text-2xl font-bold mb-2">IA contra a Fome</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Sistema logístico preditivo que conecta restaurantes a ONGs, otimizando a distribuição de alimentos excedentes em tempo real.
                </p>
                <span className="text-xs text-white/60 border border-white/20 px-2 py-1 rounded">ODS 2: Fome Zero</span>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-video flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-neon-cyan/20 group-hover:bg-neon-cyan/30 transition-colors"></div>
              
              <div className="relative z-20">
                <div className="text-neon-cyan text-xs font-mono mb-2">PROJETO DESTAQUE</div>
                <h3 className="text-2xl font-bold mb-2">Educação Personalizada</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Tutor virtual adaptativo para escolas públicas, auxiliando professores no reforço escolar de matemática e lógica.
                </p>
                <span className="text-xs text-white/60 border border-white/20 px-2 py-1 rounded">ODS 4: Educação de Qualidade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Voluntariado */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"></div>
          
          <h2 className="text-3xl font-bold mb-6">Quer fazer parte dessa transformação?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Seja você aluno, empresa parceira ou membro da comunidade, há um lugar para você em nossos projetos de responsabilidade social.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-neon-cyan text-black hover:bg-cyan-400 font-bold px-8 py-6 text-lg">
              Quero ser Voluntário
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 px-8 py-6 text-lg">
              Propor Parceria
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
