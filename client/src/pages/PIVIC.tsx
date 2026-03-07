import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, Target, Users, BookOpen, Lightbulb, Rocket, GraduationCap, Clock, BrainCircuit, FileText, Mail, Download, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function PIVIC() {
  const objectives = [
    {
      id: 1,
      title: "Gerar Conhecimento Diversificado",
      desc: "Gerar conhecimento por meio da diversidade de projetos de pesquisa focados em tecnologia, gestão e saúde.",
      icon: Lightbulb
    },
    {
      id: 2,
      title: "Promover Interação",
      desc: "Promover interação entre Parceiros, instituições e professores, mentores e profissionais em cooperação técnica.",
      icon: Users
    },
    {
      id: 3,
      title: "Alavancar Produção Científica",
      desc: "Alavancar a produção de pesquisas na instituição.",
      icon: Rocket
    },
    {
      id: 4,
      title: "Expandir Linhas de Pesquisa",
      desc: "Expandir as linhas de pesquisa e o quantitativo de pesquisadores(as) na instituição.",
      icon: Microscope
    },
    {
      id: 5,
      title: "Formar Recursos Humanos",
      desc: "Contribuir para a formação de recursos humanos para a pesquisa.",
      icon: GraduationCap
    },
    {
      id: 6,
      title: "Promover Interação Acadêmica",
      desc: "Possibilitar maior interação entre a graduação e a pós-graduação.",
      icon: BookOpen
    },
    {
      id: 7,
      title: "Qualificar para Pós-Graduação",
      desc: "Qualificar alunos(as) para os programas de pós-graduação.",
      icon: Target
    },
    {
      id: 8,
      title: "Reduzir Tempo de Permanência",
      desc: "Contribuir para reduzir o tempo médio de permanência dos(as) alunos(as) na pós-graduação.",
      icon: Clock
    },
    {
      id: 9,
      title: "Estimular Pesquisadores",
      desc: "Estimular pesquisadores(as) a envolverem estudantes de graduação nas atividades científicas, tecnológicas e artístico-culturais.",
      icon: BrainCircuit
    },
    {
      id: 10,
      title: "Fomentar Pensamento Crítico",
      desc: "Fomentar o desenvolvimento do pensamento crítico e da criatividade, decorrentes das condições criadas pelo confronto direto com os problemas de pesquisa.",
      icon: FileText
    }
  ];

  return (
    <div className="overflow-x-hidden min-h-screen bg-background text-foreground selection:bg-red-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/ia-growth-chart-red-7hfCjfLgTxaJqEBZfDKR3Q.webp" alt="" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/90 to-background z-0"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono mb-4">
              <Microscope className="w-4 h-4" />
              <span>PESQUISA & INOVAÇÃO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              PIVIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">INICIAÇÃO CIENTÍFICA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Programa Institucional de Iniciação Científica Voluntária. Estimulando a pluralidade e diversidade da pesquisa nas diversas áreas do conhecimento da FABRANI.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivo Geral */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Objetivo Geral</h2>
            <p className="text-2xl text-gray-300 font-light leading-relaxed">
              "Estimular a pluralidade e a diversidade da pesquisa, nas diversas áreas do conhecimento, contribuindo para o fortalecimento do desenvolvimento científico e tecnológico da FABRANI."
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos Específicos */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Objetivos Específicos</h2>
            <p className="text-muted-foreground">Nossa missão detalhada em 10 pilares estratégicos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj) => (
              <Card key={obj.id} className="bg-black/40 border-white/10 hover:border-red-500/50 transition-all duration-300 group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-red-500/10 transition-colors">
                    <obj.icon className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-red-500 transition-colors">{obj.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {obj.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato e Edital */}
      <section className="py-20 bg-gradient-to-b from-black to-red-600/5 border-t border-white/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Participe da Pesquisa</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-red-500/30 transition-colors">
              <FileText className="w-12 h-12 text-red-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Documentação</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/5 justify-between group">
                  Edital PIVIC
                  <Download className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                </Button>
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/5 justify-between group">
                  Resolução PIVIC
                  <Download className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                </Button>
              </div>
            </div>

            <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-red-600/30 transition-colors">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Fale Conosco</h3>
              <p className="text-gray-400 mb-6">
                Dúvidas sobre o programa ou submissão de projetos? Nossa equipe de pesquisa está pronta para ajudar.
              </p>
              <a href="mailto:contato@fabrani.com.br" className="inline-flex items-center gap-2 text-red-500 hover:underline text-lg font-medium">
                contato@fabrani.com.br <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/10 inline-block">
            <p className="text-sm text-gray-400">
              "A pesquisa é a base da inovação. No PIVIC, transformamos curiosidade em ciência aplicada."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
