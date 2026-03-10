import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Award, TrendingUp, Shield, Users, GraduationCap, Briefcase, Scale, BookOpen, Clock, MapPin, Star } from "lucide-react";
import { SEO } from "@/components/SEO";

const WHATSAPP_LINK = "https://wa.me/5516997117597?text=Ol%C3%A1!%20Quero%20agendar%20minha%20Avalia%C3%A7%C3%A3o%20Acad%C3%AAmica%20FABRANI";

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
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium text-base md:text-lg pr-4">{item.question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-neon-purple flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neon-cyan flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-5 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function MEC() {
  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <SEO
        title="Consultoria MEC | FABRANI - Extensão Universitária"
        description="Transforme seu curso em Extensão Universitária com certificação validada por faculdade reconhecida pelo MEC. Avaliação Acadêmica gratuita."
        keywords="Consultoria MEC, Extensão Universitária, Certificação MEC, FABRANI, Infoproduto, Educação Formal"
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center -mt-24 pt-44 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,50,50,0.08),transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-sm font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple" />
            </span>
            Para quem já vende cursos, mentorias ou treinamentos
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
            Seu curso pode continuar competindo como infoproduto...{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              ou entrar na Educação Formal.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Existe um Atalho Institucional que transforma seu treinamento em uma{" "}
            <strong className="text-white">
              Extensão Universitária com certificação validada por faculdade reconhecida pelo MEC
            </strong>
            . Quando isso acontece, ele deixa de disputar atenção. Ele passa a operar com Reconhecimento Institucional. O valor percebido sobe. A resistência ao preço diminui. E vender fica mais simples.
          </p>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-7 rounded-none shadow-[0_0_20px_rgba(200,50,50,0.3)] hover:shadow-[0_0_40px_rgba(200,50,50,0.5)] transition-all transform hover:-translate-y-1 mt-8"
            >
              AGENDAR AGORA
            </Button>
          </a>

          <p className="text-sm text-muted-foreground mt-4 font-mono">
            Avaliação Gratuita &bull; Sem Compromisso
          </p>
        </div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12 text-center">
            O mercado não premia apenas quem entrega mais.{" "}
            <span className="text-neon-cyan">Premia quem parece mais seguro.</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Você pode ter um treinamento melhor, mais profundo, mais transformador. Mas antes da compra, o aluno não sabe disso. Ele enxerga apenas:
            </p>

            <div className="border-l-4 border-neon-cyan pl-6 py-4 bg-white/5 rounded-r">
              <p className="text-white font-bold mb-4">Ele enxerga errado, e você paga o preço com:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Mais esforço para justificar preço", "Mais comparação", "Mais desconto", "Menor margem"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Enquanto seu curso opera como infoproduto comum, ele compete como todos. Já na{" "}
              <strong className="text-white">Educação Formal</strong>, a lógica muda.
            </p>
          </div>

          <div className="text-center mt-12">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold text-base px-8 py-6 rounded-none transition-all"
              >
                QUERO MUDAR DE CATEGORIA
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== ENQUADRAMENTO ===== */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0505] relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-center">
            O problema não é o seu curso.{" "}
            <span className="text-neon-purple">É o enquadramento dele.</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
            <p>
              Enquanto seu treinamento opera como infoproduto comum, ele é percebido como substituível. E quando algo é percebido como substituível, três coisas acontecem:
            </p>
            <p>
              Você investe mais em tráfego. Adiciona mais bônus. Argumenta mais para justificar valor. Não porque seu conteúdo é fraco. Mas porque ele ainda não tem{" "}
              <strong className="text-white">validação institucional</strong>.
            </p>
            <p>
              No cenário atual, quem não sobe de categoria... fica preso na disputa por preço. E disputar preço nunca constrói autoridade. Só consome margem.
            </p>
            <p className="text-white font-medium">
              Se nada mudar no enquadramento, o esforço aumenta — mas o lucro não acompanha. E é exatamente aqui que a maioria dos infoprodutores trava.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ATALHO INSTITUCIONAL ===== */}
      <section className="py-24 bg-[#0a0505] relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Existe um <span className="text-neon-cyan">Atalho Institucional.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              E ele separa dois tipos de posicionamento: O informal e o institucional.
            </p>
            <p className="text-neon-purple font-mono text-sm mt-2">
              Não é sobre marketing, tráfego ou audiência... É sobre categoria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* O Diferencial */}
            <div className="bg-white/5 border border-white/10 p-8 hover:border-neon-cyan/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-neon-cyan" />
                <h3 className="text-xl font-bold text-white">O Diferencial</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Quando seu treinamento se torna Extensão Universitária com certificação validada pelo MEC, ele deixa de operar como produto digital. Ele passa a integrar a Educação Formal. E Educação Formal não compete por preço. Compete por legitimidade.
              </p>
            </div>

            {/* O Fechamento */}
            <div className="bg-white/5 border border-white/10 p-8 hover:border-neon-purple/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-neon-purple" />
                <h3 className="text-xl font-bold text-white">O Fechamento</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Isso muda a decisão antes da Venda acontecer. Não é sobre parecer maior. É sobre pertencer a outra categoria. Mas entrar na Educação Formal não é uma decisão comercial. É uma decisão acadêmica. E é exatamente por isso que existe um processo de validação.
              </p>
            </div>

            {/* Explicação Técnica */}
            <div className="bg-white/5 border border-white/10 p-8 hover:border-neon-cyan/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-neon-cyan" />
                <h3 className="text-xl font-bold text-white">Explicação Técnica</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Antes de qualquer enquadramento, seu treinamento passa por Avaliação Acadêmica conduzida por Junta Permanente de Avaliação formada por professores doutores vinculados à Faculdade reconhecida pelo MEC. Não é validação de marketing. É parecer acadêmico.
              </p>
            </div>

            {/* Chamada Final */}
            <div className="bg-white/5 border border-white/10 p-8 hover:border-neon-purple/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-neon-purple" />
                <h3 className="text-xl font-bold text-white">Chamada Final</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A Consultoria Estratégica existe para definir se seu curso já está nesse nível — ou o que falta para chegar lá. Porque o Selo não é um detalhe. É mudança de categoria.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold text-lg px-10 py-7 rounded-none shadow-[0_0_20px_rgba(200,50,50,0.3)] hover:shadow-[0_0_40px_rgba(200,50,50,0.5)] transition-all transform hover:-translate-y-1"
              >
                QUERO ACESSAR
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== PARCEIROS ===== */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Quem Já Confia na <span className="text-neon-cyan">FABRANI</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Grandes nomes do mercado digital que validaram seus projetos com a FABRANI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 overflow-hidden hover:border-neon-cyan/30 transition-all hover:-translate-y-1 group"
              >
                {partner.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white/20" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
                  <p className="text-neon-purple font-semibold text-sm mb-2">{partner.highlight}</p>
                  <p className="text-muted-foreground text-sm">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTATÍSTICAS ===== */}
      <section className="py-16 bg-gradient-to-r from-neon-cyan/10 via-black to-neon-purple/10 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-5xl font-black text-neon-purple mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFÍCIOS MEC ===== */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16 text-center">
            Quando Você Tem Seu Curso ou Mentoria Válido com{" "}
            <span className="text-neon-cyan">Extensão pelo MEC:</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                num: "#1",
                title: "O logótipo do MEC em seu site é um AVALIADOR invisível",
                desc: "Que gera mais autoridade e menos dúvida sobre você ou seu curso",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                num: "#2",
                title: "O logótipo do MEC em seu site reduz o custo do Tráfego",
                desc: "E aumenta brutalmente suas vendas",
                icon: <TrendingUp className="w-8 h-8" />,
              },
              {
                num: "#3",
                title: "O logótipo do MEC em seu site permite uma parceria sólida",
                desc: "Entre você e uma faculdade - cooperação Técnica",
                icon: <GraduationCap className="w-8 h-8" />,
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-6 bg-white/5 border border-white/10 p-6 md:p-8 hover:border-neon-cyan/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <div className="text-neon-purple font-mono text-sm mb-1">{benefit.num}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ELIAS EVANGELISTA ===== */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0505] relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-neon-purple font-mono text-sm tracking-wider uppercase mb-6">
            QUEM VAI TE ATENDER
          </p>

          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-neon-cyan/30 shadow-[0_0_30px_rgba(200,50,50,0.2)] mb-6">
              <img
                src={IMAGES.elias}
                alt="Elias Evangelista - Founder & Diretor FABRANI"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-2">
              Não É Coach. Não É Guru.
              <br />
              <span className="text-neon-cyan">É Quem Valida o Mercado.</span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-10 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">Elias Evangelista</h3>
              <p className="text-neon-purple font-semibold">Founder & Diretor FABRANI</p>
            </div>

            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
              Com 24 anos de experiência em modelos de negócios físicos e digitais, Elias Evangelista não apenas ensina — ele constrói as estruturas que sustentam os maiores players do mercado.
            </p>

            <div className="grid md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-neon-cyan" /> Experiência
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 24 anos em Modelos de Negócios</li>
                  <li>• Mercado Digital desde 2009</li>
                  <li>• Advogado há 20 anos</li>
                  <li>• Contabilista há 24 anos</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-neon-cyan" /> Formação
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Mestrado em Direito</li>
                  <li>• MBA em Modelo de Negócios</li>
                  <li>• Especialista em Regulação MEC</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-neon-purple" /> Track Record
                </h4>
                <div className="text-3xl font-black text-neon-purple">150</div>
                <p className="text-sm text-muted-foreground">Projetos Validados em 2025</p>
                <div className="text-3xl font-black text-neon-purple mt-2">+100k</div>
                <p className="text-sm text-muted-foreground">Alunos Treinados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OFERTA ===== */}
      <section className="py-24 bg-[#0a0505] relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              A Oferta da <span className="text-neon-cyan">Consultoria Estratégica</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A Avaliação que define se seu treinamento pode receber a Chancela do MEC.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-10 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Uma reunião estratégica de 60 minutos com um Consultor da FABRANI.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Durante essa sessão, seu treinamento é analisado sob os critérios acadêmicos utilizados para estruturar Extensões Universitárias reconhecidas pelo MEC.
            </p>
            <p className="text-white font-medium mb-4">Ao final, você terá uma definição objetiva:</p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0" />
                Se já pode ser enquadrado na Educação Formal
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0" />
                O que precisa ser ajustado, se necessário
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0" />
                E o caminho para implementação
              </li>
            </ul>
            <p className="text-neon-cyan font-bold">
              Essa é a etapa obrigatória antes de qualquer certificação.
            </p>
            <p className="text-muted-foreground mt-2">
              É aqui que se decide se o seu curso continua como infoproduto... ou passa a operar com Reconhecimento Institucional.
            </p>
          </div>

          {/* Comparação */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-white font-medium mb-2">Continuar competindo como infoproduto.</p>
              <p className="text-muted-foreground text-sm">
                Disputar preço, explicar valor, convencer a cada venda.
              </p>
            </div>
            <div className="bg-neon-cyan/5 border-2 border-neon-cyan/30 p-6 relative">
              <div className="absolute -top-3 right-4 bg-neon-cyan text-black text-xs font-bold px-3 py-1">
                RECOMENDADO
              </div>
              <p className="text-white font-medium mb-2">Ou entrar oficialmente na Educação Formal.</p>
              <p className="text-muted-foreground text-sm">
                Legitimidade institucional, autoridade acadêmica, margens maiores.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-white font-medium">Seu curso já foi validado pelo mercado.</p>
            <p className="text-muted-foreground">Agora ele pode ser validado institucionalmente.</p>
            <p className="text-muted-foreground">A Avaliação Acadêmica é gratuita.</p>
            <p className="text-muted-foreground text-sm">
              Mas depende da disponibilidade da Junta e dos Consultores.
            </p>
            <p className="text-neon-purple font-semibold text-sm">
              E as 10 primeiras aplicações contam com participação direta do Diretor da Faculdade.
            </p>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-neon-purple text-white hover:bg-neon-purple/80 font-bold text-lg px-10 py-7 rounded-none shadow-[0_0_20px_rgba(200,150,50,0.3)] hover:shadow-[0_0_40px_rgba(200,150,50,0.5)] transition-all transform hover:-translate-y-1 mt-6"
              >
                QUERO MINHA AVALIAÇÃO ACADÊMICA
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Perguntas <span className="text-neon-cyan">Frequentes</span>
            </h2>
            <p className="text-muted-foreground">
              Dúvidas sobre a Avaliação Acadêmica e o processo de certificação
            </p>
          </div>

          <div className="border-t border-white/10">
            {faqItems.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER SIMPLES ===== */}
      <footer className="py-12 bg-[#050505] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">FABRANI</h3>
              <p className="text-muted-foreground text-sm">
                Codificando o Futuro da Educação. Uma instituição focada em formar a próxima geração de líderes na era da Inteligência Artificial.
              </p>
            </div>
            <div>
              <h4 className="text-neon-cyan font-bold mb-3">Contato</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Segunda à Sexta — 08:30 - 17:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Av. Paulista, 1000 — São Paulo - SP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3 py-1 rounded text-xs font-bold text-white flex items-center gap-2">
                <span className="text-green-500">BR</span> MEC
              </div>
              <span className="text-xs text-muted-foreground">
                Instituição credenciada com nota máxima no MEC.
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Faculdade FABRANI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
