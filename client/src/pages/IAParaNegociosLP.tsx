import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Users, BarChart, Brain, Rocket, Lock, Clock, Award, ChevronDown, PlayCircle, Zap, Target, Database, Cpu, Globe, Layers, MessageSquare, AlertTriangle, HelpCircle, FileText, Monitor, Briefcase, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CountdownTimer from "@/components/CountdownTimer";

export default function IAParaNegociosLP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio para Brevo
    console.log("Enviando dados para Brevo:", formData);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", phone: "", role: "" });
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('capture-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      
      {/* Contador de Urgência (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <CountdownTimer />
      </div>

      {/* Navbar Simplificada (Ajustada para não sobrepor o contador) */}
      <header className="fixed top-[52px] sm:top-[60px] left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-4 transition-all duration-300">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo-fabrani.png" alt="FABRANI" className="h-8 md:h-10 w-auto object-contain cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white hidden md:block transition-colors">
              Voltar ao Site
            </Link>
            <Button 
              onClick={handleScrollToForm}
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-sm md:text-base px-6 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)] animate-pulse-slow"
            >
              GARANTIR MINHA VAGA
            </Button>
          </div>
        </div>
      </header>

      {/* CTA Flutuante Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <Button 
          onClick={handleScrollToForm}
          className="w-full bg-neon-purple text-white hover:bg-neon-purple/80 font-bold text-lg py-6 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          QUERO ME INSCREVER AGORA
        </Button>
      </div>

      {/* SEÇÃO 1: HERO SECTION (Expandida) */}
      <section className="relative pt-48 pb-20 md:pt-64 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-6xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs md:text-sm font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
            FABRANI - A PRIMEIRA FACULDADE 100% AI-NATIVE DO BRASIL
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            O MUNDO FOI REESCRITO. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              VOCÊ JÁ DOMINA O NOVO CÓDIGO?
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Transforme-se em <strong className="text-white">Líder de IA em 6 Meses</strong> com o Único MBA que Une a Ciência do MEC à Velocidade do Vale do Silício. <br className="hidden md:block" />
            <span className="text-neon-cyan font-bold">100% Prático. 100% Aplicável. Residência em IA Garantida.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 mb-16">
            <Button 
              onClick={handleScrollToForm}
              size="lg" 
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-xl px-12 py-8 rounded-xl w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all transform hover:-translate-y-1"
            >
              QUERO DOMINAR IA AGORA <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Lock className="w-4 h-4 text-neon-purple" />
              <span>Vagas Limitadas: Apenas 50 Alunos/Turma</span>
            </div>
          </div>

          {/* Prova Social Rápida */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">+150</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Projetos Educacionais</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2.5 Mi</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Alunos Impactados</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">MEC 5</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Nota Máxima</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">AI-Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: PROBLEM SECTION (Agitação Brutal da Dor) */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10 mb-4 px-4 py-1">ALERTA DE MERCADO</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              A Verdade Que Ninguém Te Conta: <br />
              <span className="text-red-500">Quem Não Dominar IA Nos Próximos 2 Anos Será Irrelevante</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              O mercado não perdoa obsolescência. A pergunta não é SE a IA vai transformar seu setor, mas SE você estará liderando ou sendo substituído.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: "O Medo da Substituição",
                desc: "A ansiedade de saber que sua posição está em risco. O World Economic Forum prevê que 85 milhões de empregos serão substituídos até 2025. Você está seguro?",
                color: "text-red-500",
                bg: "bg-red-500/5",
                border: "border-red-500/20"
              },
              {
                icon: Brain,
                title: "Paralisia por Análise",
                desc: "ChatGPT, Claude, Gemini... Tantas ferramentas que você trava. Sem um método validado, você perde tempo e dinheiro testando o que não funciona para o seu negócio.",
                color: "text-orange-500",
                bg: "bg-orange-500/5",
                border: "border-orange-500/20"
              },
              {
                icon: Zap,
                title: "Concorrência Desleal",
                desc: "Enquanto você hesita, seus concorrentes já automatizaram processos, reduziram custos e aumentaram a produtividade em 300%. Quem não usa IA está ficando para trás.",
                color: "text-yellow-500",
                bg: "bg-yellow-500/5",
                border: "border-yellow-500/20"
              }
            ].map((item, i) => (
              <div key={i} className={`${item.bg} ${item.border} border p-8 rounded-2xl hover:scale-105 transition-transform duration-300`}>
                <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl text-white font-light mb-8">
              "A IA não vai substituir gerentes, mas <strong className="text-neon-cyan">gerentes que usam IA vão substituir os que não usam.</strong>"
              <br /><span className="text-sm text-gray-500 mt-2 block">- Rob Thomas, IBM</span>
            </p>
            <Button onClick={handleScrollToForm} variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg">
              NÃO QUERO FICAR PARA TRÁS
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: SOLUTION SECTION (Apresentação da Oferta Única) */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-purple/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-neon-cyan/10 blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm font-bold mb-6 border border-neon-cyan/30">
                A SOLUÇÃO DEFINITIVA
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                MBA Executivo em <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">IA para Negócios</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Não é mais um curso teórico. É a primeira formação executiva que nasceu na era da IA, criada especificamente para transformar líderes em estrategistas de Inteligência Artificial.
              </p>
              
              <div className="space-y-8">
                {[
                  { 
                    title: "100% AI-Native", 
                    desc: "Esqueça currículos adaptados. A FABRANI foi fundada NA ERA DA IA. Metodologia desenvolvida com a velocidade do Vale do Silício + rigor acadêmico do MEC." 
                  },
                  { 
                    title: "Residência IA (Hands-on)", 
                    desc: "O Mecanismo Único: Não é aula teórica. É RESIDÊNCIA. Você implementa IA em projetos REAIS do seu negócio desde o primeiro dia com mentoria." 
                  },
                  { 
                    title: "Metodologia PBL (Problem-Based Learning)", 
                    desc: "Aprenda resolvendo problemas reais. Cada módulo é um desafio prático do seu negócio sendo resolvido com IA." 
                  },
                  { 
                    title: "Certificação MEC + Credibilidade", 
                    desc: "Diploma reconhecido nacionalmente. Coordenação de Elias Evangelista. 360 horas de conteúdo estratégico." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 bg-neon-cyan/10 p-3 rounded-xl h-fit group-hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/20">
                      <CheckCircle2 className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-3xl p-4 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src="/images/mba-dashboard-preview.jpg" alt="Plataforma do MBA" className="rounded-2xl w-full h-auto shadow-inner" />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 bg-black border border-neon-purple p-6 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-neon-purple/20 p-4 rounded-full">
                    <Award className="w-10 h-10 text-neon-purple" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Certificação</div>
                    <div className="text-2xl font-bold text-white">MEC Nota 5</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 4: CURRICULUM (O Que Você Vai Dominar - Expandido) */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              6 Módulos Estratégicos + Residência IA
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Do Zero ao Líder de IA em 360 Horas. Uma jornada completa desenhada para aplicação imediata.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                module: "MÓDULO 1",
                title: "Fundamentos de IA para Negócios",
                hours: "60h",
                desc: "Domine a base. Da história da IA até a Engenharia de Prompt avançada.",
                topics: ["Evolução da IA: GPT-4 e além", "Engenharia de Prompt (ChatGPT, Claude, Gemini)", "Machine Learning para Executivos", "IA Generativa e Visão Computacional"]
              },
              {
                module: "MÓDULO 2",
                title: "Data Literacy & Ética em IA",
                hours: "60h",
                desc: "Dados são o novo petróleo. Aprenda a extrair valor e proteger seu negócio.",
                topics: ["Data Science para Tomada de Decisão", "LGPD, GDPR e Ética em IA", "Privacidade e Segurança de Dados", "Dashboards Executivos com IA"]
              },
              {
                module: "MÓDULO 3",
                title: "Plataformas e Ferramentas",
                hours: "60h",
                desc: "Ferramental prático. Cloud, No-Code e automação real.",
                topics: ["Cloud Computing (AWS, Azure, Google)", "No-Code e Low-Code (Zapier, Make, n8n)", "Vibe Coding e Desenvolvimento Assistido", "Integração de APIs"]
              },
              {
                module: "MÓDULO 4",
                title: "IA Aplicada a Negócios",
                hours: "60h",
                desc: "Aplicação vertical. Marketing, Vendas, RH e Finanças.",
                topics: ["IA em Marketing e Vendas (Growth)", "Otimização de Operações e Processos", "IA em Recursos Humanos e Recrutamento", "Finanças e Análise de Risco"]
              },
              {
                module: "MÓDULO 5",
                title: "Estratégia, Governança e MLOps",
                hours: "60h",
                desc: "Visão de C-Level. Como liderar a transformação digital.",
                topics: ["Estratégia de Transformação Digital", "Liderança na Era da IA", "MLOps e Gestão de Modelos", "ROI e Métricas de Sucesso"]
              },
              {
                module: "MÓDULO 6",
                title: "RESIDÊNCIA IA PARA NEGÓCIOS",
                hours: "60h",
                highlight: true,
                desc: "O diferencial que muda o jogo. Implementação real no seu negócio.",
                topics: ["Diagnóstico Real do Seu Negócio", "Planejamento e Escopo", "Implementação Hands-on com Mentoria", "Defesa de Projeto e Resultados"]
              }
            ].map((mod, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all hover:-translate-y-2 duration-300 ${mod.highlight ? 'bg-gradient-to-br from-neon-cyan/10 to-black border-neon-cyan shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ${mod.highlight ? 'bg-neon-cyan text-black' : 'bg-white/10 text-gray-300'}`}>
                    {mod.module}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4" /> {mod.hours}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${mod.highlight ? 'text-neon-cyan' : 'text-white'}`}>
                  {mod.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed border-b border-white/5 pb-4">
                  {mod.desc}
                </p>
                <ul className="space-y-3">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${mod.highlight ? 'text-neon-cyan' : 'text-white/30'}`} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO BÔNUS: O QUE MAIS VOCÊ LEVA */}
      <section className="py-24 bg-zinc-950 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Muito Mais Que Um MBA
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Além da formação completa, você recebe um arsenal de ferramentas para acelerar seus resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Biblioteca Vitalícia",
                desc: "Acesso perpétuo a todas as atualizações. Saiu o GPT-5? O Gemini Ultra? Você recebe a aula atualizada sem pagar nada a mais por isso.",
                icon: Database,
                color: "text-blue-400"
              },
              {
                title: "Comunidade de Líderes",
                desc: "Network de alto nível com executivos e fundadores que estão liderando a revolução da IA no Brasil. Troque experiências e feche negócios.",
                icon: Users,
                color: "text-green-400"
              },
              {
                title: "Templates Prontos",
                desc: "Não comece do zero. Receba prompts validados, planilhas de ROI, checklists de implementação e frameworks de governança prontos para usar.",
                icon: FileText,
                color: "text-yellow-400"
              },
              {
                title: "Mentoria Hands-on",
                desc: "Suporte direto com quem faz. Tire dúvidas técnicas e estratégicas com professores que vivem o mercado de IA no dia a dia.",
                icon: MessageSquare,
                color: "text-purple-400"
              },
              {
                title: "Certificações Modulares",
                desc: "Não espere o fim do curso. Receba badges e certificados a cada módulo concluído para turbinar seu LinkedIn imediatamente.",
                icon: Award,
                color: "text-pink-400"
              },
              {
                title: "Consultoria 1-on-1",
                desc: "Bônus exclusivo para os primeiros inscritos: uma sessão individual de diagnóstico e plano de ação para o seu negócio.",
                icon: Star,
                color: "text-orange-400",
                highlight: true
              }
            ].map((bonus, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${bonus.highlight ? 'bg-gradient-to-br from-orange-500/10 to-black border-orange-500/30' : 'bg-white/5 border-white/10'} hover:border-white/30 transition-all`}>
                <bonus.icon className={`w-10 h-10 ${bonus.color} mb-6`} />
                <h3 className="text-xl font-bold text-white mb-3">{bonus.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: AUTORIDADE (Coordenador e Parceiros) */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto mb-24">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-3xl"></div>
                <img src="/images/elias-evangelista.jpg" alt="Prof. Me. Elias Evangelista" className="relative z-10 rounded-2xl border border-white/20 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-neon-purple font-bold tracking-wider uppercase mb-2">Coordenação Acadêmica</h3>
              <h2 className="text-4xl font-bold text-white mb-6">Prof. Me. Elias Evangelista de Souza</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Fundador da FABRANI e pioneiro em educação AI-Native no Brasil. Com mais de 150 projetos educacionais liderados apenas em 2025, Elias une a profundidade acadêmica (Mestre) com a prática agressiva de mercado.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-neon-purple pl-4">
                  <p className="text-white font-bold">Visão de Futuro</p>
                  <p className="text-sm text-gray-500">Criador da metodologia AI-Native</p>
                </div>
                <div className="border-l-2 border-neon-purple pl-4">
                  <p className="text-white font-bold">Liderança</p>
                  <p className="text-sm text-gray-500">Coordena o time de experts do MBA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parceiros */}
          <div className="text-center border-t border-white/10 pt-16">
            <p className="text-gray-500 uppercase tracking-widest mb-10 text-sm">Parceiros Estratégicos e Impacto</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white">WEBURN</h4>
                <p className="text-xs text-gray-500">2.5 Mi Alunos</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white">TICTO</h4>
                <p className="text-xs text-gray-500">R$ 2 Bi Transacionados</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white">O NOVO MERCADO</h4>
                <p className="text-xs text-gray-500">Ícaro de Carvalho</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: VALUE STACK (Oferta Irresistível - Expandida) */}
      <section className="py-24 bg-gradient-to-b from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-purple via-white to-neon-cyan"></div>
            
            <div className="p-8 md:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">OFERTA EXCLUSIVA DE LANÇAMENTO</h2>
                <p className="text-gray-400 text-lg">Veja tudo que você recebe ao garantir sua vaga hoje</p>
              </div>

              <div className="space-y-6 mb-12">
                {[
                  { item: "MBA Executivo em IA para Negócios (Certificado MEC)", value: "R$ 18.000", icon: GraduationCap },
                  { item: "Residência IA 100% Prática (Mentoria Hands-on)", value: "R$ 12.000", icon: Cpu },
                  { item: "Acesso Vitalício à Biblioteca de Conteúdos", value: "R$ 4.800", icon: Database },
                  { item: "Comunidade Exclusiva de Líderes em IA", value: "R$ 3.600", icon: Users },
                  { item: "Estudos de Caso Reais + Templates Prontos", value: "R$ 2.400", icon: FileText },
                  { item: "Material de Apoio Premium (Dashboards, Prompts)", value: "R$ 1.800", icon: Layers },
                  { item: "Certificações Complementares por Módulo", value: "R$ 1.200", icon: Award },
                  { item: "Suporte Direto com Professores", value: "R$ 2.400", icon: MessageSquare },
                  { item: "Consultoria 1-on-1 (Bônus Limitado - 20 Primeiros)", value: "R$ 3.500", icon: Star, highlight: true },
                ].map((row, i) => (
                  <div key={i} className={`flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-4 last:border-0 ${row.highlight ? 'bg-neon-purple/10 p-4 rounded-xl border border-neon-purple/30' : ''}`}>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className={`p-2 rounded-lg ${row.highlight ? 'bg-neon-purple text-white' : 'bg-white/5 text-neon-cyan'}`}>
                        <row.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-lg ${row.highlight ? 'text-white font-bold' : 'text-gray-200'}`}>{row.item}</span>
                    </div>
                    <span className={`text-lg font-mono mt-2 md:mt-0 ${row.highlight ? 'text-neon-purple font-bold' : 'text-gray-500 line-through'}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900/50 rounded-2xl p-8 text-center mb-10 border border-white/10">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Valor Total Real: <span className="line-through decoration-red-500">R$ 49.700</span></div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                    R$ 7.000
                  </div>
                  <div className="text-left">
                    <div className="text-neon-cyan font-bold text-xl">ou 12x de R$ 583,33</div>
                    <div className="text-gray-400 text-sm">Desconto de 86% aplicado</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleScrollToForm}
                className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-2xl py-10 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse-slow mb-6"
              >
                QUERO APROVEITAR ESSA OFERTA
              </Button>
              
              <div className="flex justify-center gap-8 text-sm text-gray-500">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Garantia de 7 Dias</span>
                <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Pagamento Seguro</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Acesso Imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: FAQ (Perguntas Frequentes) */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "O MBA é reconhecido pelo MEC?", a: "Sim, absolutamente. O MBA em IA para Negócios da FABRANI possui nota máxima no MEC e o diploma tem validade nacional, conferindo o título de Especialista." },
              { q: "Preciso saber programar para fazer este MBA?", a: "Não. O foco do curso é estratégico e de negócios. Ensinamos 'Vibe Coding' e uso de ferramentas No-Code, permitindo que você crie soluções sem precisar ser um desenvolvedor sênior." },
              { q: "Como funciona a Residência em IA?", a: "É o nosso diferencial prático. Você trará um desafio real da sua empresa ou carreira e, durante o curso, desenvolverá uma solução de IA para ele com a mentoria dos nossos especialistas." },
              { q: "As aulas são ao vivo ou gravadas?", a: "O curso é híbrido. Temos aulas gravadas de alta produção para a teoria e encontros ao vivo semanais para mentoria, tira-dúvidas e networking." },
              { q: "Qual a duração do curso?", a: "O MBA tem carga horária de 360 horas. Você pode concluí-lo em 6 meses (modo intensivo) ou até 12 meses, dependendo do seu ritmo." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-lg bg-white/5 px-4">
                <AccordionTrigger className="text-white hover:text-neon-cyan text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-400">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SEÇÃO 8: FORMULÁRIO DE CAPTURA (Brevo Integration) */}
      <section id="capture-form" className="py-24 bg-black relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Garanta Sua Vaga na Próxima Turma
            </h2>
            <p className="text-xl text-gray-400">
              Preencha o formulário para receber o contato de um consultor e garantir as condições especiais de lançamento.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            {submitSuccess ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Inscrição Recebida com Sucesso!</h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Nossa equipe de consultores entrará em contato via WhatsApp em breve para finalizar sua matrícula e liberar seus bônus.
                </p>
                <Button 
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                >
                  Voltar ao site
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Nome Completo</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-700"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Email Corporativo</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-700"
                      placeholder="seu@empresa.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">WhatsApp</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-gray-700"
                      placeholder="(DDD) 99999-9999"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Cargo Atual</label>
                    <select 
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                    >
                      <option value="">Selecione seu cargo...</option>
                      <option value="ceo">CEO / Fundador / Sócio</option>
                      <option value="diretor">Diretor / C-Level</option>
                      <option value="gerente">Gerente / Gestor</option>
                      <option value="analista">Analista / Especialista</option>
                      <option value="consultor">Consultor / Autônomo</option>
                      <option value="estudante">Estudante</option>
                    </select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-neon-purple text-white hover:bg-neon-purple/80 font-bold text-xl py-8 rounded-xl shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processando Inscrição...
                    </span>
                  ) : "ENVIAR INSCRIÇÃO AGORA"}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                  <Lock className="w-3 h-3" />
                  <span>Seus dados estão 100% seguros e protegidos.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Simplificado */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="container mx-auto px-4">
          <img src="/images/logo-fabrani.png" alt="FABRANI" className="h-8 mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          <p className="text-gray-500 text-sm mb-4">
            FABRANI - Faculdade Brasileira de Negócios Inovadores <br />
            Credenciada pelo MEC. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-600">
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
