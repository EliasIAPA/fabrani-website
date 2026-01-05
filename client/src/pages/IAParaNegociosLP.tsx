import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Users, BarChart, Brain, Rocket, Lock, Clock, Award, ChevronDown, PlayCircle, Zap, Target, Database, Cpu, Globe, Layers, MessageSquare, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function IAParaNegociosLP() {
  const [formStep, setFormStep] = useState(0); // 0: closed, 1: open
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
    
    // Simulação de envio para Brevo (aqui entraria a chamada real à API)
    console.log("Enviando dados para Brevo:", formData);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form após sucesso
    setFormData({ name: "", email: "", phone: "", role: "" });
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('capture-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      
      {/* Navbar Simplificada para LP */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo-fabrani.png" alt="FABRANI" className="h-8 md:h-10 w-auto object-contain cursor-pointer" />
          </Link>
          <Button 
            onClick={handleScrollToForm}
            className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-sm md:text-base px-6 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            GARANTIR MINHA VAGA
          </Button>
        </div>
      </header>

      {/* SEÇÃO 1: HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl">
          
          {/* Pre-Headline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs md:text-sm font-mono mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
            FABRANI - A PRIMEIRA FACULDADE 100% AI-NATIVE DO BRASIL
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            O MUNDO FOI REESCRITO. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              VOCÊ JÁ DOMINA O NOVO CÓDIGO?
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Transforme-se em <strong className="text-white">Líder de IA em 6 Meses</strong> com o Único MBA que Une a Ciência do MEC à Velocidade do Vale do Silício — <span className="text-neon-cyan">100% Prático, 100% Aplicável</span>.
          </p>

          {/* Badges de Autoridade */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 px-4 py-2 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400" /> Nota Máxima MEC
            </Badge>
            <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 px-4 py-2 text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Residência em IA
            </Badge>
            <Badge variant="outline" className="border-neon-purple/50 text-neon-purple bg-neon-purple/10 px-4 py-2 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4" /> Vagas Limitadas: 50/Turma
            </Badge>
          </div>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Button 
              onClick={handleScrollToForm}
              size="lg" 
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-8 rounded-xl w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all transform hover:-translate-y-1"
            >
              QUERO DOMINAR IA E GARANTIR MINHA VAGA <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>

          {/* Prova Social Rápida */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">+150</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Projetos Educacionais</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">2.5 Mi</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Alunos Impactados</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">360h</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Carga Horária MEC</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">AI-Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: PROBLEM SECTION (Agitação da Dor) */}
      <section className="py-20 bg-zinc-950 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              A Verdade Que Ninguém Te Conta: <br />
              <span className="text-red-500">Quem Não Dominar IA Nos Próximos 2 Anos Será Irrelevante</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              O mercado não perdoa obsolescência. Você se identifica com alguma dessas situações?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: "Medo da Substituição",
                desc: "A ansiedade de saber que sua posição está em risco. O World Economic Forum prevê que 85 milhões de empregos serão substituídos até 2025.",
                color: "text-red-500"
              },
              {
                icon: Brain,
                title: "Paralisia por Análise",
                desc: "ChatGPT, Claude, Gemini... Tantas ferramentas que você não sabe qual usar. Sem método, você perde tempo e dinheiro testando o que não funciona.",
                color: "text-orange-500"
              },
              {
                icon: Clock,
                title: "Sem Tempo para Teoria",
                desc: "Sua agenda é lotada. Você não pode passar 2 anos em um MBA teórico. O mercado exige velocidade e aplicação imediata.",
                color: "text-yellow-500"
              },
              {
                icon: Zap,
                title: "Concorrência Desleal",
                desc: "Enquanto você hesita, concorrentes automatizam processos e aumentam a produtividade em 300%. Quem não usa IA está ficando para trás.",
                color: "text-red-400"
              },
              {
                icon: PlayCircle,
                title: "Frustração com YouTube",
                desc: "Vídeos genéricos não ensinam estratégia. 87% das pessoas desistem de aprender sozinhas por falta de um caminho estruturado.",
                color: "text-orange-400"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all">
                <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
            
            {/* Card de Fechamento */}
            <div className="bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-bold text-white mb-4">A Escolha é Sua</h3>
              <p className="text-gray-300 mb-6">
                A pergunta não é SE a IA vai transformar seu mercado. A pergunta é: <strong className="text-white">você vai liderar essa transformação ou ser deixado para trás?</strong>
              </p>
              <Button onClick={handleScrollToForm} variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black w-full">
                QUERO LIDERAR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: SOLUTION SECTION (Apresentação da Oferta) */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-purple/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-neon-cyan/5 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6 border border-white/20">
                A SOLUÇÃO DEFINITIVA
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                MBA Executivo em <br />
                <span className="text-neon-cyan">IA para Negócios</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Não é mais um curso teórico. É a primeira formação executiva que nasceu na era da IA, criada especificamente para transformar líderes em estrategistas de Inteligência Artificial.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "100% AI-Native", desc: "Metodologia desenvolvida com a velocidade do Vale do Silício + rigor acadêmico do MEC." },
                  { title: "Residência IA (Hands-on)", desc: "Você implementa IA em projetos REAIS do seu negócio desde o primeiro dia." },
                  { title: "Metodologia PBL", desc: "Problem-Based Learning: aprenda resolvendo desafios reais do mercado." },
                  { title: "Certificação MEC", desc: "Diploma reconhecido nacionalmente com 360 horas de conteúdo estratégico." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-neon-cyan/20 p-2 rounded-lg h-fit">
                      <CheckCircle2 className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-white/5 border-l-4 border-neon-cyan rounded-r-xl">
                <p className="text-lg text-white italic">
                  "Por que pagar R$ 30.000+ em MBAs tradicionais que ensinam teoria ultrapassada quando você pode dominar IA na prática, com certificação MEC, por R$ 7.000?"
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src="/images/mba-dashboard-preview.jpg" alt="Plataforma do MBA" className="rounded-xl w-full h-auto" />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-black border border-neon-purple p-4 rounded-xl shadow-xl flex items-center gap-4">
                  <div className="bg-neon-purple/20 p-3 rounded-full">
                    <Award className="w-8 h-8 text-neon-purple" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Certificação</div>
                    <div className="text-lg font-bold text-white">MEC Nota 5</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl"></div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 4: CURRICULUM (O Que Você Vai Dominar) */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              6 Módulos Estratégicos + Residência IA
            </h2>
            <p className="text-xl text-gray-400">
              Do Zero ao Líder de IA em 360 Horas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                module: "MÓDULO 1",
                title: "Fundamentos de IA para Negócios",
                hours: "60h",
                topics: ["Engenharia de Prompt (ChatGPT, Claude)", "Machine Learning para Executivos", "IA Generativa e Visão Computacional"]
              },
              {
                module: "MÓDULO 2",
                title: "Data Literacy & Ética em IA",
                hours: "60h",
                topics: ["Data Science para Tomada de Decisão", "LGPD e Ética em IA", "Privacidade e Segurança de Dados"]
              },
              {
                module: "MÓDULO 3",
                title: "Plataformas e Ferramentas",
                hours: "60h",
                topics: ["Cloud Computing para IA", "No-Code e Low-Code (Zapier, Make)", "Vibe Coding e Dev Assistido"]
              },
              {
                module: "MÓDULO 4",
                title: "IA Aplicada a Negócios",
                hours: "60h",
                topics: ["IA em Marketing e Vendas", "Otimização de Operações", "IA em RH e Finanças"]
              },
              {
                module: "MÓDULO 5",
                title: "Estratégia, Governança e MLOps",
                hours: "60h",
                topics: ["Transformação Digital com IA", "Liderança na Era da IA", "ROI e Métricas de Sucesso"]
              },
              {
                module: "MÓDULO 6",
                title: "RESIDÊNCIA IA PARA NEGÓCIOS",
                hours: "60h",
                highlight: true,
                topics: ["Diagnóstico Real do Seu Negócio", "Implementação Hands-on", "Mentoria com Especialistas"]
              }
            ].map((mod, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${mod.highlight ? 'bg-neon-cyan/5 border-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold tracking-wider px-3 py-1 rounded-full ${mod.highlight ? 'bg-neon-cyan text-black' : 'bg-white/10 text-gray-300'}`}>
                    {mod.module}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {mod.hours}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-4 ${mod.highlight ? 'text-neon-cyan' : 'text-white'}`}>
                  {mod.title}
                </h3>
                <ul className="space-y-2">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 ${mod.highlight ? 'text-neon-cyan' : 'text-white/30'}`} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: VALUE STACK (Oferta Irresistível) */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-neon-purple to-neon-cyan p-1"></div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                OFERTA EXCLUSIVA DE LANÇAMENTO
              </h2>
              <p className="text-center text-gray-400 mb-10">
                Veja tudo que você recebe ao garantir sua vaga hoje
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { item: "MBA Executivo em IA (Certificado MEC)", value: "R$ 18.000" },
                  { item: "Residência IA 100% Prática", value: "R$ 12.000" },
                  { item: "Acesso Vitalício à Biblioteca", value: "R$ 4.800" },
                  { item: "Comunidade Exclusiva de Líderes", value: "R$ 3.600" },
                  { item: "Estudos de Caso + Templates", value: "R$ 2.400" },
                  { item: "Consultoria 1-on-1 (Bônus Limitado)", value: "R$ 3.500" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                      <span className="text-gray-200">{row.item}</span>
                    </div>
                    <span className="text-gray-500 line-through text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black/50 rounded-xl p-6 text-center mb-8 border border-white/10">
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Valor Total Real: <span className="line-through">R$ 49.700</span></div>
                <div className="text-4xl md:text-6xl font-black text-white mb-2">
                  R$ 7.000
                </div>
                <div className="text-neon-cyan font-bold">
                  ou 12x de R$ 583,33
                </div>
              </div>

              <Button 
                onClick={handleScrollToForm}
                className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-xl py-8 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-pulse-slow"
              >
                QUERO APROVEITAR ESSA OFERTA
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                *Garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: FORMULÁRIO DE CAPTURA (Brevo Integration) */}
      <section id="capture-form" className="py-24 bg-zinc-950 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Garanta Sua Vaga na Próxima Turma
            </h2>
            <p className="text-xl text-gray-400">
              Preencha o formulário abaixo para receber o contato de um consultor e garantir as condições especiais.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            {submitSuccess ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Inscrição Recebida!</h3>
                <p className="text-gray-400 mb-8">
                  Nossa equipe entrará em contato em breve pelo WhatsApp para confirmar sua vaga e apresentar as condições especiais.
                </p>
                <Button 
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Voltar ao site
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nome Completo</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Corporativo</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">WhatsApp</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cargo Atual</label>
                    <select 
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                    >
                      <option value="">Selecione...</option>
                      <option value="ceo">CEO / Fundador</option>
                      <option value="diretor">Diretor / C-Level</option>
                      <option value="gerente">Gerente / Gestor</option>
                      <option value="analista">Analista / Especialista</option>
                      <option value="estudante">Estudante</option>
                    </select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-neon-purple text-white hover:bg-neon-purple/80 font-bold text-lg py-6 rounded-lg shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Enviando...
                    </span>
                  ) : "ENVIAR INSCRIÇÃO"}
                </Button>
                
                <p className="text-center text-xs text-gray-500">
                  Seus dados estão seguros. Ao enviar, você concorda com nossa Política de Privacidade.
                </p>
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
