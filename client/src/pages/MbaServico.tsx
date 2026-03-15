import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Award,
  TrendingUp,
  Shield,
  Users,
  GraduationCap,
  Briefcase,
  Clock,
  Star,
  CheckCircle2,
  Brain,
  Zap,
  Target,
  BarChart3,
  HeartHandshake,
  Lightbulb,
  BookOpen,
  MessageSquare,
  Layout,
  FileText,
  Headphones,
  CreditCard,
  RefreshCw,
  Globe,
  Megaphone,
  Settings,
  Smile,
  DollarSign,
  UserCheck,
  Search,
  Mail,
  Phone,
  ExternalLink,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { SEO } from "@/components/SEO";

/* ─── FAQ Data ─── */
const faqItems = [
  {
    question: "O curso é 100% online?",
    answer:
      "Sim! Todo o conteúdo é disponibilizado em nossa plataforma digital, com aulas gravadas e materiais complementares. Você estuda no seu ritmo, de qualquer lugar. A única exceção é a Imersão Presencial, que acontece em locais estratégicos do setor de serviços.",
  },
  {
    question: "Preciso saber programar?",
    answer:
      "Não! O MBA foi desenhado para gestores e profissionais de serviços, não para programadores. Você aprenderá a usar ferramentas de IA prontas e aplicá-las diretamente no seu negócio, sem escrever uma linha de código.",
  },
  {
    question: "O diploma é reconhecido pelo MEC?",
    answer:
      "Sim! A FABRANI é uma instituição reconhecida pelo MEC com nota máxima 5. Seu certificado de MBA tem validade nacional e é aceito em concursos, promoções e processos seletivos.",
  },
  {
    question: "Qual a duração do curso?",
    answer:
      "O MBA tem carga horária total de 360 horas, divididas em 6 módulos de 60 horas cada. Você pode concluir em 6 a 12 meses, dependendo do seu ritmo de estudo.",
  },
  {
    question: "Como funciona a Imersão IA?",
    answer:
      "A Imersão é uma experiência prática e presencial onde você aplica IA diretamente em cenários reais do setor de serviços. Inclui visitas técnicas, workshops hands-on e networking com líderes do mercado.",
  },
  {
    question: "Tenho suporte para dúvidas?",
    answer:
      "Sim! Você terá acesso a mentoria mensal com especialistas, comunidade exclusiva de alunos e suporte técnico dedicado para tirar todas as suas dúvidas.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "Aceitamos PIX (com desconto especial), cartão de crédito em até 12x, e boleto bancário. Entre em contato para condições especiais para empresas.",
  },
  {
    question: "E se eu não gostar do curso?",
    answer:
      "Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.",
  },
];

/* ─── Modules Data ─── */
const modules = [
  {
    number: "01",
    title: "Gestão de Negócios e Serviços",
    hours: "60h",
    description:
      "Fundamentos de gestão moderna aplicada ao setor de serviços. Modelos de negócio, planejamento estratégico e indicadores de performance.",
  },
  {
    number: "02",
    title: "Fundamentos de IA",
    hours: "60h",
    description:
      "Conceitos essenciais de Inteligência Artificial, Machine Learning e automação. Entenda como a IA funciona sem precisar programar.",
  },
  {
    number: "03",
    title: "IA Aplicada a Negócios",
    hours: "60h",
    description:
      "Implementação prática de IA em operações, marketing, atendimento e finanças. Cases reais do setor de serviços.",
  },
  {
    number: "04",
    title: "Estratégia e Governança",
    hours: "60h",
    description:
      "Governança de dados, ética em IA, compliance e estratégia de transformação digital para empresas de serviços.",
  },
  {
    number: "05",
    title: "IMERSÃO IA — TRILHA SETORIAL",
    hours: "60h",
    description:
      "Imersão prática em cenários reais do seu setor. Visitas técnicas, workshops hands-on e aplicação direta de IA.",
  },
  {
    number: "06",
    title: "IMERSÃO IA — PROJETO FINAL",
    hours: "60h",
    description:
      "Desenvolvimento do seu projeto de transformação digital com mentoria individual. Apresentação para banca avaliadora.",
  },
];

/* ─── Pain Points ─── */
const painPoints = [
  {
    icon: Brain,
    title: "Paralisia por Informação",
    description:
      "Excesso de conteúdo genérico e nenhuma aplicação prática. Você consome, mas não implementa.",
  },
  {
    icon: Target,
    title: "Gestão na Intuição",
    description:
      "Decisões baseadas em achismo, sem dados ou indicadores claros para guiar o negócio.",
  },
  {
    icon: Settings,
    title: "Operação no Caos",
    description:
      "Processos manuais, retrabalho constante e equipe sobrecarregada sem automação.",
  },
  {
    icon: DollarSign,
    title: "Custos Descontrolados",
    description:
      "Desperdício de até 30% do faturamento por falta de controle e previsibilidade.",
  },
  {
    icon: Users,
    title: "Cliente Invisível",
    description:
      "Sem dados de comportamento, sem personalização. Você não conhece quem compra de você.",
  },
  {
    icon: Shield,
    title: "Concorrência Desleal",
    description:
      "Enquanto você opera no manual, seus concorrentes já automatizam com IA.",
  },
];

/* ─── Differentials ─── */
const differentials = [
  {
    icon: Briefcase,
    title: "100% Setorial",
    description:
      "Conteúdo 100% focado no setor de serviços: bares, restaurantes, hotéis e facilities.",
  },
  {
    icon: Brain,
    title: "Imersão IA",
    description:
      "Experiência prática e presencial com aplicação real de IA no seu segmento.",
  },
  {
    icon: Lightbulb,
    title: "Metodologia PBL",
    description:
      "Problem-Based Learning: aprenda resolvendo problemas reais do seu negócio.",
  },
  {
    icon: Award,
    title: "Certificação MEC",
    description:
      "Diploma reconhecido pelo MEC com nota máxima 5. Validade nacional.",
  },
];

/* ─── Bonuses ─── */
const bonuses = [
  {
    icon: Users,
    title: "Comunidade Exclusiva",
    description:
      "Acesso vitalício à comunidade de gestores e empreendedores do setor de serviços.",
  },
  {
    icon: FileText,
    title: "Templates Prontos",
    description:
      "Modelos de dashboards, planilhas e prompts de IA prontos para usar no seu negócio.",
  },
  {
    icon: MessageSquare,
    title: "Mentoria Mensal",
    description:
      "Sessões ao vivo com especialistas para tirar dúvidas e acelerar sua implementação.",
  },
  {
    icon: GraduationCap,
    title: "Certificações Modulares",
    description:
      "Receba certificação a cada módulo concluído. Não precisa esperar o final do MBA.",
  },
  {
    icon: BarChart3,
    title: "Dashboards de Gestão",
    description:
      "Acesso a dashboards prontos com IA para monitorar KPIs do seu negócio.",
  },
  {
    icon: Headphones,
    title: "Consultoria 1-on-1",
    description:
      "Sessão individual de consultoria para os 20 primeiros inscritos.",
  },
];

/* ─── Transformation Areas ─── */
const transformationAreas = [
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Campanhas hiperpersonalizadas com IA, segmentação avançada e automação de funis.",
  },
  {
    icon: Settings,
    title: "Operações",
    description:
      "Automação de processos, previsão de demanda e otimização de recursos com IA.",
  },
  {
    icon: Smile,
    title: "Customer Experience",
    description:
      "Atendimento inteligente, análise de sentimento e jornada do cliente automatizada.",
  },
  {
    icon: DollarSign,
    title: "Finanças",
    description:
      "Previsão de fluxo de caixa, redução de desperdício e precificação dinâmica.",
  },
  {
    icon: UserCheck,
    title: "Recursos Humanos",
    description:
      "Recrutamento inteligente, gestão de escalas e análise de produtividade.",
  },
  {
    icon: Search,
    title: "Inteligência de Mercado",
    description:
      "Análise competitiva, tendências de consumo e insights preditivos com IA.",
  },
];

/* ─── Professors ─── */
const professors = [
  {
    name: "Luiz Henrique",
    role: "COORDENADOR GERAL",
    description:
      "Empreendedor, mentor e conselheiro com mais de 30 anos de experiência. Associado do SEAC PR e presidente da CONFIA (Alumni FIA Business School). Traz na bagagem: Reestruturação empresarial, Novos negócios e expansão, Conselhos de administração (FIA-USP), Gerenciamento de risco (University of Chicago). Idealizador do podcast 'O Melhor Conselho'.",
  },
  {
    name: "Prof. Carlos Eduardo Pereira",
    role: "Especialista em Gestão de Serviços",
    description:
      "Doutorando em IA pela Mackenzie. Consultor Independente de IA para Indústria, SaaS e Mercado Digital. Especialista em Agentes de IA e Automação. Atua em projetos na Faculdade HUB (Primo Rico), FAAP e Alura.",
  },
  {
    name: "Prof. Elias Evangelista",
    role: "FUNDADOR & REITOR",
    description:
      "Possui mestrado e é Advogado, Contabilista. Atua com tecnologia, educação e mercado digital há 20 anos. Nos últimos 4 anos se dedica à implantação de projetos de educação e IA para empresas.",
  },
  {
    name: "Larissa Ordoñez",
    role: "Legal Director & DPO",
    description:
      "Mestre em Processo Civil pela PUC-SP, com 25 anos de experiência na área corporativa. Especialista em Compliance e LGPD, é Professora da PUC-SP. Atualmente, é Legal Director e DPO do Grupo Kantar na América Latina.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: "Mariana S.",
    role: "Dona de Restaurante",
    text: "Reduzi meu desperdício em 25% no primeiro mês aplicando o módulo de IA na cozinha.",
    initial: "M",
  },
  {
    name: "Roberto A.",
    role: "Gerente de Hotel",
    text: "A automação do check-in liberou minha equipe para focar na experiência do hóspede. Incrível.",
    initial: "R",
  },
  {
    name: "Carla M.",
    role: "Gestora de Facilities",
    text: "O dashboard preditivo de manutenção mudou completamente nossa operação. Adeus planilhas.",
    initial: "C",
  },
  {
    name: "Paulo T.",
    role: "Empresário",
    text: "O networking na comunidade vale mais que o curso. Fechei 3 parcerias na primeira semana.",
    initial: "P",
  },
];

export default function MbaServico() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cargo: "",
    setor: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide Rosana.io widget on this page
  useEffect(() => {
    const hideWidget = () => {
      const rosanaElements = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], iframe[src*="rosana"]'
      );
      rosanaElements.forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
    };
    hideWidget();
    const observer = new MutationObserver(hideWidget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      const rosanaElements = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], iframe[src*="rosana"]'
      );
      rosanaElements.forEach((el) => {
        (el as HTMLElement).style.display = "";
      });
    };
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track Lead event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "MBA Servico Form",
        content_category: "MBA",
      });
    }
    setFormSubmitted(true);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SEO
        title="MBA Gestão de Negócios em Serviços e I.A. | FABRANI"
        description="Transforme-se em Líder Digital do Seu Setor em 6 a 12 Meses com o Único MBA que Une Gestão de Serviços + IA Aplicada a Bares, Restaurantes, Hotéis e Facilities."
        keywords="MBA Serviços, IA, Gestão de Serviços, Inteligência Artificial, FABRANI, Bares, Restaurantes, Hotéis, Facilities"
      />

      {/* ─── Top Bar ─── */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold tracking-wider">
        <span className="animate-pulse inline-block mr-2">🔴</span>
        Vagas Limitadas: Apenas 40 Alunos/Turma
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            MBA ESPECIALIZADO EM SERVIÇOS + IA
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
            O SETOR DE SERVIÇOS FOI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-yellow-400">
              REESCRITO.
            </span>
            <br />
            <span className="text-white/80 text-3xl md:text-5xl lg:text-6xl">
              VOCÊ JÁ DOMINA O{" "}
              <span className="text-red-500 underline decoration-red-500/50 underline-offset-4">
                NOVO CÓDIGO?
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transforme-se em{" "}
            <strong className="text-white">Líder Digital do Seu Setor</strong>{" "}
            em 6 a 12 Meses com o Único MBA que Une{" "}
            <strong className="text-red-400">
              Gestão de Serviços + IA Aplicada
            </strong>{" "}
            a Bares, Restaurantes, Hotéis e Facilities.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["100% Prático", "100% Setorial", "Imersão IA Garantida"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold"
                >
                  {badge}
                </span>
              )
            )}
          </div>

          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-7 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all transform hover:-translate-y-1"
          >
            QUERO DOMINAR IA E GESTÃO AGORA
          </Button>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>
                Certificação MEC{" "}
                <strong className="text-yellow-400">Nota 5</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-red-400" />
              <span>+2.5 Mi Alunos Impactados</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-400" />
              <span>100% AI-Native</span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
          onClick={() =>
            document
              .getElementById("dores")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown className="w-8 h-8 text-red-400 opacity-70" />
        </div>
      </section>

      {/* ─── Pain Points Section ─── */}
      <section id="dores" className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              A Verdade Que Ninguém No Seu Setor Te Conta:
            </h2>
            <p className="text-xl md:text-2xl text-red-400 font-semibold">
              Quem Não Dominar IA + Gestão Profissional Nos Próximos 2 Anos Será
              Engolido pela Concorrência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all group"
              >
                <pain.icon className="w-10 h-10 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2 text-white">
                  {pain.title}
                </h3>
                <p className="text-gray-400 text-sm">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              A Diferença Entre{" "}
              <span className="text-gray-500">Sobreviver</span> e{" "}
              <span className="text-red-500">Liderar</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SEM IA */}
            <div className="bg-white/5 border border-gray-700 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
              <h3 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  ✕
                </span>
                SEM IA
              </h3>
              <ul className="space-y-4">
                {[
                  "Decisões baseadas em achismos",
                  "Processos 100% manuais",
                  "Marketing genérico e caro",
                  "Desperdício de até 30% do faturamento",
                  "Crescimento linear e limitado",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="text-gray-600 mt-1">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COM IA */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-yellow-500"></div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-lg">
                  ✓
                </span>
                COM IA + FABRANI
              </h3>
              <ul className="space-y-4">
                {[
                  "Dados em tempo real para decisões certeiras",
                  "Automação de 60% dos processos operacionais",
                  "Marketing hiperpersonalizado com IA",
                  "Redução de 40% nos custos operacionais",
                  "Crescimento exponencial e escalável",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Differentials Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Por Que Este MBA é{" "}
              <span className="text-red-500">Único?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((diff, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-red-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                  <diff.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  {diff.title}
                </h3>
                <p className="text-gray-400 text-sm">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Immersion Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-red-400 text-sm font-mono tracking-widest uppercase">
              Experiência Exclusiva
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
              O Único MBA do Brasil com{" "}
              <span className="text-red-500">Imersão em Serviços</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-500/30 transition-all">
              <Globe className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Imersão Corporativa Real
              </h3>
              <p className="text-gray-400">
                Visite operações reais de grandes empresas de serviços. Veja a
                IA funcionando na prática, não apenas na teoria.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-500/30 transition-all">
              <Users className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Networking de Alto Nível
              </h3>
              <p className="text-gray-400">
                Conecte-se com líderes do setor, troque experiências e construa
                parcerias estratégicas durante a imersão.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-500/30 transition-all">
              <TrendingUp className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Por que a Imersão Muda o Jogo?
              </h3>
              <p className="text-gray-400">
                Porque teoria sem prática é apenas informação. A imersão
                transforma conhecimento em competência real e aplicável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Modular Certification Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Certificação Modular:{" "}
              <span className="text-yellow-400">Seu Ritmo, Suas Regras</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-yellow-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Acesse Módulos Independentes
              </h3>
              <p className="text-gray-400">
                Cada módulo é uma unidade completa. Comece por onde faz mais
                sentido para o seu negócio.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-yellow-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Receba Certificação a Cada Etapa
              </h3>
              <p className="text-gray-400">
                Não precisa esperar o final. A cada módulo concluído, você recebe
                uma certificação válida.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-yellow-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                MBA sem Curso Superior? Sim!
              </h3>
              <p className="text-gray-400">
                Mesmo sem graduação, você pode cursar os módulos e receber
                certificação de extensão universitária.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Modules Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-red-400 text-sm font-mono tracking-widest uppercase">
              Grade Curricular
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
              6 Módulos de{" "}
              <span className="text-red-500">Transformação Total</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              360 horas de conteúdo prático, setorial e com imersão real em IA
              aplicada ao setor de serviços.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {mod.hours}
                </div>
                <span className="text-5xl font-black text-red-500/20 group-hover:text-red-500/30 transition-colors">
                  {mod.number}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-3 text-white">
                  {mod.title}
                </h3>
                <p className="text-gray-400 text-sm">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bonuses Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Muito Mais Que Um{" "}
              <span className="text-red-500">MBA</span>
            </h2>
            <p className="text-gray-400 mt-4">
              Além do conteúdo acadêmico, você recebe um ecossistema completo de
              suporte e aceleração.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all group"
              >
                <bonus.icon className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2 text-white">
                  {bonus.title}
                </h3>
                <p className="text-gray-400 text-sm">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transformation Areas Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              6 Áreas de{" "}
              <span className="text-yellow-400">Transformação Total</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Domine IA em todas as frentes do seu negócio de serviços.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformationAreas.map((area, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:bg-yellow-500/30 transition-colors">
                  <area.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Professors Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Aprenda com{" "}
              <span className="text-red-500">Quem Faz</span>
            </h2>
            <p className="text-gray-400 mt-4">
              Professores que atuam no mercado real, não apenas na academia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professors.map((prof, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {prof.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-center text-white">
                  {prof.name}
                </h3>
                <p className="text-red-400 text-sm text-center font-semibold mb-3">
                  {prof.role}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {prof.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              O Que Dizem{" "}
              <span className="text-red-500">Nossos Alunos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all"
              >
                <div className="text-red-500 text-4xl font-serif mb-3">
                  ❝
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">
                  "{test.text}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                    {test.initial}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {test.name}
                    </p>
                    <p className="text-red-400 text-xs">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Guarantee Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center">
                <Shield className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                Garantia Incondicional de 7 Dias
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Acesse todo o conteúdo, participe das aulas e entre na
                comunidade. Se não for o que você esperava, devolvemos 100% do
                seu investimento. Sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-white/5 border border-red-500/30 rounded-2xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(220,38,38,0.15)]">
            <p className="text-red-400 font-bold tracking-widest uppercase text-sm mb-4">
              Oferta Exclusiva de Lançamento
            </p>
            <p className="text-gray-500 line-through text-lg mb-1">
              De R$ 62.100
            </p>
            <p className="text-red-400 font-bold text-lg mb-2">POR APENAS:</p>
            <div className="text-5xl md:text-6xl font-black text-white mb-1">
              R$ 12.000{" "}
              <span className="text-lg font-normal text-gray-400">(PIX)</span>
            </div>
            <p className="text-gray-400 mb-4">
              ou 12x de R$ 1.233,78 no cartão
            </p>
            <span className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">
              Desconto de 80% aplicado
            </span>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-7 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all"
            >
              SIM! QUERO GARANTIR MINHA VAGA AGORA
            </Button>

            <div className="mt-6 space-y-2 text-sm text-gray-500">
              <p>👥 Apenas 40 vagas por turma</p>
              <p>🎁 Bônus de Consultoria apenas para os 20 primeiros</p>
              <p>🔒 Pagamento 100% Seguro • Garantia de 7 Dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Perguntas{" "}
              <span className="text-red-500">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden hover:border-red-500/30 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">
                    {item.question}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section
        ref={formRef}
        className="py-20 bg-gradient-to-b from-black to-red-950/20 border-t border-white/5"
      >
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Garanta Sua Vaga Agora
            </h2>
            <p className="text-gray-400 mt-3">
              Preencha o formulário e nossa equipe entrará em contato.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-white/5 border border-red-500/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Inscrição Recebida!
              </h3>
              <p className="text-gray-400">
                Nossa equipe entrará em contato em breve. Fique atento ao seu
                e-mail e WhatsApp.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4"
            >
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="(DDD) 99999-9999"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: formatPhone(e.target.value),
                  })
                }
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              />
              <select
                value={formData.cargo}
                onChange={(e) =>
                  setFormData({ ...formData, cargo: e.target.value })
                }
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="" className="bg-black text-gray-500">
                  Selecione seu cargo...
                </option>
                <option value="proprietario" className="bg-black">
                  Proprietário / Sócio
                </option>
                <option value="diretor" className="bg-black">
                  Diretor / Gerente
                </option>
                <option value="gestor" className="bg-black">
                  Gestor / Supervisor
                </option>
                <option value="analista" className="bg-black">
                  Analista / Coordenador
                </option>
              </select>
              <select
                value={formData.setor}
                onChange={(e) =>
                  setFormData({ ...formData, setor: e.target.value })
                }
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="" className="bg-black text-gray-500">
                  Selecione seu setor...
                </option>
                <option value="bares-restaurantes" className="bg-black">
                  Bares e Restaurantes
                </option>
                <option value="turismo-hotelaria" className="bg-black">
                  Turismo e Hotelaria
                </option>
                <option value="facilities" className="bg-black">
                  Facilities
                </option>
                <option value="outro" className="bg-black">
                  Outro Setor de Serviços
                </option>
              </select>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-7 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all"
              >
                ✈ ENVIAR INSCRIÇÃO AGORA
              </Button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Ao enviar, você concorda com nossa{" "}
                <a
                  href="/privacidade"
                  className="text-red-400 hover:underline"
                  target="_blank"
                >
                  Política de Privacidade
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black text-red-500 mb-3">
                FABRANI
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                A Primeira Faculdade 100% AI-Native
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/fabrani.ia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600/30 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="https://www.tiktok.com/@fabrani.ia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600/30 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.21 8.21 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/school/fabrani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600/30 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="https://www.fabrani.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white font-bold mb-4">Contato</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span>contato@fabrani.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>(16) 99711-7597</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-red-400" />
                  <span>www.fabrani.com.br</span>
                </div>
              </div>
            </div>

            {/* Institucional */}
            <div>
              <h4 className="text-white font-bold mb-4">Institucional</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="/parceiros"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Parceiros
                </a>
                <a
                  href="/fabrani-conecta/responsabilidade-social"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Responsabilidade Social
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Políticas Anticorrupção
                </a>
                <a
                  href="/trabalhe-conosco"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  Trabalhe Conosco
                </a>
                <a
                  href="/fabrani-conecta/cpa"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  CPA - Comissão Permanente de Avaliação
                </a>
                <a
                  href="/fabrani-conecta/nap"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  NAP - Núcleo de Atendimento Psicopedagógico
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  NDE - Núcleo Docente Estruturante
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-red-400 transition-colors"
                >
                  CAT - Conselho Administração e Tecnologia
                </a>
              </div>
            </div>

            {/* Atendimento */}
            <div>
              <h4 className="text-white font-bold mb-4">Atendimento</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>8:30 - 17:30 PM</span>
                </div>
                <p>Segunda à Sexta-feira</p>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-bold mb-3">Certificações</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">
                    Selo MEC Nota 5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 FABRANI. Todos os direitos reservados. Codificando o Futuro
              da Educação.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
