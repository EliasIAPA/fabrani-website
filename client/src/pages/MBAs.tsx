import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Stethoscope, Scale, Megaphone, Target, GraduationCap } from "lucide-react";
import { Link } from "wouter";

const mbas = [
  {
    id: "negocios",
    title: "MBA IA para Negócios",
    headline: "Estratégia Exponencial: transforme sua empresa em AI-First em 6 meses.",
    icon: <Briefcase className="w-10 h-10 text-red-500" />,
    bullets: ["Decisões orientadas por dados", "Automação de ponta a ponta", "Novos fluxos de receita"]
  },
  {
    id: "saude",
    title: "MBA IA para Saúde",
    headline: "Saúde de Precisão: IA para diagnóstico, gestão e cuidado em escala.",
    icon: <Stethoscope className="w-10 h-10 text-red-600" />,
    bullets: ["Redução de erros e custos", "Gestão hospitalar eficiente", "Compliance e ética"]
  },
  {
    id: "juridico",
    title: "MBA IA Jurídico",
    headline: "Jurisprudência Acelerada: do peticionamento à análise de risco em minutos.",
    icon: <Scale className="w-10 h-10 text-white" />,
    bullets: ["Automação de documentos", "Jurimetria avançada", "Análise de risco"]
  },
  {
    id: "marketing",
    title: "MBA IA para Marketing",
    headline: "Escala Infinita: personalização 1:1 e growth orientado por IA.",
    icon: <Megaphone className="w-10 h-10 text-red-500" />,
    bullets: ["Agentes autônomos", "Conteúdo generativo", "Mídia otimizada"]
  },
  {
    id: "closer",
    title: "MBA IA para Formação de Closer",
    headline: "Alto Ticket, Alta Ciência: feche negócios com IA, sinais e dados.",
    icon: <Target className="w-10 h-10 text-red-600" />,
    bullets: ["Qualificação por dados", "Roteiros dinâmicos", "Previsão de fechamento"]
  },
  {
    id: "educacao",
    title: "MBA IA para Educação",
    headline: "Aprendizagem Personalizada em Escala: IA no coração da educação.",
    icon: <GraduationCap className="w-10 h-10 text-white" />,
    bullets: ["Trilhas adaptativas", "Tutores inteligentes", "Analytics de aprendizagem"]
  }
];

export default function MBAs() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/hero-mba-business-dJ6RDouyzkiQnJXWAK8fJe.webp)`}}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge variant="outline" className="border-red-500 text-red-500 mb-4 px-4 py-1">FORMAÇÃO EXECUTIVA</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            MBAs de Aplicação <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Prática</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Formações executivas para aplicar IA no core do negócio com ROI mensurável. Não estudamos o futuro, nós o construímos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mbas.map((mba, index) => (
            <Card key={mba.id} className="bg-white/5 border-white/10 hover:border-red-500/50 transition-all duration-300 group overflow-hidden">
              <CardHeader>
                <div className="mb-4 bg-black/50 w-16 h-16 flex items-center justify-center rounded-full border border-white/10 group-hover:border-red-500/50 transition-colors">
                  {mba.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                  {mba.title}
                </CardTitle>
                <CardDescription className="text-gray-400 mt-2 text-base">
                  {mba.headline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mba.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/mbas/${mba.id}`} className="w-full">
                  <Button className="w-full bg-white text-black hover:bg-red-500 hover:text-white font-bold transition-all">
                    QUERO CONHECER AGORA <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
