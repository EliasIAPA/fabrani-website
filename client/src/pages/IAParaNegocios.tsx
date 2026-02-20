import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Brain, Building2, BarChart3, Rocket, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function IAParaNegocios() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-sm font-mono mb-6 backdrop-blur-sm">
                SOLUÇÕES CORPORATIVAS
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                Acelere seu Negócio com a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse-slow">
                  Inteligência Artificial
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Transforme dados em decisões, automatize processos complexos e capacite sua equipe com as tecnologias que estão redefinindo o mercado global.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="h-14 px-8 text-lg bg-neon-cyan text-black hover:bg-neon-cyan/90 rounded-none border-0 font-bold tracking-wide min-w-[200px]">
                  FALAR COM CONSULTOR
                </Button>
                <Button variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/5 rounded-none min-w-[200px]">
                  CONHECER SOLUÇÕES
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Consultoria Estratégica",
                desc: "Diagnóstico completo para identificar oportunidades de implementação de IA no seu modelo de negócio."
              },
              {
                icon: Rocket,
                title: "Treinamento In-Company",
                desc: "Capacitação personalizada para times, do letramento digital à engenharia de prompt avançada."
              },
              {
                icon: BarChart3,
                title: "Análise Preditiva",
                desc: "Utilize algoritmos avançados para prever tendências de mercado e comportamento do consumidor."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 border border-white/10 bg-black/50 hover:border-neon-cyan/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-neon-cyan/10 transition-colors">
                  <item.icon className="w-7 h-7 text-neon-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neon-purple/5 to-black" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Pronto para o <span className="text-neon-cyan">Próximo Nível?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Não deixe sua empresa ficar para trás na revolução da IA. Agende uma reunião estratégica com nossos especialistas.
          </p>
          <Button className="h-16 px-10 text-xl bg-white text-black hover:bg-gray-200 rounded-none font-bold">
            AGENDAR DIAGNÓSTICO GRATUITO <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>
    </div>
  );
}
