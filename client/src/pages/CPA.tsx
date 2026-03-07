import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Target, Users, ShieldCheck, BarChart3, FileText, Mail, RefreshCw, Layers, Lightbulb, Activity } from "lucide-react";
import { Link } from "wouter";

export default function CPA() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-red-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-background to-background z-0"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-sm font-mono mb-4">
              <BrainCircuit className="w-4 h-4" />
              <span>COMISSÃO PRÓPRIA DE AVALIAÇÃO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              CPA FABRANI: A INTELIGÊNCIA QUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">AUDITA NOSSA EXCELÊNCIA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Muito além de uma exigência do MEC (SINAES/CONAES), a Comissão Própria de Avaliação é o nosso sistema operacional de melhoria contínua. Aqui, os dados da comunidade acadêmica se transformam em evolução real.
            </p>
          </div>
        </div>
      </section>

      {/* Missão Section */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">O Compromisso com a Qualidade 4.0</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Atuamos como um órgão autônomo e estratégico. Nossa missão é analisar as 10 dimensões do SINAES através de uma lente de inovação, garantindo que a FABRANI não apenas cumpra normas, mas lidere o padrão de ensino superior em IA no Brasil.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-red-500">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-mono text-sm">AUTONOMIA</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <Target className="w-5 h-5" />
                  <span className="font-mono text-sm">ESTRATÉGIA</span>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <BrainCircuit className="w-32 h-32 text-white/10 group-hover:text-red-500/50 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Ciclo de Qualidade 360 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O Ciclo de Qualidade 360°</h2>
            <p className="text-muted-foreground">Nosso algoritmo de melhoria contínua em 6 etapas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Planejamento & Sensibilização",
                desc: "Campanhas digitais de engajamento para preparar a comunidade.",
                icon: Lightbulb
              },
              {
                step: "02",
                title: "Coleta de Dados Inteligente",
                desc: "Instrumentos digitais semestrais e análise de sentimento via IA.",
                icon: Layers
              },
              {
                step: "03",
                title: "Processamento & Análise",
                desc: "Identificação de pontos fortes e gargalos através de analytics avançado.",
                icon: Activity
              },
              {
                step: "04",
                title: "Transparência Total",
                desc: "Divulgação de resultados em murais virtuais e boletins abertos.",
                icon: FileText
              },
              {
                step: "05",
                title: "Ação & Implementação",
                desc: "Planos de melhoria com metas claras e prazos reais de execução.",
                icon: Target
              },
              {
                step: "06",
                title: "Monitoramento Contínuo",
                desc: "Acompanhamento em tempo real da efetividade das mudanças aplicadas.",
                icon: RefreshCw
              }
            ].map((item, index) => (
              <Card key={index} className="bg-black/40 border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-4xl font-bold text-white/5 group-hover:text-red-500/20 transition-colors">{item.step}</span>
                    <item.icon className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-red-500 transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pilares Estratégicos */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Os 4 Pilares Estratégicos</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Agente de Transformação",
                desc: "Não apenas apontamos falhas; arquitetamos soluções. Do suporte acadêmico à atualização da plataforma de IA."
              },
              {
                title: "Cultura de Avaliação",
                desc: "Incentivamos a voz ativa. Participar da CPA é parte da formação cidadã e da responsabilidade institucional."
              },
              {
                title: "Integração Plural",
                desc: "Diálogo entre alunos, mestres, técnicos e sociedade civil. Uma visão 360° da nossa evolução."
              },
              {
                title: "Guardiã da Missão",
                desc: "Zelamos para que cada bit de informação e cada aula estejam alinhados ao propósito de formar líderes exponenciais."
              }
            ].map((pillar, index) => (
              <div key={index} className="space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <span className="font-mono text-red-500 font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-lg">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impactos Reais */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Impactos Reais & Mensuráveis</h2>
              <div className="space-y-6">
                {[
                  "Aprimoramento Acadêmico: Melhoria no design curricular e capacitação em metodologias ativas.",
                  "Infraestrutura Digital: Modernização constante da plataforma de ensino e recursos interativos.",
                  "Conexão Social: Fortalecimento do FABRANI CONECTA e diálogo com a comunidade externa.",
                  "Gestão Eficiente: Otimização de fluxos administrativos via ferramentas digitais de gestão."
                ].map((impact, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]">
                      <BarChart3 className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-muted-foreground">{impact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                Composição da Comissão
              </h3>
              <p className="text-muted-foreground mb-6">
                A CPA é formada por um corpo multidisciplinar e autônomo, com representantes de todos os segmentos:
              </p>
              <ul className="space-y-2 text-sm font-mono text-white/70 mb-8">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Docentes</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Discentes</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Corpo Técnico-Administrativo</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Sociedade Civil</li>
              </ul>
              <p className="text-xs text-white/40 border-t border-white/10 pt-4">
                Mandatos de 2 anos com foco em independência e ética.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Downloads */}
      <section className="py-20 bg-gradient-to-b from-black to-red-600/5">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Sua voz treina nossa evolução</h2>
          <p className="text-muted-foreground mb-8">
            Os ciclos avaliativos ocorrem semestralmente. Fique atento aos comunicados e participe!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            
            
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              "Regulamento da CPA",
              "Relatório de Autoavaliação 2024",
              "Resultados Pesquisa Institucional 2025"
            ].map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-red-500/30 transition-colors cursor-pointer group">
                <FileText className="w-8 h-8 text-white/20 group-hover:text-red-500 transition-colors" />
                <div>
                  <p className="text-sm font-medium group-hover:text-red-500 transition-colors">{doc}</p>
                  <span className="text-xs text-muted-foreground">PDF Download</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-muted-foreground mb-2">Dúvidas ou sugestões sobre a qualidade da FABRANI?</p>
            <a href="mailto:cpa@fabrani.com.br" className="inline-flex items-center gap-2 text-red-500 hover:underline">
              <Mail className="w-4 h-4" />
              cpa@fabrani.com.br
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
