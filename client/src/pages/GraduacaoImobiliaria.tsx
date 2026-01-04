import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Globe, Users, Zap, Award, BookOpen, Download, Calendar, ArrowLeft, Building2, BarChart3, Gavel, Key } from "lucide-react";
import { Link } from "wouter";

export default function GraduacaoImobiliaria() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-neon-cyan pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Home
            </Button>
          </Link>

          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Badge variant="outline" className="border-neon-cyan text-neon-cyan mb-6 px-4 py-1">GRADUAÇÃO 2 ANOS • 100% ONLINE</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Dados, IA e ativos reais: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">domine o mercado imobiliário que mais cresce.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
              Torne-se consultor, gestor ou empresário imobiliário com <strong className="text-white">IA aplicada a avaliação, aquisição, contratos, locação e gestão de portfólios.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-8 rounded-none shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  INICIAR INSCRIÇÃO — VESTIBULAR 2026 <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
              <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold text-lg px-10 py-8 rounded-none">
                  <Download className="mr-2 w-6 h-6" /> BAIXAR EMENTA
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Um Mercado Sem Fim */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Um Mercado Sem Fim (com IA)</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Atue em nichos altamente lucrativos como leilões, gestão de portfólios, loteamentos e condomínios usando <strong className="text-white">análise preditiva, precificação dinâmica e due diligence automatizada.</strong>
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-neon-purple" />
                  <span className="text-gray-300">100% online com encontros ao vivo e a melhor plataforma de alunos com IA.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-neon-cyan" />
                  <span className="text-gray-300">Operação inovadora e "brutalmente lucrativa" com tecnologia e métodos.</span>
                </li>
              </ul>
            </div>
            <div className="bg-black/50 p-8 border border-white/10 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-white">Áreas de Atuação PropTech</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Leilões de Imóveis (Risco e Retorno)",
                  "Gestão de Portfólios com Analytics",
                  "Gestor de IA Imobiliária",
                  "Loteamentos e Condomínios",
                  "Gestão de Contratos Digitais",
                  "Gestão Condominial Online",
                  "Due Diligence Automatizada",
                  "Precificação Dinâmica"
                ].map((area, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que FABRANI? */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Por que estudar Negócios Imobiliários na FABRANI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-white/10 hover:border-neon-purple/50 transition-all group">
              <CardHeader>
                <Building2 className="w-12 h-12 text-neon-purple mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">Conexão com PropTechs</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                União entre conhecimento superior e prática com empresas tecnológicas do setor. Oportunidades via FABRANI CONECTA.
              </CardContent>
            </Card>
            <Card className="bg-black border-white/10 hover:border-neon-cyan/50 transition-all group">
              <CardHeader>
                <Award className="w-12 h-12 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">Certificações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Certificações focadas: IA aplicada, marketing imobiliário, modelos de vendas digitais, lançamentos e startups.
              </CardContent>
            </Card>
            <Card className="bg-black border-white/10 hover:border-white/50 transition-all group">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">Gestão Baseada em Dados</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Aprenda a gerir e investir em propriedades e portfólios utilizando dados reais e ferramentas modernas de analytics.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grade Curricular */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Grade Curricular</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="sem-1" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">1º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Fundamentos de Marketing I</li>
                  <li>Competências Gerenciais I</li>
                  <li>Fundamentos de Direito Empresarial I</li>
                  <li>Técnicas e Ferramentas de Promoção em Vendas</li>
                  <li>Desenvolvimento Pessoal e Profissional I</li>
                  <li>Fundamentos da Economia</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-2" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">2º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Fundamentos de Marketing II</li>
                  <li>Competências Gerenciais II</li>
                  <li>Fundamentos de Direito Empresarial II</li>
                  <li>Princípios Gerais da Corretagem</li>
                  <li>Desenvolvimento Pessoal e Profissional II</li>
                  <li>Matemática para Negócios</li>
                  <li>Operações Imobiliárias Integradas</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-3" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">3º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Administração de Condomínios</li>
                  <li>Empreendedorismo, Criatividade e Inovação em Negócios</li>
                  <li>Ferramentas de Controle de Marketing Digital I</li>
                  <li>Legislação e Planejamento Urbano e Meio Ambiente</li>
                  <li>Ambientes de Marketing Digital</li>
                  <li>Gestão de Projetos em Marketing Digital</li>
                  <li>Ciências Sociais e Ambientais, Cidadania, Cultura Afro-Brasileira e Indígena</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-4" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">4º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Administração e Avaliação de Imóveis e Empreendimentos Imobiliários</li>
                  <li className="text-neon-cyan font-bold">Produção de Conteúdo com I.A</li>
                  <li>Ética Profissional do Corretor</li>
                  <li>Experiência do Cliente</li>
                  <li>Sistema Registral e Notarial</li>
                  <li>Ferramentas de Controle de Marketing Digital II</li>
                  <li>LIBRAS</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Processo de Inscrição */}
      <section className="py-20 bg-gradient-to-b from-black to-neon-purple/10 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Vestibular Aberto 2026</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { step: "01", title: "Inscrição", desc: "Preencha seus dados" },
              { step: "02", title: "Pagamento", desc: "Taxa de inscrição" },
              { step: "03", title: "Documentos", desc: "Envio digital" },
              { step: "04", title: "Matrícula", desc: "1ª parcela e acesso" }
            ].map((item, i) => (
              <div key={i} className="relative p-6 border border-white/10 bg-black rounded-lg">
                <div className="text-4xl font-bold text-white/10 absolute top-2 right-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
                <p className="text-sm text-gray-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-12 py-8 rounded-none shadow-lg transform hover:scale-105 transition-all">
                INICIAR INSCRIÇÃO AGORA
              </Button>
            </a>
            <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-8 rounded-none">
                FALAR COM CONSULTOR
              </Button>
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Início: Imediato</div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Campus: 100% Online</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Ingresso: ENEM ou Vestibular</div>
          </div>
        </div>
      </section>
    </div>
  );
}
