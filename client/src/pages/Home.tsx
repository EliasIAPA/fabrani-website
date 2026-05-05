import { useAuth } from "@/_core/hooks/useAuth";
// Imagens geradas com IA - Paleta PRETO E VERMELHO Premium
const logotipo2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/logotipo2-transparent_b33c9021.png';
const heroNeuralNetwork = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/hero-home-fabrani-VYdiygbaJMXdiZSVkJd2Rq.webp';
const cardManifesto = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-manifesto-red-VCzoQfg49hgeHYPyqD9rkf.webp';
const cardSimulator = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-ai-brain-red-cqABfSGCTfie7ioNdBfrmW.webp';
const cardElite = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-mba-network-red-dTejyexvsHqmh6JVXWR2kn.webp';
const cardPartners = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-hub-data-red-i4t9ppDzUkwSQHt7EMhj9r.webp';
const aiStarterPack = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-starter-pack-red-i4AcVovJiyibvaC9PRrGfb.webp';
const globalConnection = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-mba-network-red-dTejyexvsHqmh6JVXWR2kn.webp';
const genesisDig = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-manifesto-red-VCzoQfg49hgeHYPyqD9rkf.webp';
// Novas imagens de fundo sutis para cada seção
const bgHeroNeural = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-hero-neural-subtle-FYzBhJLmTbhMqFkWkVJMfB.webp';
const bgCartaAberta = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-carta-aberta-subtle-2RHj8VRXoWDXqvXfYfqkbv.webp';
const bgSimulador = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-simulador-brain-subtle-2Jy2nqTkWTnxFNbvDVLbZJ.webp';
const bgElite = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-elite-hex-subtle-cVb3sDPrTYYqZLuJKRLXfN.webp';
const bgLeadMagnet = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-leadmagnet-gold-subtle-FxCWpZJKQxPxFjFjr3yTVk.webp';
const bgParceiros = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-parceiros-network-subtle-hCQT7y5WY22PHcBCHkKdWX.webp';
const bgGenese = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-genese-digital-subtle-XcqqyPpxfpmmeaM2NDemDf.webp';
const bgItec = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/bg-itec-protocols-subtle-FoyiPjtfHtiXahPEz3HZau.webp';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, GraduationCap, ShieldCheck, Users, Activity, Lock, Cpu, BarChart, CheckCircle2, Globe, ChevronDown, FileText, Star, Award } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import BrevoFormEmbed from "@/components/BrevoFormEmbed";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <SEO 
        title="Faculdade Brasileira de Negócios Inovadores | 100% IA"
        description="A FABRANI é a primeira faculdade 100% focada em Inteligência Artificial do Brasil. Graduações, MBAs e cursos gratuitos para formar líderes do futuro digital."
        keywords="Faculdade IA, Inteligência Artificial, Graduação Marketing Digital, MBA Executivo, Cursos Gratuitos IA, FABRANI, Negócios Inovadores"
      />
      {/* Seção 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24 pt-44 overflow-x-hidden">
        {/* Background - Camadas sutis de fundo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: `url(${bgHeroNeural})`}}></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" style={{backgroundImage: `url(${heroNeuralNetwork})`}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10"></div>
        </div>

        {/* Destaque MEC - Canto Superior Direito */}
        <div className="absolute top-24 right-4 md:right-10 z-30 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 hidden md:block">
          <div className="mec-badge-container rounded-2xl p-4 md:p-6 backdrop-blur-md bg-black/80 border border-yellow-500/30 shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:scale-105 transition-transform duration-300 group cursor-default max-w-[280px]">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-yellow-500/50 flex items-center justify-center bg-black relative z-10">
                  <span className="text-3xl font-bold text-yellow-400 gold-glow">5</span>
                </div>
                <div className="absolute inset-0 border border-yellow-500/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
                <div className="absolute -inset-1 border border-dashed border-yellow-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-star-pulse" style={{ animationDelay: `${star * 0.1}s` }} />
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  NOTA MÁXIMA <br />
                  <span className="text-yellow-400 gold-glow">MEC</span>
                </h3>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[10px] text-gray-500 font-mono leading-tight uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                Curso Superior de Tecnologia em <br />
                <span className="font-bold text-gray-400">NEGÓCIOS IMOBILIÁRIOS (NI)</span>
              </p>
            </div>
          </div>
        </div>



        <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl">
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="relative inline-block group">
              <span className="absolute -inset-12 bg-red-600/8 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
              {/* Logotipo FABRANI em texto estilizado - replica o design original */}
              <h2 className="relative z-10 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] text-white select-none leading-none whitespace-nowrap" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 200 }}>
                <span>F</span>
                <span className="relative inline-block">
                  <span className="text-white">A</span>
                  {/* Detalhe vermelho no A - linha diagonal */}
                  <span className="absolute top-[18%] left-[42%] w-[3px] h-[38%] bg-red-500 rotate-[20deg] origin-bottom" aria-hidden="true"></span>
                </span>
                <span>B</span>
                <span>R</span>
                <span className="relative inline-block">
                  <span className="text-white">A</span>
                  {/* Detalhe vermelho no segundo A */}
                  <span className="absolute top-[18%] left-[42%] w-[3px] h-[38%] bg-red-500 rotate-[20deg] origin-bottom" aria-hidden="true"></span>
                </span>
                <span>N</span>
                <span className="relative inline-block" style={{ fontSize: '0.85em' }}>
                  <span className="text-white">i</span>
                  {/* Ponto do i em vermelho - substitui o ponto original */}
                  <span className="absolute -top-[2px] md:-top-[4px] left-[50%] -translate-x-1/2 w-[5px] h-[5px] md:w-[7px] md:h-[7px] bg-red-500 rounded-sm rotate-45" aria-hidden="true"></span>
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-lg text-red-500 font-mono tracking-[0.2em] uppercase mt-6 border-t border-red-500/30 pt-4 inline-block">
              Faculdade Brasileira de Negócios Inovadores
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-500 text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            PROTOCOLO DE EVOLUÇÃO: ATIVO
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            O MUNDO FOI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">REESCRITO PELA IA.</span>
          </h1>

          {/* Versão Mobile do Destaque MEC (Reposicionado para após o título) */}
          <div className="md:hidden mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="mec-badge-container rounded-xl p-3 flex items-center justify-between bg-black/80 border border-yellow-500/30 mx-auto max-w-[280px] shadow-[0_0_20px_rgba(255,215,0,0.1)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-yellow-500/50 flex items-center justify-center bg-black relative">
                  <span className="text-xl font-bold text-yellow-400">5</span>
                  <div className="absolute inset-0 border border-yellow-500/20 rounded-full animate-[spin_6s_linear_infinite]"></div>
                </div>
                <div className="text-left">
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">NOTA MÁXIMA <span className="text-yellow-400">MEC</span></div>
                </div>
              </div>
              <div className="text-[8px] text-right text-gray-500 font-mono leading-tight max-w-[80px] border-l border-white/10 pl-2">
                CST em <br />
                <span className="font-bold text-gray-400">NEGÓCIOS IMOBILIÁRIOS</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-8 text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            VOCÊ JÁ DOMINA O <span className="text-red-600 underline decoration-red-600/50 underline-offset-4">NOVO CÓDIGO?</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 border-l-2 border-red-500/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            A primeira faculdade <strong className="text-white">100% AI-Native</strong> do Brasil. Transformamos profissionais em <strong className="text-white">Líderes de IA</strong> com MBAs e Graduações focadas em <strong>IA para Negócios</strong> e <strong>Vendas</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          </div>
        </div>

        {/* Indicador de Rolagem */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
             onClick={() => {
               const element = document.getElementById('carta-aberta');
               element?.scrollIntoView({ behavior: 'smooth' });
             }}>
          <ChevronDown className="w-10 h-10 text-red-500 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* Seção Download Guia de Prompts */}
      <section id="download-guia" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-8" style={{backgroundImage: `url(${bgLeadMagnet})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-red-600/5 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="outline" className="border-red-500 text-red-500 rounded-none px-4 py-1 mb-6">MATERIAL EXCLUSIVO</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              BAIXE O GUIA:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">50 Prompts de Ouro para Executivos</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Economize 20h da sua semana. Uma curadoria exclusiva dos comandos mais poderosos para liderança, estratégia e produtividade.
            </p>
            
            {/* Formulário Brevo Embed */}
            <BrevoFormEmbed />
          </div>
        </div>
      </section>

      {/* Seção 1.5: Carta Aberta FABRANI 2026 */}
      <section id="carta-aberta" className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{backgroundImage: `url(${bgCartaAberta})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-display">
                CARTA ABERTA <span className="text-red-500">FABRANI 2026</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto"></div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6 font-light">
              <p className="text-xl md:text-2xl text-white font-medium">
                Se você está lendo isto, não é por acaso.
              </p>
              
              <p>
                Você foi escolhido para fazer parte de algo maior: a construção de um legado. Quando a FABRANI nasceu, não foi apenas para criar mais uma empresa de educação. Ela nasceu de uma convicção profunda, forjada em anos de experiência nos corredores de treinamento e eventos que moldaram o nosso mundo digital no Brasil.
              </p>

              <p>
                Em 2025, nos tornamos a <strong className="text-white">FACULDADE nº1 focada na transformação da Educação com IA</strong> - provando que nossa visão estava certa desde o início. Nosso propósito é audacioso e claro: transformar pessoas comuns em especialistas extraordinários e adaptáveis com IA, conectando o conhecimento acadêmico com as demandas reais do mercado inovador.
              </p>

              <div className="border-l-4 border-red-500 pl-6 py-2 my-8 bg-white/5 italic text-gray-300">
                "Esta carta não é um conjunto de regras. É o nosso DNA. É a transcrição da alma da FABRANI em palavras. Cada valor, cada princípio, foi cuidadosamente pensado para guiar nossas ações, nossas decisões e, mais importante, nossas interações."
              </div>

              <p>
                Com as parcerias nacionais e internacionais construímos uma rede única de transformação educacional.
              </p>

              <p>
                Nós não buscamos apenas os melhores talentos – alunos, colaboradores e parceiros. Buscamos os corações e mentes que ressoam com a nossa verdade. Pessoas que entendem que iniciativa não é sobre ter a resposta, mas sobre fazer a pergunta. Que a transparência não é apenas sobre falar a verdade, mas sobre criar um ambiente onde a verdade possa ser dita. Que a empatia não é sentir pelo outro, mas entender com o outro. E que a colaboração não é trabalhar junto, mas vencer junto.
              </p>

              <p className="text-lg text-white font-medium mt-8">
                Bem-vindo à FABRANI. A jornada será desafiadora, mas a recompensa é o impacto que deixaremos no Brasil e no mundo - e será imensurável. Vamos construir o futuro, juntos!
              </p>
            </div>

            <div className="mt-16 flex flex-col items-end">
              <div className="text-right">
                <div className="font-signature text-4xl text-red-500 mb-2 font-handwriting" style={{ fontFamily: 'cursive' }}>Elias Evangelista</div>
                <p className="text-white font-bold uppercase tracking-wider text-sm">Diretor e Founder</p>
                <p className="text-muted-foreground text-xs">FABRANI Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Novos Parceiros FABRANI */}
      <section id="parceiros" className="py-24 relative bg-black border-y border-white/5 scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: `url(${bgParceiros})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header da seção */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-red-500 text-red-500 rounded-none px-4 py-1 mb-6">ECOSSISTEMA FABRANI</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Novos <span className="text-red-500">Parceiros</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A FABRANI cresce com quem transforma. Conheça as instituições que compartilham nossa visão de educação orientada por impacto real.
            </p>
          </div>

          {/* Grid de parceiros */}
          <div className="flex justify-center">
            {/* Card Instituto Gialluise */}
            <a
              href="https://www.instagram.com/leticiagialluise/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-6 p-8 md:p-10 bg-white/5 border border-white/10 hover:border-red-500/40 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(220,38,38,0.1)] max-w-sm w-full cursor-pointer"
            >
              {/* Badge NOVO */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-red-500/30">
                NOVO
              </div>

              {/* Logo */}
              <div className="relative w-48 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-xl opacity-95"></div>
                <img
                  src="/manus-storage/instituto-gialluise-logo_2a27ca38.jpeg"
                  alt="Instituto Gialluise — Saúde, Educação e Desenvolvimento"
                  className="relative z-10 w-44 h-28 object-contain p-2"
                />
              </div>

              {/* Info */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  Instituto Gialluise
                </h3>
                <p className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
                  Saúde · Educação · Desenvolvimento
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mt-3">
                  Parceiro estratégico da FABRANI no desenvolvimento de profissionais da saúde com metodologias inovadoras e formação orientada por resultados.
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-red-500 text-sm font-semibold group-hover:gap-3 transition-all">
                <span>Ver no Instagram</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Rodapé da seção */}
          <div className="text-center mt-14">
            <p className="text-sm text-muted-foreground font-mono tracking-wider">
              QUER SER UM PARCEIRO FABRANI?
            </p>
            <a
              href="https://wa.me/5516997117597"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-white/70 hover:text-white text-sm border-b border-white/20 hover:border-white/60 transition-all pb-0.5"
            >
              Entre em contato com nossa equipe comercial <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Seção 3: Autoridade (Elite Intelectual) */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: `url(${bgElite})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-red-500/5 blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
              A Elite Intelectual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">ao seu lado</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Conexão direta com <span className="text-white font-bold">400 mestres e doutores</span>. Não ensinamos teoria, entregamos implementação real.
            </p>
            <Link href="/manifesto" className="inline-block">
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-black font-bold px-8 py-6 rounded-none transition-all">
                  <FileText className="mr-2 h-5 w-5" /> LER O MANIFESTO
                </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-10 h-10 text-red-500" />,
                title: "Rigor Acadêmico",
                desc: "Metodologia validada e corpo docente com a mais alta titulação acadêmica do país."
              },
              {
                icon: <Cpu className="w-10 h-10 text-red-600" />,
                title: "DNA de Inovação",
                desc: "Professores que lideram projetos de IA em grandes corporações e startups globais."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-white" />,
                title: "Chancela MEC",
                desc: "Segurança de um diploma reconhecido com a agilidade de um bootcamp de tecnologia."
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 bg-black/50 w-20 h-20 flex items-center justify-center rounded-full border border-white/10 group-hover:border-red-500/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Seção 4: Lead Magnet */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-8" style={{backgroundImage: `url(${bgLeadMagnet})`}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-red-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 z-0"></div>
            <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay z-0" style={{backgroundImage: `url(${aiStarterPack})`}}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-black text-xs font-bold uppercase tracking-wider">
                  Download Gratuito
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
                  BAIXE O GUIA: <br />
                  <span className="text-red-500">50 Prompts de Ouro</span> para Executivos
                </h2>
                <p className="text-lg text-gray-300">
                  Economize 20h da sua semana. Uma curadoria exclusiva dos comandos mais poderosos para liderança, estratégia e produtividade.
                </p>
              </div>
              

            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Prova Social e Parceiros */}
      <section className="py-20 border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: `url(${bgParceiros})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-12">
            Reconhecimento e Parcerias Estratégicas
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos de Exemplo - Usando texto por enquanto pois não temos assets SVG */}
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <ShieldCheck className="w-8 h-8" /> MEC <span className="text-xs font-normal border border-white/30 px-2 py-0.5 rounded ml-2">NOTA MÁXIMA</span>
            </div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Cpu className="w-6 h-6" /> TECH_GIANTS</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Globe className="w-6 h-6" /> GLOBAL_CORPS</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><Lock className="w-6 h-6" /> CYBER_SEC</div>
            <div className="text-xl font-bold text-white/80 flex items-center gap-2"><BarChart className="w-6 h-6" /> DATA_INC</div>
          </div>
        </div>
      </section>

      {/* Seção 6: Institucional (Sobre a FABRANI) */}
      <section className="py-32 relative overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{backgroundImage: `url(${bgGenese})`}}></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen" style={{backgroundImage: `url(${globalConnection})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="border-red-500 text-red-500 rounded-none px-4 py-1 mb-6">SOBRE A FABRANI</Badge>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              <span className="glitch-hover" data-text="A GÊNESE">A GÊNESE</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 glitch-hover" data-text="DIGITAL">DIGITAL</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Não nascemos apenas de um desejo, mas da urgência de reescrever o futuro. A FABRANI surgiu para preencher o abismo entre a formação tradicional e a velocidade exponencial da nova economia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
                <img src={genesisDig} alt="Digital Genesis" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 glitch-hover" data-text="NOSSO DNA">NOSSO DNA</h3>
                  <p className="text-gray-300">Simbiose radical entre robustez acadêmica e agilidade do Vale do Silício.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="border-l-2 border-red-500/30 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-red-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-4 glitch-hover" data-text="O MARCO DE 2025">O MARCO DE 2025</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Este foi o ano da nossa consolidação como a autoridade máxima em Educação <span className="notranslate" translate="no">AI-Native</span> no Brasil. Mais do que uma faculdade, tornamo-nos um ecossistema de elite, reunindo mais de <strong className="text-white">380 Mestres e Doutores</strong> das maiores universidades do mundo em nossa rede <span className="notranslate" translate="no">FABRANI PLAY</span>.
                </p>
              </div>

              <div className="border-l-2 border-red-600/30 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-red-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-4 glitch-hover" data-text="NOSSO PROPÓSITO">NOSSO PROPÓSITO</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <strong className="text-white">Hackear a obsolescência profissional.</strong> Capacitar indivíduos para não apenas sobreviverem, mas dominarem a nova economia global, criando a ponte definitiva entre a excelência acadêmica e as demandas de um mercado em constante disrupção.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <div className="bg-white/5 border border-white/10 p-10 hover:border-red-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full group-hover:bg-red-500/20 transition-all"></div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-red-500">01.</span> <span className="glitch-hover" data-text="MISSÃO">MISSÃO</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Formar a elite adaptável da Era Digital. Desenvolver mentes ágeis através de uma metodologia imersiva, onde <strong className="text-white">90% das atividades</strong> são desafios reais propostos por parceiros estratégicos do mercado.
              </p>
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-red-500 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 hover:border-red-600/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full group-hover:bg-red-600/20 transition-all"></div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-red-600">02.</span> <span className="glitch-hover" data-text="VISÃO">VISÃO</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Ser o epicentro global da Inteligência Artificial Aplicada. Consolidar-se como a referência indiscutível na formação de talentos que reescrevem o código da sociedade através de negócios inovadores e liderança ética.
              </p>
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-red-600 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>

          {/* Seção 7: Valores (ITEC) */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              PROTOCOLOS DE <span className="text-red-500 glitch-hover" data-text="CULTURA">CULTURA</span> (ITEC)
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O código-fonte que rege nossas decisões e define quem somos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                letter: "I",
                title: "INICIATIVA",
                desc: "Proatividade para agir e criar",
                color: "text-red-500",
                border: "hover:border-red-500/50"
              },
              {
                letter: "T",
                title: "TRANSPARÊNCIA",
                desc: "Fale a verdade. Jogue limpo.",
                color: "text-white",
                border: "hover:border-white/50"
              },
              {
                letter: "E",
                title: "EMPATIA",
                desc: "Compreensão e cuidado mútuo",
                color: "text-red-600",
                border: "hover:border-red-600/50"
              },
              {
                letter: "C",
                title: "COLABORAÇÃO",
                desc: "Construa junto. O sucesso é coletivo.",
                color: "text-red-500",
                border: "hover:border-red-500/50"
              }
            ].map((item, i) => (
              <div key={i} className={`bg-black border border-white/10 p-8 ${item.border} transition-all duration-300 group relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 text-9xl font-bold opacity-5 ${item.color} -mr-4 -mt-4 select-none`}>
                  {item.letter}
                </div>
                <div className={`text-4xl font-bold mb-4 ${item.color} mb-6`}>{item.letter}</div>
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
