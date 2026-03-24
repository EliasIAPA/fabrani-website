import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Award, TrendingUp, Shield, Users, GraduationCap, Briefcase, Scale, BookOpen, Clock, MapPin, Star, X, ShieldAlert } from "lucide-react";
import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { GHLForm } from "@/components/GHLForm";

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
  { label: "ANOS DE MERCADO", value: "20" },
  { label: "ALUNOS FORMADOS", value: "+100K" },
  { label: "PROJETOS VALIDADOS", value: "150" },
  { label: "PROFESSORES", value: "500+" },
];

export default function MEC() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showHeroForm, setShowHeroForm] = useState(false);

  // Esconder o widget flutuante de WhatsApp/Rosana.io nesta página
  useEffect(() => {
    const hideWidget = () => {
      const floatingBtn = document.getElementById('click-plug-to-support');
      if (floatingBtn) {
        (floatingBtn as HTMLElement).style.display = 'none';
      }
      const allElements = document.querySelectorAll('[id*="rosana"], [class*="rosana"], [id*="plug-to-support"], [class*="whatsapp-float"]');
      allElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
      const widgetContainer = floatingBtn?.parentElement;
      if (widgetContainer && widgetContainer.id !== 'root') {
        (widgetContainer as HTMLElement).style.display = 'none';
      }
    };

    hideWidget();
    const timer1 = setTimeout(hideWidget, 500);
    const timer2 = setTimeout(hideWidget, 1500);
    const timer3 = setTimeout(hideWidget, 3000);

    const observer = new MutationObserver(() => {
      hideWidget();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO 
        title="Consultoria MEC | FABRANI - Extensão Universitária"
        description="Transforme seu treinamento em Extensão Universitária com certificação MEC. Aumente suas vendas com legitimidade institucional."
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-light text-gray-600 mb-4 tracking-wide">Para quem já vende cursos, mentorias ou treinamentos</p>
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
            Seu curso pode continuar competindo como <span className="text-red-600">infoproduto</span>... ou entrar na <span className="text-red-600">Educação Formal.</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Existe um Atalho Institucional que transforma seu treinamento em uma <strong>Extensão Universitária com certificação validada por faculdade reconhecida pelo MEC</strong>. Quando isso acontece, ele deixa de disputar atenção. Ele passa a operar com Reconhecimento Institucional. O valor percebido sobe. A resistência ao preço diminui. E vender fica mais simples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-base"
              onClick={() => setShowHeroForm(true)}
            >
              AGENDAR AGORA
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4 font-light">Avaliação Gratuita • Sem Compromisso</p>

          {/* Modal GHL - abre ao clicar no CTA */}
          {showHeroForm && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowHeroForm(false); }}
            >
              <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden">
                {/* Header do modal */}
                <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-light text-gray-400 uppercase tracking-widest mb-1">Sessão Estratégica</p>
                    <h3 className="text-lg font-bold">Agende sua Avaliação Acadêmica</h3>
                  </div>
                  <button
                    onClick={() => setShowHeroForm(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label="Fechar formulário"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Formulário GHL */}
                <div className="bg-white">
                  <GHLForm
                    formId="NIiX8zUL3aiJ65D44Z8J"
                    height={520}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Problem Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            O mercado não premia apenas quem entrega mais. <span className="text-red-600">Premia quem parece mais seguro.</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
            Você pode ter um treinamento melhor, mais profundo, mais transformador. Mas antes da compra, o aluno não sabe disso. Ele enxerga apenas:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-lg font-bold text-black mb-4">Ele enxerga errado, e você paga o preço com:</h3>
            <ul className="space-y-3 text-gray-700 font-light">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Mais esforço para justificar preço</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Mais comparação</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Mais desconto</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Menor margem</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-8 border border-gray-200">
            <p className="text-gray-700 font-light leading-relaxed">
              Enquanto seu curso opera como infoproduto comum, ele compete como todos. Já na <strong>Educação Formal</strong>, a lógica muda.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold px-8 py-6"
          >
            QUERO MUDAR DE CATEGORIA
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Framework Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            O problema não é o seu curso. <span className="text-red-600">É o enquadramento dele.</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl font-light leading-relaxed">
            Enquanto seu treinamento opera como infoproduto comum, ele é percebido como substituível. E quando algo é percebido como substituível, três coisas acontecem:
          </p>
        </div>

        <div className="bg-gray-50 p-8 border border-gray-200 mb-8">
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            Você investe mais em tráfego. Adiciona mais bônus. Argumenta mais para justificar valor. Não porque seu conteúdo é fraco. Mas porque ele ainda não tem <strong>validação institucional</strong>.
          </p>
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            No cenário atual, quem não sobe de categoria... fica preso na disputa por preço. E disputar preço nunca constrói autoridade. Só consome margem.
          </p>
          <p className="text-gray-700 font-light leading-relaxed">
            Se nada mudar no enquadramento, o esforço aumenta — mas o lucro não acompanha. E é exatamente aqui que a maioria dos infoprodutores trava.
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-black mb-4">Existe um Atalho Institucional.</h3>
          <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto">
            E ele separa dois tipos de posicionamento: O informal e o institucional.
          </p>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mt-4">
            Não é sobre marketing, tráfego ou audiência... É sobre categoria.
          </p>
        </div>

        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-red-600 pl-6">
            <h4 className="text-xl font-bold text-black mb-3">O Diferencial</h4>
            <p className="text-gray-700 font-light leading-relaxed">
              Quando seu treinamento se torna Extensão Universitária com certificação validada pelo MEC, ele deixa de operar como produto digital. Ele passa a integrar a Educação Formal. E Educação Formal não compete por preço. Compete por legitimidade.
            </p>
          </div>
          <div className="border-l-4 border-red-600 pl-6">
            <h4 className="text-xl font-bold text-black mb-3">O Fechamento</h4>
            <p className="text-gray-700 font-light leading-relaxed">
              Isso muda a decisão antes da Venda acontecer. Não é sobre parecer maior. É sobre pertencer a outra categoria. Mas entrar na Educação Formal não é uma decisão comercial. É uma decisão acadêmica. E é exatamente por isso que existe um processo de validação.
            </p>
          </div>
          <div className="border-l-4 border-red-600 pl-6">
            <h4 className="text-xl font-bold text-black mb-3">Explicação Técnica</h4>
            <p className="text-gray-700 font-light leading-relaxed">
              Antes de qualquer enquadramento, seu treinamento passa por Avaliação Acadêmica conduzida por Junta Permanente de Avaliação formada por professores doutores vinculados à Faculdade reconhecida pelo MEC. Não é validação de marketing. É parecer acadêmico.
            </p>
          </div>
          <div className="border-l-4 border-red-600 pl-6">
            <h4 className="text-xl font-bold text-black mb-3">Chamada Final</h4>
            <p className="text-gray-700 font-light leading-relaxed">
              A Consultoria Estratégica existe para definir se seu curso já está nesse nível — ou o que falta para chegar lá. Porque o Selo não é um detalhe. É mudança de categoria.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-base"
          >
            QUERO ACESSAR
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Partners Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Quem Já Confia na <span className="text-red-600">FABRANI</span></h2>
          <p className="text-lg text-gray-600 font-light">Grandes nomes do mercado digital que validaram seus projetos com a FABRANI</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, idx) => (
            <div key={idx} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {partner.image && (
                <img src={partner.image} alt={partner.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="font-bold text-black mb-2">{partner.name}</h3>
                <p className="text-red-600 font-bold text-sm mb-3">{partner.highlight}</p>
                <p className="text-gray-600 text-sm font-light">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <p className="text-4xl md:text-5xl font-black text-red-600 mb-2">{stat.value}</p>
              <p className="text-sm font-bold text-black tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">
          Quando Você Tem Seu Curso ou Mentoria Válido com Extensão pelo MEC:
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-black text-red-600 mb-4">#1</div>
            <h3 className="text-xl font-bold text-black mb-4">O logótipo do MEC em seu site é um AVALIADOR invisível</h3>
            <p className="text-gray-700 font-light">Que gera mais autoridade e menos dúvida sobre você ou seu curso</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-red-600 mb-4">#2</div>
            <h3 className="text-xl font-bold text-black mb-4">O logótipo do MEC em seu site reduz o custo do Tráfego</h3>
            <p className="text-gray-700 font-light">E aumenta brutalmente suas vendas</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-red-600 mb-4">#3</div>
            <h3 className="text-xl font-bold text-black mb-4">O logótipo do MEC em seu site permite uma parceria sólida</h3>
            <p className="text-gray-700 font-light">Entre você e uma faculdade - cooperação Técnica</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* About Elias Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black mb-4">QUEM VAI TE ATENDER</h2>
          <p className="text-xl text-gray-700 font-light">Não É Coach. Não É Guru.<br/><span className="text-red-600 font-bold">É Quem Valida o Mercado.</span></p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-black text-black mb-2">Elias Evangelista</h3>
            <p className="text-red-600 font-bold mb-6">Founder & Diretor FABRANI</p>
            <p className="text-gray-700 font-light leading-relaxed mb-8">
              Com 24 anos de experiência em modelos de negócios físicos e digitais, Elias Evangelista não apenas ensina — ele constrói as estruturas que sustentam os maiores players do mercado.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-black mb-3">Experiência</h4>
                <ul className="space-y-2 text-gray-700 font-light text-sm">
                  <li>• 24 anos em Modelos de Negócios</li>
                  <li>• Mercado Digital desde 2009</li>
                  <li>• Advogado há 20 anos</li>
                  <li>• Contabilista há 24 anos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3">Formação</h4>
                <ul className="space-y-2 text-gray-700 font-light text-sm">
                  <li>• Mestrado em Direito</li>
                  <li>• MBA em Modelo de Negócios</li>
                  <li>• Especialista em Regulação MEC</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-bold text-black mb-4">Track Record</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-black text-red-600">150</p>
                  <p className="text-sm text-gray-600 font-light">Projetos Validados em 2025</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-red-600">+100k</p>
                  <p className="text-sm text-gray-600 font-light">Alunos Treinados</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={IMAGES.elias} alt="Elias Evangelista" className="w-full rounded border border-gray-200" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Offer Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">A Oferta da Consultoria Estratégica</h2>

        <div className="bg-gray-50 p-8 md:p-12 border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-black mb-6">A Avaliação que define se seu treinamento pode receber a Chancela do MEC.</h3>
          
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            <p>
              <strong>Uma reunião estratégica de 60 minutos com um Consultor da FABRANI.</strong>
            </p>
            <p>
              Durante essa sessão, seu treinamento é analisado sob os critérios acadêmicos utilizados para estruturar Extensões Universitárias reconhecidas pelo MEC.
            </p>
            <p>
              <strong>Ao final, você terá uma definição objetiva:</strong>
            </p>
            <ul className="space-y-3 pl-6 border-l-4 border-red-600">
              <li>• Se já pode ser enquadrado na Educação Formal</li>
              <li>• O que precisa ser ajustado, se necessário</li>
              <li>• E o caminho para implementação</li>
            </ul>
            <p>
              Essa é a etapa obrigatória antes de qualquer certificação.
            </p>
            <p>
              É aqui que se decide se o seu curso continua como infoproduto... ou passa a operar com Reconhecimento Institucional.
            </p>
          </div>
        </div>

        {/* Two Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-gray-200 p-8">
            <h4 className="text-xl font-bold text-black mb-4">Continuar competindo como infoproduto.</h4>
            <p className="text-gray-700 font-light mb-6">Disputar preço, explicar valor, convencer a cada venda.</p>
          </div>
          <div className="border-2 border-red-600 p-8 bg-red-50">
            <h4 className="text-xl font-bold text-black mb-4">Ou entrar oficialmente na Educação Formal.</h4>
            <p className="text-gray-700 font-light mb-6">Legitimidade institucional, autoridade acadêmica, margens maiores.</p>
            <p className="text-red-600 font-bold text-sm">RECOMENDADO</p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 border border-gray-200 mb-12">
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            <strong>Seu curso já foi validado pelo mercado.</strong>
          </p>
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            Agora ele pode ser validado institucionalmente.
          </p>
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            <strong>A Avaliação Acadêmica é gratuita.</strong>
          </p>
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            Mas depende da disponibilidade da Junta e dos Consultores.
          </p>
          <p className="text-gray-700 font-light leading-relaxed">
            E as 10 primeiras aplicações contam com participação direta do Diretor da Faculdade.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Form Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Agende Sua Sessão Estratégica</h2>
          <p className="text-lg text-gray-600 font-light">Preencha abaixo para garantir sua vaga</p>
          <p className="text-sm text-gray-500 font-light mt-2">Avaliação 100% gratuita • Sem compromisso • Dados protegidos</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <GHLForm height="600" />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-600 font-light">Dúvidas sobre a Avaliação Acadêmica e o processo de certificação</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="border border-gray-200">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-black text-left">{item.question}</h3>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700 font-light leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-black mb-4">FABRANI</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Codificando o Futuro da Educação. Uma instituição focada em formar a próxima geração de líderes na era da Inteligência Artificial.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-gray-400 font-light text-sm mb-2">Segunda à Sexta — 08:30 - 17:30</p>
              <p className="text-gray-400 font-light text-sm">Av. Paulista, 1000 — São Paulo - SP</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">MEC</h4>
              <p className="text-gray-400 font-light text-sm">Instituição credenciada com nota máxima no MEC.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 font-light text-sm">© 2026 Faculdade FABRANI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
