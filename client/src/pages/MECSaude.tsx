import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X, CheckCircle2, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { GHLForm } from "@/components/GHLForm";

const IMAGES = {
  elias: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/elias-evangelista_db856e4b.png",
};

const faqItems = [
  {
    question: "Preciso ter um curso ou mentoria já estruturado?",
    answer:
      "Não necessariamente. A Avaliação Acadêmica analisa o que você já tem — seja uma mentoria, um protocolo clínico, um treinamento corporativo ou um evento. A partir daí, identificamos o melhor caminho para enquadramento como Extensão Universitária.",
  },
  {
    question: "Profissionais de saúde podem emitir certificados com validade MEC?",
    answer:
      "Sim. Médicos, dentistas, psicólogos, fisioterapeutas, nutricionistas e outros profissionais regulamentados podem ter seus treinamentos enquadrados como Extensão Universitária com certificação emitida por faculdade reconhecida pelo MEC.",
  },
  {
    question: "Isso afeta meu registro no CRM, CRO, CFN ou outros conselhos?",
    answer:
      "Não. A certificação MEC é complementar à sua regulamentação profissional. Ela agrega valor institucional ao seu conteúdo sem interferir em nenhuma obrigação junto aos conselhos de classe.",
  },
  {
    question: "Quanto custa a Avaliação Acadêmica?",
    answer:
      "A Avaliação Acadêmica é 100% gratuita. É uma sessão estratégica de 60 minutos com um Consultor da FABRANI para analisar se seu treinamento pode ser enquadrado como Extensão Universitária.",
  },
  {
    question: "Meu evento ou congresso pode receber certificação MEC?",
    answer:
      "Sim. Eventos, congressos, simpósios e jornadas científicas da área da saúde podem ser enquadrados como atividade de Extensão Universitária, conferindo certificação com validade institucional aos participantes.",
  },
  {
    question: "Qual o impacto real nas minhas vendas?",
    answer:
      "Quando um treinamento de saúde passa a ter certificação MEC, o valor percebido aumenta significativamente. Profissionais da saúde são altamente sensíveis à credibilidade institucional — o que reduz a resistência ao preço e aumenta a taxa de conversão.",
  },
  {
    question: "Funciona para mentorias de negócios voltadas à saúde?",
    answer:
      "Sim. Mentorias de gestão de clínicas, consultórios, práticas integrativas e negócios do setor de saúde também podem ser enquadradas. O critério é a qualidade e estrutura do conteúdo, não apenas a área técnica.",
  },
  {
    question: "E se meu conteúdo não for aprovado?",
    answer:
      "A Avaliação Acadêmica existe exatamente para isso: identificar o que precisa ser ajustado. Se seu treinamento não estiver pronto, você recebe um parecer detalhado com o caminho para adequação — sem custo e sem compromisso.",
  },
  {
    question: "Quanto tempo leva o processo?",
    answer:
      "O processo de enquadramento varia conforme a complexidade do conteúdo. A Avaliação Acadêmica inicial acontece em até 7 dias após o agendamento. O prazo total para emissão da certificação é definido na própria sessão estratégica.",
  },
  {
    question: "Posso usar o Selo MEC nas minhas redes sociais e materiais de venda?",
    answer:
      "Sim, dentro das diretrizes institucionais. Após o enquadramento, você recebe orientações sobre como utilizar o Selo MEC nos seus materiais de marketing, aumentando a autoridade da sua marca pessoal e do seu produto.",
  },
];

const differentials = [
  {
    number: "01",
    title: "Funis Validados com I.A.",
    description:
      "Estratégias de captação e conversão desenvolvidas com Inteligência Artificial, testadas e validadas especificamente para o mercado de saúde. Menos tráfego desperdiçado, mais leads qualificados.",
  },
  {
    number: "02",
    title: "Treinamento de Closers",
    description:
      "Equipe comercial especializada em vender para profissionais da saúde. Conhecemos as objeções, o vocabulário e a jornada de decisão do seu público — o que transforma conversas em contratos.",
  },
  {
    number: "03",
    title: "Maior Modelo de Negócios Digitais de 2026",
    description:
      "A Aliança FABRANI Saúde foi validada como o modelo de negócios digitais mais completo para o setor de saúde em 2026 — unindo certificação MEC, tecnologia e estratégia comercial.",
  },
];

const stats = [
  { label: "ANOS DE MERCADO", value: "20+" },
  { label: "PROJETOS VALIDADOS", value: "150" },
  { label: "ALUNOS FORMADOS", value: "+100K" },
  { label: "PROFESSORES DOUTORES", value: "500+" },
];

const profiles = [
  "Médicos e especialistas com protocolos clínicos",
  "Dentistas com cursos e treinamentos práticos",
  "Psicólogos e terapeutas com mentorias",
  "Nutricionistas com programas de saúde",
  "Fisioterapeutas com métodos exclusivos",
  "Gestores de clínicas e consultórios",
  "Profissionais de medicina integrativa",
  "Coaches de saúde e bem-estar certificados",
];

export default function MECSaude() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Esconder widget flutuante nesta página
  useEffect(() => {
    const hideWidget = () => {
      const floatingBtn = document.getElementById("click-plug-to-support");
      if (floatingBtn) (floatingBtn as HTMLElement).style.display = "none";
      const allElements = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], [id*="plug-to-support"], [class*="whatsapp-float"]'
      );
      allElements.forEach((el) => ((el as HTMLElement).style.display = "none"));
    };
    hideWidget();
    const t1 = setTimeout(hideWidget, 500);
    const t2 = setTimeout(hideWidget, 1500);
    const t3 = setTimeout(hideWidget, 3000);
    const observer = new MutationObserver(hideWidget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>
      <SEO
        title="Aliança para Profissionais da Saúde | Certificação MEC | FABRANI"
        description="Transforme seu treinamento, mentoria ou evento de saúde em Extensão Universitária com certificação MEC. Funis com IA, treinamento de closers e o maior modelo de negócios digitais de 2026."
      />

      {/* ─── TOPO INSTITUCIONAL ─── */}
      <div className="border-b border-gray-100 py-3 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">FABRANI · Faculdade Brasileira de Negócios Inovadores</span>
          <span className="hidden md:flex items-center gap-2 text-xs text-gray-400 font-light">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Vagas limitadas — Avaliação Gratuita
          </span>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="pt-16 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 border border-red-200 bg-red-50 text-red-700 text-xs font-bold px-5 py-2 tracking-widest uppercase rounded-none">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            PROJETO ALIANÇA · FABRANI SAÚDE 2026
          </span>
        </div>

        {/* Headline principal */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1 className="text-5xl md:text-7xl font-black text-black leading-[1.0] tracking-tight mb-2">
            PROJETO
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-red-600 leading-tight tracking-tight mb-4">
            Aliança para Profissionais da Saúde
          </h2>
          <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed mb-2 tracking-wide">
            Certificação MEC, Pós Graduação, Cursos,
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed mb-10 tracking-wide">
            Mentorias e Eventos.
          </p>

          {/* Três pilares em destaque */}
          <div className="grid md:grid-cols-3 gap-0 border border-black mb-12">
            <div className="border-b md:border-b-0 md:border-r border-black p-6 text-center">
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Pilar 01</p>
              <p className="text-lg font-black text-black">Funis Validados com I.A</p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-black p-6 text-center">
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Pilar 02</p>
              <p className="text-lg font-black text-black">Treinamento de Closers</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Pilar 03</p>
              <p className="text-lg font-black text-black">Maior Modelo de Negócios Digitais de 2026</p>
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Existe um <strong className="text-black font-bold">Atalho Institucional</strong> que transforma seu protocolo, mentoria ou treinamento de saúde em uma{" "}
            <strong className="text-black font-bold">Extensão Universitária com certificação validada pelo MEC</strong>. Quando isso acontece, você deixa de competir como infoproduto. Você passa a operar com{" "}
            <span className="text-red-600 font-bold">Reconhecimento Institucional</span>.
          </p>

          {/* CTA principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-7 text-base tracking-widest uppercase rounded-none shadow-lg hover:shadow-red-200 transition-all"
              onClick={openModal}
            >
              AGENDAR AVALIAÇÃO GRATUITA
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-4 font-light tracking-wide">
            Avaliação 100% Gratuita · Sem Compromisso · Dados Protegidos pela LGPD
          </p>
        </div>
      </section>

      {/* ─── DIVISOR ELEGANTE ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mx-8 md:mx-16"></div>

      {/* ─── PROBLEMA ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">O DIAGNÓSTICO</p>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              Você tem o conhecimento.<br />
              <span className="text-red-600">O mercado ainda não reconhece isso.</span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
              Profissionais da saúde com décadas de experiência clínica, protocolos exclusivos e resultados comprovados — ainda assim enfrentam resistência ao vender seus treinamentos.
            </p>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              O problema não é a qualidade do seu conteúdo. É o <strong className="text-black">enquadramento</strong>. Sem validação institucional, qualquer treinamento — por mais robusto que seja — compete no mesmo nível de um infoproduto comum.
            </p>
          </div>
          <div className="space-y-0 border border-gray-200">
            {[
              "Mais esforço para justificar o preço do seu curso",
              "Comparação com concorrentes sem sua expertise",
              "Desconto como única saída para fechar vendas",
              "Menor margem mesmo com conteúdo superior",
              "Dificuldade de escalar sem perder credibilidade",
              "Audiência que questiona a validade do certificado",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 border-b border-gray-100 last:border-b-0">
                <span className="text-red-600 font-black text-lg mt-0.5">—</span>
                <p className="text-gray-700 font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-black px-10 py-6 tracking-widest uppercase rounded-none transition-all"
            onClick={openModal}
          >
            QUERO MUDAR DE CATEGORIA
          </Button>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100 mx-8 md:mx-16"></div>

      {/* ─── PARA QUEM É ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">ELEGIBILIDADE</p>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Para Quem é o <span className="text-red-600">Projeto Aliança</span>
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Profissionais da saúde que já possuem conhecimento estruturado e querem elevar seu posicionamento ao nível institucional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-gray-200">
          {profiles.map((profile, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-6 ${
                i % 2 === 0 ? "md:border-r" : ""
              } border-b border-gray-100 last:border-b-0`}
            >
              <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-gray-800 font-medium">{profile}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mx-8 md:mx-16"></div>

      {/* ─── DIFERENCIAIS ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">OS TRÊS PILARES</p>
          <h2 className="text-4xl md:text-5xl font-black text-black">
            O que o Projeto Aliança<br />
            <span className="text-red-600">entrega na prática</span>
          </h2>
        </div>

        <div className="space-y-0">
          {differentials.map((item, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[120px_1fr] gap-0 border border-b-0 last:border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-5xl font-black text-red-600">{item.number}</span>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-black mb-3">{item.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">{item.description}</p>
              </div>
            </div>
          ))}
          <div className="border border-gray-200"></div>
        </div>

        <div className="text-center mt-14">
          <Button
            size="lg"
            className="bg-black hover:bg-red-600 text-white font-black px-12 py-7 text-base tracking-widest uppercase rounded-none transition-all duration-300"
            onClick={openModal}
          >
            QUERO ACESSAR O PROJETO ALIANÇA
          </Button>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100 mx-8 md:mx-16"></div>

      {/* ─── STATS ─── */}
      <section className="py-20 px-4 md:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] text-red-400 uppercase mb-4">NÚMEROS DA FABRANI</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              A Instituição por trás do Projeto Aliança
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-800">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`p-10 text-center ${i < 3 ? "border-b md:border-b-0 md:border-r" : ""} border-gray-800`}
              >
                <p className="text-5xl md:text-6xl font-black text-red-500 mb-3">{stat.value}</p>
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100"></div>

      {/* ─── SOBRE ELIAS ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-6">QUEM VAI TE ATENDER</p>
            <h2 className="text-4xl font-black text-black mb-2">Elias Evangelista</h2>
            <p className="text-red-600 font-bold text-lg mb-8 tracking-wide">Founder & Diretor · FABRANI</p>

            <p className="text-gray-600 font-light leading-relaxed mb-8 text-lg">
              Com 24 anos de experiência em modelos de negócios físicos e digitais, Elias Evangelista é o arquiteto por trás das maiores estruturas de certificação MEC do mercado digital brasileiro. Não é coach. Não é guru. É quem valida o mercado.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-black text-black mb-4 text-sm tracking-widest uppercase">Experiência</h4>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> 24 anos em Modelos de Negócios</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> Mercado Digital desde 2009</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> Advogado há 20 anos</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> Contabilista há 24 anos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-black mb-4 text-sm tracking-widest uppercase">Formação</h4>
                <ul className="space-y-2 text-gray-600 font-light text-sm">
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> Mestrado em Direito</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> MBA em Modelo de Negócios</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">—</span> Especialista em Regulação MEC</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0 border border-gray-200">
              <div className="p-6 border-r border-gray-200 text-center">
                <p className="text-4xl font-black text-red-600 mb-1">150</p>
                <p className="text-xs text-gray-500 font-light uppercase tracking-widest">Projetos Validados em 2025</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-4xl font-black text-red-600 mb-1">+100k</p>
                <p className="text-xs text-gray-500 font-light uppercase tracking-widest">Alunos Treinados</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-red-200 rounded-none pointer-events-none"></div>
            <img
              src={IMAGES.elias}
              alt="Elias Evangelista"
              className="w-full object-cover relative z-10"
            />
          </div>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mx-8 md:mx-16"></div>

      {/* ─── OFERTA ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">A OFERTA</p>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            A Sessão Estratégica que<br />
            <span className="text-red-600">define o futuro do seu negócio de saúde</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-gray-200 mb-12">
          <div className="p-10 border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="text-xl font-black text-black mb-6">O que acontece na sessão:</h3>
            <ul className="space-y-4">
              {[
                "Análise do seu treinamento sob critérios acadêmicos MEC",
                "Identificação do melhor enquadramento para seu conteúdo",
                "Avaliação do potencial de mercado com certificação institucional",
                "Diagnóstico do seu funil atual e oportunidades com IA",
                "Plano de ação objetivo para implementação",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 bg-red-600 text-white">
            <h3 className="text-xl font-black mb-6">Ao final da sessão, você terá:</h3>
            <ul className="space-y-4">
              {[
                "Clareza se seu treinamento pode receber Chancela MEC",
                "O que precisa ser ajustado, se necessário",
                "O caminho completo para implementação",
                "Estratégia de funil com IA para o mercado de saúde",
                "Acesso ao Projeto Aliança FABRANI Saúde",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-10 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-red-600 mb-2">GRATUITA</p>
              <p className="text-sm text-gray-500 font-light uppercase tracking-widest">Avaliação Acadêmica</p>
            </div>
            <div className="border-x border-gray-200">
              <p className="text-4xl font-black text-black mb-2">60 MIN</p>
              <p className="text-sm text-gray-500 font-light uppercase tracking-widest">Sessão Estratégica</p>
            </div>
            <div>
              <p className="text-4xl font-black text-red-600 mb-2">10</p>
              <p className="text-sm text-gray-500 font-light uppercase tracking-widest">Vagas com Diretor</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 font-light mb-6 text-sm">
            As 10 primeiras aplicações contam com participação direta do Diretor da Faculdade.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-black px-14 py-7 text-base tracking-widest uppercase rounded-none shadow-lg hover:shadow-red-200 transition-all"
            onClick={openModal}
          >
            GARANTIR MINHA VAGA
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-xs text-gray-400 mt-4 font-light">Avaliação 100% Gratuita · Sem Compromisso</p>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100 mx-8 md:mx-16"></div>

      {/* ─── FORMULÁRIO INLINE ─── */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">AGENDAMENTO</p>
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Agende Sua Sessão Estratégica
          </h2>
          <p className="text-gray-500 font-light">Preencha abaixo para garantir sua vaga no Projeto Aliança FABRANI Saúde</p>
        </div>
        <div className="max-w-2xl mx-auto border border-gray-200 p-2">
          <GHLForm height={465} />
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100 mx-8 md:mx-16"></div>

      {/* ─── FAQ ─── */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-red-600 uppercase mb-4">DÚVIDAS</p>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-500 font-light">Tudo que você precisa saber sobre o Projeto Aliança FABRANI Saúde</p>
        </div>

        <div className="space-y-0">
          {faqItems.map((item, idx) => (
            <div key={idx} className="border border-b-0 last:border-b border-gray-200">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-base md:text-lg font-bold text-black pr-4">{item.question}</h3>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-600 font-light leading-relaxed pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
          <div className="border border-gray-200"></div>
        </div>
      </section>

      {/* ─── DIVISOR ─── */}
      <div className="h-px bg-gray-100"></div>

      {/* ─── CTA FINAL ─── */}
      <section className="py-24 px-4 md:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-red-400 uppercase mb-6">ÚLTIMA CHAMADA</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Seu conhecimento clínico<br />
            <span className="text-red-500">merece reconhecimento institucional.</span>
          </h2>
          <p className="text-lg text-gray-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Cada dia sem certificação MEC é um dia competindo como infoproduto comum. Enquanto você espera, outros profissionais da saúde estão mudando de categoria.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-black px-14 py-7 text-base tracking-widest uppercase rounded-none shadow-lg shadow-red-900/30 transition-all"
            onClick={openModal}
          >
            AGENDAR AGORA — É GRATUITO
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-xs text-gray-600 mt-4 font-light">Avaliação 100% Gratuita · Vagas Limitadas</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black border-t border-gray-900 text-white py-14 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-10">
            <div>
              <h3 className="text-xl font-black mb-3 tracking-widest">FABRANI</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Codificando o Futuro da Educação. A primeira faculdade 100% focada em Inteligência Artificial do Brasil.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-widest uppercase text-gray-400">Contato</h4>
              <p className="text-gray-500 font-light text-sm mb-1">Segunda à Sexta — 08:30 às 17:30</p>
              <p className="text-gray-500 font-light text-sm">contato@fabrani.com.br</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-widest uppercase text-gray-400">Reconhecimento</h4>
              <p className="text-gray-500 font-light text-sm">Instituição credenciada com nota máxima no MEC.</p>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 text-center">
            <p className="text-gray-600 font-light text-xs tracking-wide">
              © 2026 Faculdade FABRANI · Todos os direitos reservados · FABRANI: Codificando o Futuro da Educação
            </p>
          </div>
        </div>
      </footer>

      {/* ─── MODAL GHL GLOBAL ─── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white w-full max-w-xl shadow-2xl overflow-hidden relative">
            {/* Header do modal */}
            <div className="bg-black text-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-light text-gray-400 uppercase tracking-[0.2em] mb-1">
                  Projeto Aliança · FABRANI Saúde
                </p>
                <h3 className="text-lg font-black tracking-tight">Agende sua Avaliação Acadêmica</h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-white transition-colors p-1 ml-4"
                aria-label="Fechar formulário"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Formulário GHL */}
            <div className="bg-white overflow-y-auto" style={{ maxHeight: "80vh" }}>
              <GHLForm formId="NIiX8zUL3aiJ65D44Z8J" height={465} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
