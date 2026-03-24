import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Award, TrendingUp, Shield, Users, GraduationCap, Briefcase, Scale, BookOpen, Clock, MapPin, Star, X, ShieldAlert } from "lucide-react";
import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const GHL_FORM_URL = "https://api.leadconnectorhq.com/widget/form/NIiX8zUL3aiJ65D44Z8J";
const GHL_SCRIPT_URL = "https://link.msgsndr.com/js/form_embed.js";

const IMAGES = {
  onm: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/onm-novo-mercado_aa2a11a8.jpg",
  escolaDolar: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/escola-dolar_a19d44c9.jpg",
  neilPatel: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/neil-patel_3b952b52.jpg",
  weburn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/weburn_bdc93606.png",
  elias: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/elias-evangelista_db856e4b.png",
};

const partners = [
  {
    name: "O Novo Mercado - 2025",
    highlight: "Certificação FABRANI",
    description: "Pós Graduação Ícaro de Carvalho / FABRANI - Projeto: Elias Evangelista",
    image: IMAGES.onm,
  },
  {
    name: "Escola do Dólar",
    highlight: "+20 mil alunos nos EUA",
    description: "Escola do Dólar - Certificação FABRANI - Capa Forbes Malta",
    image: IMAGES.escolaDolar,
  },
  {
    name: "Neil Patel",
    highlight: "Maior Especialista em SEO",
    description: "Elias Evangelista com Neil Patel - Referência mundial em Marketing Digital",
    image: IMAGES.neilPatel,
  },
  {
    name: "Evento Outlier",
    highlight: "+2 mil pessoas",
    description: "Certificação FABRANI - Tiago Finch / Ticto",
    image: null,
  },
  {
    name: "Weburn",
    highlight: "+2,5 milhões de usuários",
    description: "Desenvolvimento de MBA pela FABRANI",
    image: IMAGES.weburn,
  },
  {
    name: "Vendedor de Elite",
    highlight: "+3 mil pessoas",
    description: "Certificação e desenvolvimento de conteúdo",
    image: null,
  },
];

const faqItems = [
  {
    question: "Quanto custa a Avaliação Acadêmica?",
    answer: "A Avaliação Acadêmica é gratuita. É uma reunião estratégica de 60 minutos com um Consultor da FABRANI para analisar se seu treinamento pode ser enquadrado como Extensão Universitária.",
  },
  {
    question: "Como exatamente isso impacta as vendas dos meus treinamentos?",
    answer: "Quando seu curso passa a ter certificação validada por faculdade reconhecida pelo MEC, o valor percebido sobe drasticamente. A resistência ao preço diminui, o custo de tráfego cai e a taxa de conversão aumenta — porque você deixa de competir como infoproduto e passa a operar com Reconhecimento Institucional.",
  },
  {
    question: "Se eu já vendo bem, por que estruturar a certificação agora?",
    answer: "Porque o mercado está mudando de categoria. Quem se posiciona primeiro com validação institucional cria uma barreira competitiva que os concorrentes não conseguem replicar facilmente. É uma vantagem estratégica de longo prazo.",
  },
  {
    question: "Vou ter que mudar meu modelo de negócio ou a estrutura do curso?",
    answer: "Não necessariamente. A certificação se adapta ao seu modelo existente. O objetivo é agregar valor institucional ao que você já faz, não substituir sua metodologia.",
  },
  {
    question: "Entrar na Educação Formal deixa meu negócio mais burocrático ou engessado?",
    answer: "Não. A FABRANI cuida de toda a parte regulatória e acadêmica. Você mantém sua liberdade criativa e operacional, mas com o peso institucional de uma faculdade reconhecida pelo MEC.",
  },
  {
    question: "Vale para palestra, mentoria, curso presencial ou só para curso online?",
    answer: "Vale para todos os formatos: cursos online, presenciais, mentorias, treinamentos corporativos e palestras. O importante é a qualidade e estrutura do conteúdo.",
  },
  {
    question: "E se meu curso não for aprovado?",
    answer: "A Avaliação Acadêmica serve exatamente para isso: identificar o que precisa ser ajustado. Se seu curso não estiver pronto, você recebe um parecer detalhado com o caminho para adequação.",
  },
  {
    question: "Preciso entender de burocracia?",
    answer: "Não. A equipe da FABRANI conduz todo o processo regulatório. Você foca no seu conteúdo e na sua audiência.",
  },
  {
    question: "E se não tiver vagas para avaliar meu treinamento?",
    answer: "As vagas são limitadas pela disponibilidade da Junta Permanente de Avaliação. Por isso recomendamos agendar o quanto antes para garantir sua posição.",
  },
  {
    question: "Qual o impacto de deixar a certificação para depois?",
    answer: "Cada dia sem certificação é um dia competindo como infoproduto comum. Enquanto você espera, seus concorrentes podem estar se certificando e mudando de categoria.",
  },
];

const stats = [
  { value: "20", label: "ANOS DE MERCADO" },
  { value: "+100K", label: "ALUNOS FORMADOS" },
  { value: "150", label: "PROJETOS VALIDADOS" },
  { value: "500+", label: "PROFESSORES" },
];

function FAQItem({ item }: { item: typeof faqItems[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-900 font-medium text-base md:text-lg pr-4">{item.question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-5 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {item.answer}
        </div>
      )}
    </div>
  );
}

/* ===== MODAL DO FORMULÁRIO GOHIGHLEVEL ===== */
function FormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (isOpen && !scriptLoaded.current) {
      const existingScript = document.querySelector(`script[src="${GHL_SCRIPT_URL}"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = GHL_SCRIPT_URL;
        script.async = true;
        document.body.appendChild(script);
      }
      scriptLoaded.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Sessão Estratégica</h3>
            <p className="text-sm text-gray-600">Avaliação Acadêmica Gratuita — FABRANI</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-1" style={{ minHeight: "480px" }}>
          <iframe
            src={GHL_FORM_URL}
            style={{ width: "100%", height: "480px", border: "none", borderRadius: "3px" }}
            id="inline-NIiX8zUL3aiJ65D44Z8J"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="SE01 | Sessão Estratégica"
            data-height="463"
            data-layout-iframe-id="inline-NIiX8zUL3aiJ65D44Z8J"
            data-form-id="NIiX8zUL3aiJ65D44Z8J"
            title="SE01 | Sessão Estratégica"
          />
        </div>

        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Seus dados estão protegidos. Avaliação 100% gratuita e sem compromisso.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== SEÇÃO INLINE DO FORMULÁRIO ===== */
function InlineForm() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      const existingScript = document.querySelector(`script[src="${GHL_SCRIPT_URL}"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = GHL_SCRIPT_URL;
        script.async = true;
        document.body.appendChild(script);
      }
      scriptLoaded.current = true;
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <div className="bg-white border border-gray-200 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900 text-center">Agende Sua Sessão Estratégica</h3>
          <p className="text-sm text-gray-600 text-center mt-1">Preencha abaixo para garantir sua vaga</p>
        </div>
        <div className="p-1" style={{ minHeight: "480px" }}>
          <iframe
            src={GHL_FORM_URL}
            style={{ width: "100%", height: "480px", border: "none", borderRadius: "3px" }}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="SE01 | Sessão Estratégica"
            data-height="463"
            data-form-id="NIiX8zUL3aiJ65D44Z8J"
            title="SE01 | Sessão Estratégica"
          />
        </div>
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Avaliação 100% gratuita &bull; Sem compromisso &bull; Dados protegidos
          </p>
        </div>
      </div>
    </div>
  );
}

function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fp', 2, 2);
  }
  const canvasData = canvas.toDataURL();
  const nav = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth?.toString() || '',
    new Date().getTimezoneOffset().toString(),
    navigator.hardwareConcurrency?.toString() || '',
  ].join('|');
  const raw = canvasData + '|' + nav;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export default function MEC() {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [ipBlocked, setIpBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");

  const ipCheck = trpc.antiFraud.checkIp.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const recordMutation = trpc.antiFraud.recordSubmission.useMutation();

  useEffect(() => {
    if (ipCheck.data && !ipCheck.data.allowed) {
      setIpBlocked(true);
      setBlockMessage(ipCheck.data.message || "Acesso restrito.");
    }
  }, [ipCheck.data]);

  const openForm = () => {
    if (ipBlocked) return;
    setFormModalOpen(true);
  };
  const closeForm = () => setFormModalOpen(false);

  useEffect(() => {
    const hideWidget = () => {
      const floatingBtn = document.getElementById('click-plug-to-support');
      if (floatingBtn) {
        (floatingBtn as HTMLElement).style.display = 'none';
      }
      const allElements = document.querySelectorAll('[id*="rosana"], [class*="rosana"], [id*="plug-to-support"]');
      allElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
      const widgetContainer = floatingBtn?.parentElement;
      if (widgetContainer && widgetContainer.id !== 'root') {
        (widgetContainer as HTMLElement).style.display = 'none';
      }
    };

    hideWidget();
    const timer1 = setTimeout(hideWidget, 1000);
    const timer2 = setTimeout(hideWidget, 3000);
    const timer3 = setTimeout(hideWidget, 5000);

    const observer = new MutationObserver(() => {
      hideWidget();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
      const floatingBtn = document.getElementById('click-plug-to-support');
      if (floatingBtn) {
        (floatingBtn as HTMLElement).style.display = '';
      }
      const widgetContainer = floatingBtn?.parentElement;
      if (widgetContainer && widgetContainer.id !== 'root') {
        (widgetContainer as HTMLElement).style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    if ((window as any).fbq) return;

    const f = window as any;
    const b = document;
    let e: any, n: any;
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    e = b.createElement('script');
    e.async = true;
    e.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(e, s);

    (window as any).fbq('init', '1101040821159474');
    (window as any).fbq('init', '2419105295112897');
    (window as any).fbq('track', 'PageView');

    const noscript = b.createElement('noscript');
    const img = b.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=1101040821159474&ev=PageView&noscript=1';
    noscript.appendChild(img);
    b.body.appendChild(noscript);

    const noscript2 = b.createElement('noscript');
    const img2 = b.createElement('img');
    img2.height = 1;
    img2.width = 1;
    img2.style.display = 'none';
    img2.src = 'https://www.facebook.com/tr?id=2419105295112897&ev=PageView&noscript=1';
    noscript2.appendChild(img2);
    b.body.appendChild(noscript2);

    return () => {
      if (noscript.parentNode) noscript.parentNode.removeChild(noscript);
      if (noscript2.parentNode) noscript2.parentNode.removeChild(noscript2);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin?.includes('leadconnectorhq.com') ||
        event.origin?.includes('msgsndr.com')
      ) {
        let isFormSubmit = false;
        let formData: any = {};

        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (
            data?.type === 'form_submitted' ||
            data?.type === 'formSubmitted' ||
            data?.event === 'form_submitted' ||
            data?.event === 'formSubmitted' ||
            data?.action === 'form_submitted' ||
            data?.formSubmitted === true
          ) {
            isFormSubmit = true;
            formData = data;
          }
        } catch {
          if (
            typeof event.data === 'string' &&
            (event.data.includes('form_submitted') || event.data.includes('formSubmitted'))
          ) {
            isFormSubmit = true;
          }
        }

        if (isFormSubmit) {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'Lead');
            console.log('[Meta Pixel] Evento Lead disparado com sucesso');
          }

          try {
            const fingerprint = generateFingerprint();
            recordMutation.mutate({
              fingerprint,
              page: '/mec',
              leadName: formData?.data?.name || formData?.name || formData?.full_name || undefined,
              leadEmail: formData?.data?.email || formData?.email || undefined,
              leadPhone: formData?.data?.phone || formData?.phone || formData?.whatsapp || undefined,
            }, {
              onSuccess: (result) => {
                if (result.autoBlocked) {
                  setIpBlocked(true);
                  setBlockMessage('IP bloqueado por atividade suspeita.');
                  console.warn('[AntiFraud] IP bloqueado automaticamente');
                }
                console.log('[AntiFraud] Submissão registrada:', result);
              },
            });
          } catch (e) {
            console.warn('[AntiFraud] Erro ao registrar submissão:', e);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [recordMutation]);

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden bg-white">
      <SEO
        title="Consultoria MEC | FABRANI - Extensão Universitária"
        description="Transforme seu curso em Extensão Universitária com certificação validada por faculdade reconhecida pelo MEC. Avaliação Acadêmica gratuita."
        keywords="Consultoria MEC, Extensão Universitária, Certificação MEC, FABRANI, Infoproduto, Educação Formal"
      />

      <FormModal isOpen={formModalOpen} onClose={closeForm} />

      {ipBlocked && (
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-red-50 backdrop-blur-sm border-b border-red-200 px-4 py-3">
          <div className="container mx-auto flex items-center justify-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium text-center">
              {blockMessage || 'Acesso temporariamente restrito. Tente novamente mais tarde.'}
            </p>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 via-transparent to-white pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-200 bg-red-50 text-red-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            Para quem já vende cursos, mentorias ou treinamentos
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-gray-900">
            Seu curso pode continuar competindo como infoproduto...{" "}
            <span className="text-red-600">
              ou entrar na Educação Formal.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed font-light">
            Existe um Atalho Institucional que transforma seu treinamento em uma{" "}
            <strong className="text-gray-900 font-semibold">
              Extensão Universitária com certificação validada por faculdade reconhecida pelo MEC
            </strong>
            . Quando isso acontece, ele deixa de disputar atenção. Ele passa a operar com Reconhecimento Institucional. O valor percebido sobe. A resistência ao preço diminui. E vender fica mais simples.
          </p>

          <Button
            size="lg"
            onClick={openForm}
            className="bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-12 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-8 cursor-pointer border-0"
          >
            AGENDAR AGORA
          </Button>

          <p className="text-sm text-gray-500 mt-4 font-light">
            Avaliação Gratuita • Sem Compromisso
          </p>
        </div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <section className="py-24 bg-gray-50 relative border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center text-gray-900">
            O mercado não premia apenas quem entrega mais.{" "}
            <span className="text-red-600">Premia quem parece mais seguro.</span>
          </h2>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Você pode ter um treinamento melhor, mais profundo, mais transformador. Mas antes da compra, o aluno não sabe disso. Ele enxerga apenas:
            </p>

            <div className="border-l-4 border-red-600 pl-6 py-4 bg-white rounded-r">
              <p className="text-gray-900 font-bold mb-4">Ele enxerga errado, e você paga o preço com:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Mais esforço para justificar preço", "Mais comparação", "Mais desconto", "Menor margem"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Enquanto seu curso opera como infoproduto comum, ele compete como todos. Já na{" "}
              <strong className="text-gray-900">Educação Formal</strong>, a lógica muda.
            </p>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={openForm}
              className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold text-base px-8 py-6 rounded-lg transition-all cursor-pointer"
            >
              QUERO MUDAR DE CATEGORIA
            </Button>
          </div>
        </div>
      </section>

      {/* ===== ENQUADRAMENTO ===== */}
      <section className="py-24 bg-white relative border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center text-gray-900">
            O problema não é o seu curso.{" "}
            <span className="text-red-600">É o enquadramento dele.</span>
          </h2>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-16">
            <p>
              Enquanto seu treinamento opera como infoproduto comum, ele é percebido como substituível. E quando algo é percebido como substituível, três coisas acontecem:
            </p>
            <p>
              Você investe mais em tráfego. Adiciona mais bônus. Argumenta mais para justificar valor. Não porque seu conteúdo é fraco. Mas porque ele ainda não tem{" "}
              <strong className="text-gray-900">validação institucional</strong>.
            </p>
            <p>
              No cenário atual, quem não sobe de categoria... fica preso na disputa por preço. E disputar preço nunca constrói autoridade. Só consome margem.
            </p>
            <p className="text-gray-900 font-semibold">
              Se nada mudar no enquadramento, o esforço aumenta — mas o lucro não acompanha. E é exatamente aqui que a maioria dos infoprodutores trava.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ATALHO INSTITUCIONAL ===== */}
      <section className="py-24 bg-gray-50 relative border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Existe um <span className="text-red-600">Atalho Institucional.</span>
            </h2>
            <p className="text-xl text-gray-600">
              E ele separa dois tipos de posicionamento: O informal e o institucional.
            </p>
            <p className="text-gray-700 font-medium text-sm mt-2">
              Não é sobre marketing, tráfego ou audiência... É sobre categoria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 hover:border-red-300 transition-colors rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">O Diferencial</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Quando seu treinamento se torna Extensão Universitária com certificação validada pelo MEC, ele deixa de operar como produto digital. Ele passa a integrar a Educação Formal. E Educação Formal não compete por preço. Compete por legitimidade.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:border-red-300 transition-colors rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">O Fechamento</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Isso muda a decisão antes da Venda acontecer. Não é sobre parecer maior. É sobre pertencer a outra categoria. Mas entrar na Educação Formal não é uma decisão comercial. É uma decisão acadêmica. E é exatamente por isso que existe um processo de validação.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:border-red-300 transition-colors rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Explicação Técnica</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Antes de qualquer enquadramento, seu treinamento passa por Avaliação Acadêmica conduzida por Junta Permanente de Avaliação formada por professores doutores vinculados à Faculdade reconhecida pelo MEC. Não é validação de marketing. É parecer acadêmico.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:border-red-300 transition-colors rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Chamada Final</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A Consultoria Estratégica existe para definir se seu curso já está nesse nível — ou o que falta para chegar lá. Porque o Selo não é um detalhe. É mudança de categoria.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={openForm}
              className="bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-12 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer border-0"
            >
              QUERO ACESSAR
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PARCEIROS ===== */}
      <section className="py-24 bg-white relative border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Quem Já Confia na <span className="text-red-600">FABRANI</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 p-6 rounded-lg hover:border-red-300 transition-colors">
                {partner.image && (
                  <img src={partner.image} alt={partner.name} className="w-full h-40 object-cover rounded mb-4" />
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h3>
                <p className="text-red-600 font-semibold text-sm mb-2">{partner.highlight}</p>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORMULÁRIO INLINE ===== */}
      <section className="py-24 bg-gray-50 relative border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comece Sua Transformação Agora
            </h2>
            <p className="text-gray-600 text-lg">
              Preencha o formulário abaixo e receba sua avaliação gratuita
            </p>
          </div>
          <InlineForm />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-white relative border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-gray-600 text-lg">
              Respostas para as principais questões sobre a certificação MEC
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {faqItems.map((item, idx) => (
              <FAQItem key={idx} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={openForm}
              className="bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-12 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer border-0"
            >
              AGENDAR SESSÃO ESTRATÉGICA
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
