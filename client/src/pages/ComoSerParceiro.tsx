import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ComoSerParceiro() {
  return (
    <div className="flex flex-col gap-0 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-10"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
              Como Ser <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                Parceiro FABRANI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Transforme seus cursos em Extensão Universitária com certificação reconhecida pelo MEC
            </p>

            <a href="mailto:contato@fabrani.com.br">
              <Button 
                size="lg" 
                className="bg-red-500 text-black hover:bg-red-500/80 font-bold text-lg px-10 py-8 rounded-none shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-1"
              >
                SOLICITAR PARCERIA <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Credenciamento Section */}
      <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              Credenciamento Oficial no <span className="text-red-500">MEC</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                A FABRANI - Faculdade Brasileira de Negócios Inovadores é uma Instituição de Ensino Superior credenciada pelo Ministério da Educação (MEC), com conceito institucional máximo nas avaliações oficiais.
              </p>

              <p>
                A FABRANI atua nacionalmente como faculdade parceira para certificação de cursos, oferecendo estrutura acadêmica para transformar cursos livres, treinamentos e formações online em Extensão Universitária com certificação válida no Brasil.
              </p>

              <div className="bg-white/5 border border-red-500/20 rounded-lg p-8 mt-8">
                <h3 className="text-2xl font-bold text-white mb-6">Informações de Credenciamento</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span>Ato de credenciamento institucional ativo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span>Situação regulatória verificável no e-MEC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span>Conceito institucional máximo em avaliações</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span>Informações públicas e verificáveis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transforme Seu Curso Section */}
      <section className="py-24 bg-secondary/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              Transforme Seu Curso em <span className="text-red-600">Extensão Universitária</span> Reconhecida
            </h2>

            <p className="text-xl text-muted-foreground mb-12">
              Se você é:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Especialista",
                "Infoprodutor",
                "Empresa de treinamento",
                "Plataforma educacional",
                "Escola corporativa",
                "Desenvolvedor de programas técnicos"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xl text-muted-foreground mb-8">
              A FABRANI pode estruturar seu curso como:
            </p>

            <div className="space-y-4 mb-12">
              {[
                "Extensão Universitária",
                "Curso de Aperfeiçoamento",
                "Formação Complementar Acadêmica"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg border border-red-500/20">
                  <div className="text-2xl font-bold text-red-500 flex-shrink-0">{idx + 1}</div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{item}</h4>
                    <p className="text-muted-foreground mt-1">
                      Com emissão de certificado institucional válido nacionalmente
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-red-600/5 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              Como Funciona a <span className="text-red-500">Parceria</span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  number: "1️⃣",
                  title: "Análise Técnica e Pedagógica",
                  description: "Avaliação do conteúdo programático, carga horária, metodologia e objetivos de aprendizagem."
                },
                {
                  number: "2️⃣",
                  title: "Adequação Acadêmica",
                  description: "Estruturação conforme diretrizes educacionais aplicáveis às atividades de extensão."
                },
                {
                  number: "3️⃣",
                  title: "Vinculação Institucional",
                  description: "O curso passa a integrar o portfólio institucional como programa de extensão."
                },
                {
                  number: "4️⃣",
                  title: "Emissão de Certificação",
                  description: "O certificado é emitido pela FABRANI com identificação institucional, carga horária e assinatura acadêmica conforme as normas vigentes."
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 p-8 bg-white/5 rounded-lg border border-white/10 hover:border-red-500/30 transition-colors">
                  <div className="text-4xl flex-shrink-0">{step.number}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Validade Jurídica Section */}
      <section className="py-24 bg-secondary/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              Validade Jurídica da <span className="text-red-600">Certificação</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground mb-6">
                  Os certificados emitidos pela FABRANI:
                </p>
                <ul className="space-y-3">
                  {[
                    "Possuem validade nacional",
                    "Podem ser utilizados para horas complementares",
                    "Podem ser apresentados para fins curriculares",
                    "São emitidos por IES credenciada no MEC"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-8">
                <h3 className="text-xl font-bold text-white mb-4">Segurança Jurídica</h3>
                <p className="text-muted-foreground">
                  A validade decorre do credenciamento institucional junto ao Ministério da Educação, garantindo reconhecimento legal em todo o território nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Escolher Section */}
      <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              Por Que Escolher a <span className="text-red-500">FABRANI</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Faculdade credenciada no MEC",
                "Conceito institucional máximo",
                "Estrutura acadêmica própria",
                "Processo formal e transparente",
                "Segurança jurídica",
                "Atuação nacional",
                "Modelo escalável para produtores digitais",
                "Suporte acadêmico especializado"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-red-500/30 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem Section */}
      <section className="py-24 bg-secondary/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
              Para Quem é Esta <span className="text-red-600">Parceria</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8">
              A parceria é indicada para quem deseja:
            </p>

            <div className="space-y-4">
              {[
                "Agregar autoridade acadêmica ao seu curso",
                "Aumentar valor percebido",
                "Diferenciar-se no mercado educacional",
                "Oferecer certificação com respaldo institucional",
                "Atuar com segurança regulatória"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-lg border border-red-600/20">
                  <div className="text-2xl font-bold text-red-600 flex-shrink-0">✓</div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Pronto para Transformar Seu Curso?
            </h2>

            <p className="text-xl text-muted-foreground mb-12">
              Entre em contato com a equipe acadêmica da FABRANI para avaliação técnica e discussão sobre sua parceria.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="mailto:contato@fabrani.com.br">
                <Button 
                  size="lg" 
                  className="bg-red-500 text-black hover:bg-red-500/80 font-bold text-lg px-10 py-8 rounded-none shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-1"
                >
                  SOLICITAR PARCERIA <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
              <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600/10 font-bold text-lg px-10 py-8 rounded-none"
                >
                  CONVERSAR NO WHATSAPP
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
