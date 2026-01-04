import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, GraduationCap, ShieldCheck, Users, Activity, Lock, Cpu, BarChart, CheckCircle2, Globe, ChevronDown, FileText } from "lucide-react";
import { useState } from "react";
import ObsolescenceSimulator from "@/components/ObsolescenceSimulator";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Seção 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-neural-network.jpg')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            PROTOCOLO DE EVOLUÇÃO: ATIVO
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            O MUNDO FOI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">REESCRITO.</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            VOCÊ JÁ DOMINA O <span className="text-neon-purple underline decoration-neon-purple/50 underline-offset-4">NOVO CÓDIGO?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 border-l-2 border-neon-cyan/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            A primeira faculdade <strong className="text-white">100% AI-Native</strong> do Brasil. Transformamos profissionais em <strong className="text-white">Líderes de IA</strong> com apoio da ciência e educação reconhecida pelo MEC e a velocidade do Vale do Silício.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button 
              size="lg" 
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-8 rounded-none w-full sm:w-auto shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-1"
              onClick={() => {
                const element = document.getElementById('simulador');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              INICIAR MINHA EVOLUÇÃO <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Indicador de Rolagem */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
             onClick={() => {
               const element = document.getElementById('carta-aberta');
               element?.scrollIntoView({ behavior: 'smooth' });
             }}>
          <ChevronDown className="w-10 h-10 text-neon-cyan opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* Seção 1.5: Carta Aberta FABRANI 2026 */}
      <section id="carta-aberta" className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-display">
                CARTA ABERTA <span className="text-neon-cyan">FABRANI 2026</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto"></div>
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

              <div className="border-l-4 border-neon-purple pl-6 py-2 my-8 bg-white/5 italic text-gray-300">
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
                <div className="font-signature text-4xl text-neon-cyan mb-2 font-handwriting" style={{ fontFamily: 'cursive' }}>Elias Evangelista</div>
                <p className="text-white font-bold uppercase tracking-wider text-sm">Diretor e Founder</p>
                <p className="text-muted-foreground text-xs">FABRANI Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Interatividade (Simulador de Obsolescência) */}
      <section id="simulador" className="py-24 relative bg-secondary/5 border-y border-white/5 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="border-neon-purple text-neon-purple rounded-none px-4 py-1">FERRAMENTA EXCLUSIVA</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Simulador de <br />
                <span className="text-neon-purple">Obsolescência</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Descubra quanto do seu trabalho será automatizado nos próximos 3 anos e como a FABRANI é a sua vacina contra a irrelevância profissional.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Análise baseada em dados reais do mercado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Relatório personalizado de risco</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                  <span>Plano de ação imediato</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-30 blur-xl"></div>
              <ObsolescenceSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Autoridade (Elite Intelectual) */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-neon-cyan/5 blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              A Elite Intelectual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">ao seu lado</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Conexão direta com <span className="text-white font-bold">400 mestres e doutores</span>. Não ensinamos teoria, entregamos implementação real.
            </p>
            <Link href="/manifesto">
              <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold px-8 py-6 rounded-none transition-all">
                <FileText className="mr-2 h-5 w-5" /> LER O MANIFESTO
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-10 h-10 text-neon-cyan" />,
                title: "Rigor Acadêmico",
                desc: "Metodologia validada e corpo docente com a mais alta titulação acadêmica do país."
              },
              {
                icon: <Cpu className="w-10 h-10 text-neon-purple" />,
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
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 bg-black/50 w-20 h-20 flex items-center justify-center rounded-full border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border border-neon-cyan/30">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 z-0"></div>
            <div className="absolute inset-0 bg-[url('/images/ai-starter-pack.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan text-black text-xs font-bold uppercase tracking-wider">
                  Download Gratuito
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  BAIXE O GUIA: <br />
                  <span className="text-neon-cyan">50 Prompts de Ouro</span> para Executivos
                </h2>
                <p className="text-lg text-gray-300">
                  Economize 20h da sua semana. Uma curadoria exclusiva dos comandos mais poderosos para liderança, estratégia e produtividade.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-10 py-8 rounded-none shadow-lg flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  BAIXAR AGORA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Prova Social e Parceiros */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 text-center">
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
        <div className="absolute inset-0 bg-[url('/images/global-connection.jpg')] bg-cover bg-center opacity-10 mix-blend-screen fixed-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="border-neon-cyan text-neon-cyan rounded-none px-4 py-1 mb-6">SOBRE A FABRANI</Badge>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              <span className="glitch-hover" data-text="A GÊNESE">A GÊNESE</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple glitch-hover" data-text="DIGITAL">DIGITAL</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Não nascemos apenas de um desejo, mas da urgência de reescrever o futuro. A FABRANI surgiu para preencher o abismo entre a formação tradicional e a velocidade exponencial da nova economia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
                <img src="/images/genesis-digital.jpg" alt="Digital Genesis" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 glitch-hover" data-text="NOSSO DNA">NOSSO DNA</h3>
                  <p className="text-gray-300">Simbiose radical entre robustez acadêmica e agilidade do Vale do Silício.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="border-l-2 border-neon-cyan/30 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-neon-cyan rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-4 glitch-hover" data-text="O MARCO DE 2025">O MARCO DE 2025</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Este foi o ano da nossa consolidação como a autoridade máxima em Educação AI-Native no Brasil. Mais do que uma faculdade, tornamo-nos um ecossistema de elite, reunindo mais de <strong className="text-white">380 Mestres e Doutores</strong> das maiores universidades do mundo em nossa rede FABRANI PLAY.
                </p>
              </div>

              <div className="border-l-2 border-neon-purple/30 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-neon-purple rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-4 glitch-hover" data-text="NOSSO PROPÓSITO">NOSSO PROPÓSITO</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <strong className="text-white">Hackear a obsolescência profissional.</strong> Capacitar indivíduos para não apenas sobreviverem, mas dominarem a nova economia global, criando a ponte definitiva entre a excelência acadêmica e as demandas de um mercado em constante disrupção.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <div className="bg-white/5 border border-white/10 p-10 hover:border-neon-cyan/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-[50px] rounded-full group-hover:bg-neon-cyan/20 transition-all"></div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-neon-cyan">01.</span> <span className="glitch-hover" data-text="MISSÃO">MISSÃO</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Formar a elite adaptável da Era Digital. Desenvolver mentes ágeis através de uma metodologia imersiva, onde <strong className="text-white">90% das atividades</strong> são desafios reais propostos por parceiros estratégicos do mercado.
              </p>
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-neon-cyan w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 hover:border-neon-purple/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-[50px] rounded-full group-hover:bg-neon-purple/20 transition-all"></div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-neon-purple">02.</span> <span className="glitch-hover" data-text="VISÃO">VISÃO</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Ser o epicentro global da Inteligência Artificial Aplicada. Consolidar-se como a referência indiscutível na formação de talentos que reescrevem o código da sociedade através de negócios inovadores e liderança ética.
              </p>
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-neon-purple w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>

          {/* Seção 7: Valores (ITEC) */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              PROTOCOLOS DE <span className="text-neon-cyan glitch-hover" data-text="CULTURA">CULTURA</span> (ITEC)
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O código-fonte que rege nossas decisões e define quem somos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                letter: "I",
                title: "ALGORITMO DE INICIAÇÃO",
                desc: "Não aguardamos o input. Executamos o futuro. Nossa proatividade é o código-fonte que antecipa tendências e reescreve o mercado antes que a demanda seja compilada.",
                color: "text-neon-cyan",
                border: "hover:border-neon-cyan/50"
              },
              {
                letter: "T",
                title: "CÓDIGO ABERTO",
                desc: "Sem caixas pretas. Operamos com honestidade radical e dados visíveis. A confiança é nosso protocolo de segurança inegociável, onde cada bit de informação é compartilhado.",
                color: "text-white",
                border: "hover:border-white/50"
              },
              {
                letter: "E",
                title: "CONEXÃO NEURAL",
                desc: "Mais que interface, buscamos conexão profunda. Decodificamos as necessidades humanas em um mundo digital, criando um ambiente onde a diversidade é o processador central da inovação.",
                color: "text-neon-purple",
                border: "hover:border-neon-purple/50"
              },
              {
                letter: "C",
                title: "INTELIGÊNCIA DE ENXAME",
                desc: "Nenhum nó da rede é mais forte que o sistema. Unimos mentes biológicas e artificiais em uma arquitetura distribuída, onde o sucesso de um é o upgrade de todos.",
                color: "text-neon-cyan",
                border: "hover:border-neon-cyan/50"
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
