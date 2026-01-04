import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Globe, Users, Zap, Award, BookOpen, Download, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function GraduacaoMarketing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-20 pointer-events-none"></div>
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
              O fim do tráfego manual. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">O início dos ecossistemas autônomos.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
              A graduação que une formação superior formal + prática com grandes players — agora com <strong className="text-white">IA como sistema operacional.</strong>
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

      {/* A Oportunidade */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">A Oportunidade</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Uma aliança entre o ensino superior formal e os maiores nomes do marketing digital. O único curso do Brasil que integra <strong className="text-white">educação superior + prática de mercado com IA</strong>, 100% EAD.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-neon-purple" />
                  <span className="text-gray-300">Trabalhe do Brasil para o mundo. IA reduz barreiras e multiplica sua produtividade.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-neon-cyan" />
                  <span className="text-gray-300">Empregabilidade acelerada em múltiplas funções digitais.</span>
                </li>
              </ul>
            </div>
            <div className="bg-black/50 p-8 border border-white/10 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-white">Áreas de Atuação AI-Driven</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Estrategista de Growth AI-Driven",
                  "Copywriter com IA",
                  "Gestor de Tráfego com Agentes",
                  "Social Media Multimodal",
                  "Designer Assistido por IA",
                  "Editor de Vídeos com IA",
                  "E-commerce e Funis Autônomos",
                  "Gestão de Projetos com IA"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Por que estudar Marketing Digital na FABRANI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-white/10 hover:border-neon-purple/50 transition-all group">
              <CardHeader>
                <Award className="w-12 h-12 text-neon-purple mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">Certificações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Conquiste certificações com grandes players do mercado enquanto cursa a graduação. Seu currículo cresce a cada semestre.
              </CardContent>
            </Card>
            <Card className="bg-black border-white/10 hover:border-neon-cyan/50 transition-all group">
              <CardHeader>
                <Users className="w-12 h-12 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">FABRANI CONECTA</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Acesso direto a oportunidades com players, empresas, masterminds, infoprodutores e e-commerces parceiros.
              </CardContent>
            </Card>
            <Card className="bg-black border-white/10 hover:border-white/50 transition-all group">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl font-bold text-white">NPMD - Núcleo Prático</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Acesso a plataformas de membros, funis reais, sistemas de pagamento e afiliados. Aprendizado na prática, não na teoria.
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
                  <li>Normas, Leis e Regulamentação no Marketing I</li>
                  <li>Técnicas e Ferramentas de Promoção em Vendas Digitais</li>
                  <li>Ambientes de Marketing Digital</li>
                  <li>Gestão de Projetos em Marketing Digital</li>
                  <li>Desenvolvimento Pessoal e Profissional I</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-2" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">2º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Desenvolvimento Pessoal e Profissional II</li>
                  <li>Fundamentos de Marketing II</li>
                  <li>Normas, Leis e Regulamentação no Marketing II</li>
                  <li>Ferramentas de Controle de Marketing Digital I</li>
                  <li>Empreendedorismo, Criatividade e Inovação em Negócios</li>
                  <li>Plano de Negócio em Marketing I</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-3" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">3º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Competências Gerenciais I</li>
                  <li>Competências Gerenciais II</li>
                  <li>Plano de Negócio em Marketing II</li>
                  <li>Negócios Digitais</li>
                  <li>Ferramentas de Controle de Marketing Digital II</li>
                  <li>Ciências Sociais e Ambientais, Cidadania, Cultura Afro-Brasileira e Indígena</li>
                  <li className="text-neon-cyan font-bold">Produção de Conteúdo com Inteligência Artificial</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sem-4" className="border border-white/10 bg-black rounded-lg px-4">
              <AccordionTrigger className="text-lg font-bold hover:text-neon-cyan py-6">4º SEMESTRE</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li>Pesquisa em Marketing</li>
                  <li>Construção de Marcas, Construindo o Avatar e a Comunicação</li>
                  <li>Ferramentas da Comunicação Digital</li>
                  <li>Experiência do Cliente</li>
                  <li>Comportamento do Consumidor</li>
                  <li>Copywriting</li>
                  <li>LIBRAS</li>
                  <li>Atividades Complementares</li>
                  <li>Extensão</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Professores */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Aprenda com quem faz</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Você terá aulas práticas com grandes nomes do mercado digital e acadêmico.
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-80">
            {["Marcus Lúcius", "Sofia Gracioli", "Ângelo Sastre", "Danielle Riegermann", "Gustavo Barbieri", "Josney"].map((name, i) => (
              <div key={i} className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-white font-medium hover:border-neon-cyan hover:text-neon-cyan transition-colors cursor-default">
                {name}
              </div>
            ))}
          </div>
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
