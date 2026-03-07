import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Brain, Terminal, Zap, Shield, Users, Target, Rocket, Lock, Award } from "lucide-react";
import CertificateMockup from "@/components/CertificateMockup";
// Imagens movidas para S3
const iaPlusHero = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030990044/CVhAjXry9cXgYyqVqtTxQF/section-starter-pack-red-i4AcVovJiyibvaC9PRrGfb.webp';
const courseLiteracy = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030990044/courseLiteracy.jpg';
const coursePromptEng = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030990044/coursePromptEng.jpg';

export default function FabraniIAPlus() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Hero Section Imersivo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background com Imagem Gerada e Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10"></div>
          <img 
            src={iaPlusHero} 
            alt="Futuristic AI Landscape" 
            className="w-full h-full object-cover opacity-60 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-500 text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            PROGRAMA DE ACELERAÇÃO NACIONAL
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 leading-[0.9]"
          >
            FABRANI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">IA+</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Transforme sua carreira com <strong className="text-white font-bold">Letramento em IA</strong> e <strong className="text-white font-bold">Engenharia de Prompt</strong>.
            <br className="hidden md:block" />
            Dois treinamentos de elite. <span className="text-red-500 font-bold">100% Custeados pela FABRANI.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              size="lg" 
              className="bg-red-500 text-black hover:bg-red-500/80 font-bold text-lg px-12 py-8 rounded-none w-full sm:w-auto shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-1"
            >
              GARANTIR MINHA VAGA <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4 text-red-600" />
              Vagas limitadas para a meta de 1.000 brasileiros
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Cursos (Cards 3D) */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              DUPLA <span className="text-red-600">CERTIFICAÇÃO</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Domine os fundamentos e a prática. Saia do zero e torne-se um gestor capaz de liderar a revolução da IA na sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Letramento em IA */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={courseLiteracy} 
                  alt="AI Literacy" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-red-500 text-black hover:bg-red-500 mb-3 border-none">FUNDAMENTOS APLICADOS</Badge>
                  <h3 className="text-3xl font-bold text-white group-hover:text-red-500 transition-colors">Letramento em IA</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-400 leading-relaxed">
                  Alfabetização em IA sob a ótica de negócios. Aprenda o que pedir, como pedir e como avaliar respostas para tomar decisões responsáveis.
                </p>
                <ul className="space-y-3">
                  {[
                    "Panorama e fundamentos (ML, IA Generativa)",
                    "IA na prática: texto, imagem, código e áudio",
                    "Ética, segurança e LGPD",
                    "Produtividade pessoal e fluxos no-code"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 2: Engenharia de Prompt */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={coursePromptEng} 
                  alt="Prompt Engineering" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-red-600 text-white hover:bg-red-600 mb-3 border-none">GESTÃO E ESTRATÉGIA</Badge>
                  <h3 className="text-3xl font-bold text-white group-hover:text-red-600 transition-colors">Engenharia de Prompt</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-400 leading-relaxed">
                  Lidere o uso estratégico. Desenhe fluxos, padronize prompts, crie bibliotecas reutilizáveis e meça o ROI da IA na sua equipe.
                </p>
                <ul className="space-y-3">
                  {[
                    "Frameworks de prompts e guias de estilo",
                    "Orquestração multi-etapas e automação",
                    "Criação de bibliotecas por área (Mkt, RH, Dev)",
                    "Gestão da adoção e mensuração de impacto"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Certificado (Destaque Visual) */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-red-600/5 opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                PROVA DE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">EXCELÊNCIA</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Não é apenas um curso. É uma <strong className="text-white">Certificação de Extensão Universitária</strong> emitida por uma faculdade Nota Máxima no MEC.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Validação Digital</h4>
                    <p className="text-sm text-gray-400">Código único de verificação para autenticidade global.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Reconhecimento de Mercado</h4>
                    <p className="text-sm text-gray-400">Currículo alinhado com as demandas das Big Techs e startups.</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-black mt-4">
                VERIFICAR REGULAMENTO
              </Button>
            </div>

            <div className="lg:w-1/2 w-full">
              <CertificateMockup />
            </div>

          </div>
        </div>
      </section>

      {/* Trilha Prática (Timeline) */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SUA JORNADA DE EVOLUÇÃO</h2>
            <p className="text-gray-400">Do diagnóstico inicial ao portfólio profissional.</p>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 space-y-12 md:space-y-0">
            {[
              { title: "Diagnóstico de Partida", desc: "Teste de maturidade em IA e mapeamento de oportunidades.", icon: Zap },
              { title: "Laboratório de Produtividade", desc: "Acesso a templates prontos: e-mails, briefs, planos.", icon: Rocket },
              { title: "Projeto: Kit de Prompts", desc: "Crie e versione 10-20 prompts úteis para seu trabalho real.", icon: Terminal },
              { title: "Bootcamp de Engenharia", desc: "Imersão em frameworks, personas e critérios de aceitação.", icon: Brain },
              { title: "Avaliação Final", desc: "Apresentação do portfólio para validação da certificação.", icon: Award }
            ].map((step, index) => (
              <div key={index} className={`md:flex items-center justify-between gap-8 group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                
                <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-red-500 group-hover:bg-red-500 transition-colors z-10"></div>
                
                <div className="md:w-5/12 pl-8 md:pl-0">
                  <div className={`p-6 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-red-500/30 transition-all ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <step.icon className="w-5 h-5 text-red-500" />
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 blur-3xl opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
            O FUTURO NÃO ESPERA.
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Junte-se aos 1.000 brasileiros que liderarão a nova economia. <br/>
            <span className="text-red-500 font-bold">Investimento Zero. Retorno Infinito.</span>
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200 font-bold text-xl px-16 py-8 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
          >
            INSCREVER-SE AGORA
          </Button>
        </div>
      </section>

    </div>
  );
}
