import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Code, Cpu, Globe, Layers, Zap, Terminal, BarChart3, Shield, HeartPulse, Scale, GraduationCap, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section - Manifesto */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10"></div>
          <img 
            src="/images/hero-neural-network.jpg" 
            alt="Neural Network Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            SYSTEM_STATUS: ONLINE // AI_NATIVE_EDUCATION
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            O CÓDIGO DO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">FUTURO</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            "Não seja substituído pela IA. Torne-se o profissional que a domina."
            <br />
            <span className="text-sm font-mono mt-4 block text-white/60">FABRANI: A primeira faculdade 100% AI-Native do Brasil.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button size="lg" className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-8 py-6 rounded-none w-full sm:w-auto">
              INICIAR MINHA EVOLUÇÃO <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-mono text-lg px-8 py-6 rounded-none w-full sm:w-auto">
              LER MANIFESTO_
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats / Authority Section */}
      <section className="py-20 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white font-mono">400+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Mestres e Doutores</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-neon-purple font-mono">100%</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Foco em IA</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-neon-cyan font-mono">MEC</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Nota Máxima</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white font-mono">24/7</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Suporte AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Graduação Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 border-neon-cyan text-neon-cyan rounded-none">GRADUAÇÃO AI-DRIVEN</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O Novo Core <br />da Economia</h2>
            </div>
            <p className="text-muted-foreground max-w-md text-right md:text-left">
              Esqueça o ensino tradicional. Nossos cursos superiores de 2 anos são desenhados para formar líderes que comandam a automação.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden border border-white/10 bg-card hover:border-neon-cyan/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500"></div>
                <img src="/images/graduation-future-work.jpg" alt="Marketing Digital" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20">
                  <Globe className="w-8 h-8 text-neon-cyan mb-2" />
                </div>
              </div>
              <div className="p-8 relative z-20">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">Marketing Digital AI-Driven</h3>
                <p className="text-muted-foreground mb-6">
                  Esqueça o tráfego pago manual. Aprenda a gerenciar ecossistemas de agentes autônomos de vendas e personalização em escala infinita.
                </p>
                <div className="flex items-center text-sm font-mono text-white/60 group-hover:text-white transition-colors">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>Duração: 2 Anos</span>
                  <span className="mx-2">|</span>
                  <span>Certificado MEC</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden border border-white/10 bg-card hover:border-neon-purple/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500"></div>
                <img src="/images/graduation-future-work.jpg" alt="Negócios Imobiliários" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale" />
                <div className="absolute bottom-4 left-4 z-20">
                  <BarChart3 className="w-8 h-8 text-neon-purple mb-2" />
                </div>
              </div>
              <div className="p-8 relative z-20">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-purple transition-colors">Negócios Imobiliários 4.0</h3>
                <p className="text-muted-foreground mb-6">
                  A era do corretor acabou. Bem-vindo à era do Analista de Dados Imobiliários, PropTech e Cidades Inteligentes.
                </p>
                <div className="flex items-center text-sm font-mono text-white/60 group-hover:text-white transition-colors">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>Duração: 2 Anos</span>
                  <span className="mx-2">|</span>
                  <span>Certificado MEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MBAs Section */}
      <section className="py-32 bg-secondary/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-neon-purple/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-neon-cyan/5 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 border-neon-purple text-neon-purple rounded-none">PÓS-GRADUAÇÃO & MBA</Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Especialize-se na <br />Vanguarda</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Programas focados em ROI imediato. Transforme sua carreira com a aplicação prática de IA em setores críticos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "MBA IA para Negócios", icon: <BriefcaseIcon />, desc: "Transforme sua empresa em uma organização exponencial.", color: "text-neon-cyan" },
              { title: "MBA IA para Saúde", icon: <HeartPulse />, desc: "Diagnósticos preditivos e gestão hospitalar autônoma.", color: "text-red-400" },
              { title: "MBA IA Jurídico", icon: <Scale />, desc: "O fim da burocracia. Análise processual em segundos.", color: "text-yellow-400" },
              { title: "MBA IA para Marketing", icon: <Zap />, desc: "Do conteúdo à conversão: escala infinita com personalização.", color: "text-orange-400" },
              { title: "MBA Formação de Closer", icon: <Users />, desc: "Use IA para ler microexpressões e fechar vendas de alto ticket.", color: "text-green-400" },
              { title: "MBA IA para Educação", icon: <GraduationCap />, desc: "Personalização extrema e trilhas de aprendizado individuais.", color: "text-blue-400" },
            ].map((mba, index) => (
              <Card key={index} className="bg-black/40 border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 ${mba.color} group-hover:scale-110 transition-transform`}>
                    {mba.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-white transition-colors">{mba.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{mba.desc}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className={`p-0 h-auto ${mba.color} opacity-70 group-hover:opacity-100`}>
                    Saiba mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Starter Pack Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-white/10 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
              <img src="/images/ai-starter-pack.jpg" alt="AI Starter Pack" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">AI Starter Pack <span className="text-neon-cyan text-2xl align-top font-mono">[GRÁTIS]</span></h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Não sabe por onde começar? Acesse agora 3 módulos gratuitos: Engenharia de Prompt, Ferramentas de Produtividade e Ética em IA.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-neon-cyan rounded-full"></div> Acesso imediato ao portal</li>
                  <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-neon-cyan rounded-full"></div> Certificado de participação</li>
                  <li className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-neon-cyan rounded-full"></div> Curadoria de ferramentas semanais</li>
                </ul>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold rounded-none">
                  LIBERAR MEU ACESSO AGORA
                </Button>
              </div>
              
              <div className="w-full md:w-1/3 bg-black/50 backdrop-blur-md border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <span className="font-mono text-xs text-muted-foreground">DOWNLOAD_SPEED</span>
                  <span className="font-mono text-xs text-neon-cyan">100 MB/s</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Módulo 01: Prompt Engineering</span>
                      <span className="text-neon-cyan">100%</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-cyan w-full"></div></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Módulo 02: AI Tools</span>
                      <span className="text-neon-cyan">84%</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-cyan w-[84%]"></div></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Módulo 03: Ethics & Future</span>
                      <span className="text-neon-cyan">0%</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-cyan w-0"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">O futuro não espera. <br />Ele é codificado agora.</h2>
          <Button size="lg" className="bg-neon-purple text-white hover:bg-neon-purple/80 font-bold text-lg px-12 py-8 rounded-none shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-shadow">
            INSCREVA-SE NO VESTIBULAR
          </Button>
        </div>
      </section>
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  )
}
