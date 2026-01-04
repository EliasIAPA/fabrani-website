import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, ShieldCheck, Users, HelpCircle, ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";

// Dados dos MBAs (normalmente viriam de uma API ou arquivo separado)
const mbaData: Record<string, any> = {
  "negocios": {
    title: "MBA IA para Negócios",
    headline: "Estratégia Exponencial: transforme sua empresa em AI-First em 6 meses.",
    subheadline: "Implemente decisões orientadas por dados, automação de ponta a ponta e novos fluxos de receita com IA — com segurança, governança e velocidade.",
    target: "C-Levels, founders, gestores e consultores de negócios.",
    outcomes: [
      "Estratégia AI-First implementada",
      "Decisões baseadas em dados reais",
      "Automação de processos operacionais",
      "Novos fluxos de receita com IA",
      "Governança e ética em IA",
      "Liderança exponencial"
    ],
    modules: [
      "Estratégia AI-First e Redesenho de Modelo de Negócios",
      "Dados, Analytics e Previsão de Demanda",
      "Operações Autônomas e Eficiência de Custos",
      "Growth e Vendas com Agentes de IA",
      "Governança, Risco, Ética e Segurança",
      "Residência em IA: projeto real na sua empresa"
    ]
  },
  "saude": {
    title: "MBA IA para Saúde",
    headline: "Saúde de Precisão: IA para diagnóstico, gestão e cuidado em escala.",
    subheadline: "Do fluxo clínico à gestão hospitalar, use IA para reduzir tempos, erros e custos — mantendo compliance e ética.",
    target: "Médicos, gestores hospitalares, profissionais de saúde e healthtech founders.",
    outcomes: [
      "Diagnósticos mais precisos e rápidos",
      "Gestão hospitalar otimizada",
      "Redução de erros médicos",
      "Triagem eficiente com IA",
      "Compliance com LGPD e Bioética",
      "Liderança em saúde digital"
    ],
    modules: [
      "Fundamentos de IA Clínica e Workflow Assistido",
      "Interoperabilidade, Prontuário e Dados Sensíveis",
      "Triagem, Predição e Suporte à Decisão Clínica",
      "Gestão Hospitalar, Estoques e Leitos com IA",
      "Compliance, LGPD, Bioética e Segurança",
      "Residência em IA: piloto em ambiente assistencial"
    ]
  },
  "juridico": {
    title: "MBA IA Jurídico",
    headline: "Jurisprudência Acelerada: do peticionamento à análise de risco em minutos.",
    subheadline: "Automatize tarefas repetitivas, eleve qualidade argumentativa e reduza prazos com IA responsável e auditável.",
    target: "Advogados, sócios de escritórios, departamentos jurídicos e legaltechs.",
    outcomes: [
      "Automação de peças jurídicas",
      "Análise preditiva de casos",
      "Jurimetria avançada",
      "Gestão eficiente de processos",
      "Redução de trabalho repetitivo",
      "Advocacia 4.0"
    ],
    modules: [
      "Fundamentos de IA no Direito e Fluxos de Trabalho",
      "Pesquisa, Jurimetria e Due Diligence com IA",
      "Automação de Documentos e Peticionamento",
      "Gestão de Carteiras, Risco e Previsão de Desfechos",
      "Compliance, Ética, Privacidade e Explainability",
      "Residência em IA: caso real em escritório/departamento jurídico"
    ]
  },
  "marketing": {
    title: "MBA IA para Marketing",
    headline: "Escala Infinita: personalização 1:1 e growth orientado por IA.",
    subheadline: "Do planejamento à conversão: conte com agentes autônomos, conteúdo multiativo e mídia otimizada em tempo real.",
    target: "CMOs, gerentes de marketing, growth hackers e agências.",
    outcomes: [
      "Personalização em escala",
      "Criação de conteúdo generativo",
      "Otimização de mídia em tempo real",
      "Automação de funis de vendas",
      "Análise preditiva de tendências",
      "ROI maximizado"
    ],
    modules: [
      "Estratégia AI-Driven e Arquitetura de Growth",
      "Dados de Audiência, Segmentação e Mídia",
      "Conteúdo Generativo Multicanal e Marcas",
      "Funis Autônomos e Otimização Contínua",
      "Métricas, Segurança de Marca e Compliance",
      "Residência em IA: funil real de aquisição/retensão"
    ]
  },
  "closer": {
    title: "MBA IA para Formação de Closer",
    headline: "Alto Ticket, Alta Ciência: feche negócios com IA, sinais e dados.",
    subheadline: "Use IA para qualificação, roteiro dinâmico, análise de sinais e previsões de fechamento.",
    target: "Vendedores high-ticket, gerentes comerciais e SDRs.",
    outcomes: [
      "Aumento na taxa de conversão",
      "Qualificação precisa de leads",
      "Roteiros de vendas dinâmicos",
      "Análise de sentimento em tempo real",
      "Previsibilidade de receita",
      "Vendas baseadas em dados"
    ],
    modules: [
      "Psicologia de Vendas Assistida por IA",
      "Qualificação, ICP e Priorização por Dados",
      "Roteiros Dinâmicos e Objeções em Tempo Real",
      "Análise de Sinais (voz, texto), CRM e Previsão",
      "Ética, Compliance e Privacidade em Vendas",
      "Residência em IA: máquina real de closers"
    ]
  },
  "educacao": {
    title: "MBA IA para Educação",
    headline: "Aprendizagem Personalizada em Escala: IA no coração da educação.",
    subheadline: "Construa trilhas adaptativas, avaliação contínua e operações acadêmicas inteligentes.",
    target: "Educadores, gestores escolares, edtech founders e designers instrucionais.",
    outcomes: [
      "Trilhas de aprendizagem adaptativas",
      "Tutoria inteligente 24/7",
      "Avaliação automatizada e justa",
      "Engajamento personalizado",
      "Gestão acadêmica eficiente",
      "Inovação pedagógica real"
    ],
    modules: [
      "Pedagogia AI-Native e Design Instrucional",
      "Dados Educacionais, Engajamento e Retenção",
      "Conteúdos Generativos e Tutores Inteligentes",
      "Avaliação Adaptativa e Analytics de Aprendizagem",
      "Ética, Viés, LGPD e Segurança na Educação",
      "Residência em IA: piloto em curso/plataforma"
    ]
  }
};

export default function MBADetail() {
  const [match, params] = useRoute("/mbas/:id");
  const mba = params && mbaData[params.id];

  if (!match || !mba) {
    return <div className="min-h-screen flex items-center justify-center text-white">MBA não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/mbas">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-neon-cyan pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para MBAs
            </Button>
          </Link>
          
          <Badge variant="outline" className="border-neon-purple text-neon-purple mb-6 px-4 py-1">MBA OFICIAL FABRANI</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl">
            {mba.headline}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            {mba.subheadline}
          </p>
          <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-8 rounded-none shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              QUERO CONHECER AGORA <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </a>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Para quem é este MBA?</h2>
              <p className="text-lg text-gray-300 border-l-4 border-neon-cyan pl-6 py-2">
                {mba.target}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">O que você vai conquistar</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {mba.outcomes.map((outcome: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-purple mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona (Módulos) */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Estrutura do Programa</h2>
          <div className="space-y-4">
            {mba.modules.map((module: string, i: number) => (
              <div key={i} className="group p-6 border border-white/10 bg-black hover:border-neon-cyan/50 transition-all rounded-lg flex items-center gap-6">
                <div className="text-4xl font-bold text-white/10 group-hover:text-neon-cyan/20 transition-colors">
                  0{i + 1}
                </div>
                <div className="text-xl font-medium text-white">
                  {module}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social e FAQ */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center gap-12 mb-20 opacity-70">
            <div className="flex items-center gap-2"><ShieldCheck className="w-8 h-8" /> <span className="font-bold text-xl">CHANCELA MEC</span></div>
            <div className="flex items-center gap-2"><Users className="w-8 h-8" /> <span className="font-bold text-xl">NETWORKING ELITE</span></div>
          </div>

          <h2 className="text-3xl font-bold mb-10 text-center">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-neon-cyan">Preciso saber programar?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base">
                Não. O foco é na aplicação estratégica e uso de ferramentas No-Code/Low-Code e agentes de IA. Você aprenderá a arquitetar soluções, não necessariamente a codar do zero.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-neon-cyan">Como medimos o ROI?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base">
                Desde o primeiro módulo, você aplicará métricas de eficiência e receita nos projetos. A Residência em IA final é focada puramente em entregar um resultado mensurável.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-neon-cyan">O conteúdo é atualizado?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base">
                Sim, semanalmente. Nossa ementa é viva e se adapta à velocidade dos lançamentos de novas tecnologias e modelos de IA.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center bg-gradient-to-b from-black to-neon-purple/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Pronto para liderar a revolução no seu setor?</h2>
          <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-black hover:bg-neon-cyan hover:text-black font-bold text-lg px-12 py-8 rounded-none shadow-lg transform hover:scale-105 transition-all">
              INICIAR MINHA EVOLUÇÃO EM IA
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
