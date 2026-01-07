import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Zap, Users, ArrowRight, Shield, Activity, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function NAP() {
  const services = [
    {
      title: "Diagnóstico de Performance",
      desc: "Identificamos barreiras que travam seu desempenho acadêmico e criamos rotas de superação.",
      icon: Activity
    },
    {
      title: "Estratégias de Aprendizagem 4.0",
      desc: "Técnicas personalizadas para você aprender mais rápido e reter conhecimento na era da informação infinita.",
      icon: Zap
    },
    {
      title: "Resiliência Emocional",
      desc: "Suporte para ressignificar pressões, ansiedades e desafios do ambiente universitário e familiar.",
      icon: Heart
    },
    {
      title: "Neurodiversidade e Inclusão",
      desc: "Suporte especializado para TEA (Lei 12.764/2012). Na FABRANI, a neurodiversidade é uma vantagem competitiva.",
      icon: Brain
    }
  ];

  const audiences = [
    {
      role: "Estudantes",
      desc: "Que buscam equilíbrio entre a vida pessoal e a intensidade da formação em IA."
    },
    {
      role: "Docentes",
      desc: "Orientação estratégica para apoiar a evolução de seus alunos."
    },
    {
      role: "Famílias",
      desc: "Conexão necessária para fortalecer o ecossistema educativo do aluno."
    },
    {
      role: "Colaboradores",
      desc: "Suporte psicopedagógico para manter a excelência no atendimento e gestão."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-background"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-4">
              <Heart className="w-4 h-4 text-neon-purple" />
              <span className="uppercase tracking-wider text-xs">Human Intelligence in the AI Age</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              INTELIGÊNCIA HUMANA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">PARA UM MUNDO DE IA</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Na FABRANI, acreditamos que a tecnologia mais potente ainda é o cérebro humano. 
              O NAP é o seu suporte para otimizar o aprendizado, equilibrar as emoções e maximizar seu potencial cognitivo.
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">O Core Humano</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                O NAP não é apenas um núcleo de apoio; é o seu <strong className="text-white">hub de resiliência</strong>. 
                Nossa missão é garantir que cada aluno, professor e colaborador tenha a base emocional e pedagógica necessária para transformar desafios em saltos de crescimento.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Integramos Psicologia e Pedagogia para criar uma jornada acadêmica equilibrada e de alta performance.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-neon-purple/20 bg-black/50 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-50"></div>
              <Brain className="w-48 h-48 text-white/5 group-hover:text-neon-purple/30 transition-colors duration-700 animate-pulse" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-neon-cyan" />
                    <span className="font-bold text-white">Espaço Seguro</span>
                  </div>
                  <p className="text-sm text-gray-400">Sigilo absoluto e acolhimento profissional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Otimizamos sua Jornada</h2>
            <p className="text-muted-foreground">Ferramentas para desbloquear seu potencial máximo</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="bg-black border-white/10 hover:border-neon-cyan/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/10 transition-colors">
                    <service.icon className="w-6 h-6 text-neon-purple group-hover:text-neon-cyan transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Público Alvo */}
      <section className="py-24 bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Para Quem é o NAP?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {audiences.map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-6 rounded-xl bg-black/50 border border-white/5 hover:border-white/20 transition-colors">
                  <div className="mt-1">
                    <Users className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.role}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selo de Excelência */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-neon-purple/10 to-transparent border border-neon-purple/20">
            <Sparkles className="w-8 h-8 text-neon-purple mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">O Selo de Excelência FABRANI</h3>
            <p className="text-lg text-gray-300 italic">
              "Formar profissionais de elite para o mercado global exige mais do que ensinar código; exige formar mentes saudáveis. O autoconhecimento é a base da liderança exponencial."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/10 via-transparent to-transparent"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Sua evolução começa com o equilíbrio</h2>
          <p className="text-xl text-gray-400 mb-8">
            Responsável: <span className="text-white">Natalia Domingues da Silva</span> (Coordenadora do Núcleo)
          </p>
          
          <div className="flex flex-col items-center gap-6">
            
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Acesso rápido e sigiloso disponível diretamente no seu dashboard de aluno.
              </p>
              <p className="text-neon-purple font-mono">
                nap@fabrani.com.br
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
