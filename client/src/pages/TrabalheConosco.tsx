import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Users, Zap, Eye, Share2, ArrowRight, Upload, Video, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Vagas conectadas à rede neural
const jobs = [
  {
    id: 'gestor-ia',
    title: 'Gestor de IA',
    icon: Brain,
    description: 'Lidere a revolução. Você será o cérebro por trás das estratégias que integram inteligência artificial em todos os níveis da instituição.',
    requirements: ['Experiência em liderança técnica', 'Visão estratégica de IA', 'Gestão de projetos complexos'],
    color: 'text-neon-cyan border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)]',
    lineColor: '#00f0ff'
  },
  {
    id: 'professores-ia',
    title: 'Professores IA',
    icon: Users,
    description: 'Ensine o futuro. Buscamos mentores capazes de traduzir conceitos complexos de IA para a próxima geração de líderes.',
    requirements: ['Mestrado ou Doutorado', 'Didática inovadora', 'Vivência de mercado'],
    color: 'text-neon-purple border-neon-purple shadow-[0_0_15px_rgba(180,0,255,0.5)]',
    lineColor: '#b400ff'
  },
  {
    id: 'videomaker-ia',
    title: 'VideoMaker e IA',
    icon: Video,
    description: 'Crie realidades. Utilize ferramentas generativas para produzir conteúdo visual que desafia o impossível.',
    requirements: ['Domínio de ferramentas de vídeo', 'Experiência com Runway/Pika/Sora', 'Estética cinematográfica'],
    color: 'text-pink-500 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]',
    lineColor: '#ec4899'
  },
  {
    id: 'copy-ia',
    title: 'Copy e IA',
    icon: Sparkles,
    description: 'Escreva com alma digital. Combine criatividade humana com a escala da IA para criar narrativas persuasivas e emocionantes.',
    requirements: ['Copywriting persuasivo', 'Domínio de LLMs', 'Storytelling'],
    color: 'text-yellow-400 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    lineColor: '#facc15'
  },
  {
    id: 'closer-ia',
    title: 'Closer e IA',
    icon: Zap,
    description: 'Feche com inteligência. Utilize dados e automação para potencializar suas negociações e quebrar recordes de conversão.',
    requirements: ['Experiência em vendas high-ticket', 'Uso de CRM e automação', 'Fome de resultados'],
    color: 'text-green-400 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]',
    lineColor: '#4ade80'
  },
  {
    id: 'coordenador-ia',
    title: 'Coordenador Graduação com IA',
    icon: Cpu,
    description: 'Arquitete o aprendizado. Estruture cursos que preparam os alunos não para o mercado de hoje, mas para o de 2030.',
    requirements: ['Gestão acadêmica', 'Inovação curricular', 'Liderança de corpo docente'],
    color: 'text-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    lineColor: '#3b82f6'
  }
];

// Valores do DNA
const values = [
  { letter: 'I', title: 'Iniciativa', desc: 'Não espere. Crie a oportunidade.', icon: Zap },
  { letter: 'T', title: 'Transparência', desc: 'Fale a verdade. Jogue limpo.', icon: Eye },
  { letter: 'E', title: 'Empatia', desc: 'Ouça para entender. Respeite as diferenças.', icon: Users },
  { letter: 'C', title: 'Colaboração', desc: 'Construa junto. O sucesso é coletivo.', icon: Share2 }
];

export default function TrabalheConosco() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito de partículas de fundo
  useEffect(() => {
    const canvas = document.getElementById('neural-network') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 50; // Reduzido para performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Conexões
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-20">
      {/* Background Neural Network Canvas */}
      <canvas 
        id="neural-network" 
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-10 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-6 border-neon-cyan text-neon-cyan px-4 py-1 text-sm tracking-widest uppercase">
            Carreiras 2026
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">
            VOCÊ É O <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">ELO PERDIDO</span>?
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed px-4">
            Não buscamos funcionários. Buscamos visionários dispostos a codificar o futuro da educação com Inteligência Artificial.
            Se você não tem medo de reescrever as regras, seu lugar é aqui.
          </p>
        </motion.div>
      </section>

      {/* Neural Network Jobs Visualization */}
      <section className="relative z-10 container mx-auto px-4 py-10 min-h-[500px] md:min-h-[700px] flex flex-col items-center justify-center" ref={containerRef}>
        
        {/* Mobile View: Lista Vertical */}
        <div className="md:hidden w-full flex flex-col gap-6 mb-20">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className={`bg-black/80 border-2 ${selectedJob === job.id ? job.color : 'border-gray-800'} transition-all duration-300`}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full bg-black border ${selectedJob === job.id ? job.color : 'border-gray-700'}`}>
                  <job.icon className={`w-6 h-6 ${selectedJob === job.id ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${selectedJob === job.id ? 'text-white' : 'text-gray-300'}`}>{job.title}</h3>
                  <p className="text-xs text-neon-cyan">Toque para ver detalhes</p>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${selectedJob === job.id ? 'rotate-90' : ''}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop View: Rede Neural Radial */}
        <div className="hidden md:block relative w-full max-w-4xl aspect-square md:aspect-[16/9]">
          
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
            <motion.div 
              animate={{ 
                boxShadow: ['0 0 20px rgba(0,240,255,0.2)', '0 0 60px rgba(0,240,255,0.6)', '0 0 20px rgba(0,240,255,0.2)'] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-black border-2 border-neon-cyan flex items-center justify-center relative z-30"
            >
              <img src="/favicon.png" alt="FABRANI" className="w-16 h-16 opacity-80" />
              <div className="absolute inset-0 rounded-full border border-neon-cyan animate-ping opacity-20"></div>
            </motion.div>
          </div>

          {/* Job Nodes & Connections */}
          {jobs.map((job, index) => {
            const angle = (index / jobs.length) * 2 * Math.PI - (Math.PI / 2); // Começar do topo
            const radiusPercent = 35; // Distância do centro em %
            const x = 50 + radiusPercent * Math.cos(angle);
            const y = 50 + radiusPercent * Math.sin(angle);

            return (
              <React.Fragment key={job.id}>
                {/* Connection Line */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2={`${x}%`} 
                    y2={`${y}%`} 
                    stroke={job.lineColor} 
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    strokeDasharray="5,5"
                  />
                  <circle cx={`${x}%`} cy={`${y}%`} r="4" fill={job.lineColor} className="animate-pulse" />
                </svg>

                {/* Node Button */}
                <motion.div
                  className="absolute z-20"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <button
                    onClick={() => setSelectedJob(job.id)}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                    className={`group relative flex flex-col items-center justify-center w-28 h-28 rounded-full bg-black/90 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-110 ${
                      selectedJob === job.id ? job.color : 'border-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <job.icon className={`w-8 h-8 mb-2 transition-colors ${selectedJob === job.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                    <span className={`text-xs font-bold text-center px-2 leading-tight ${selectedJob === job.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {job.title}
                    </span>
                  </button>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Job Details Panel (Shared for Mobile/Desktop) */}
        <AnimatePresence mode="wait">
          {selectedJob && (
            <motion.div
              key={selectedJob}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-0 left-0 w-full md:absolute md:bottom-auto md:top-full md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-50 p-4 md:p-0 md:mt-8"
            >
              <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                <div className={`absolute top-0 left-0 w-1 h-full ${jobs.find(j => j.id === selectedJob)?.color.split(' ')[0].replace('text-', 'bg-')}`}></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 flex flex-wrap items-center gap-3 text-white">
                      {jobs.find(j => j.id === selectedJob)?.title}
                      <Badge className="bg-neon-cyan text-black hover:bg-neon-cyan/80 border-none">Vaga Aberta</Badge>
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                      {jobs.find(j => j.id === selectedJob)?.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Requisitos Essenciais</h4>
                      <div className="flex flex-wrap gap-2">
                        {jobs.find(j => j.id === selectedJob)?.requirements.map((req, i) => (
                          <span key={i} className="px-3 py-1 bg-black/50 rounded-full text-sm text-gray-300 border border-gray-700">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col gap-4 min-w-[280px]">
                    <div className="p-4 bg-black/50 rounded-xl border border-gray-800">
                      <h4 className="text-sm font-bold text-gray-400 mb-3">Processo Seletivo</h4>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="bg-neon-cyan text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                          <span className="text-gray-300">Envie CV + Vídeo (3min)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-neon-purple text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                          <span className="text-gray-300">Entrevista Online</span>
                        </li>
                      </ol>
                    </div>
                    
                    <Button 
                      className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 text-lg group"
                      onClick={() => window.location.href = 'mailto:rh@fabrani.com.br'}
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Aplicar Agora
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white bg-black/20 rounded-full"
                >
                  <XIcon />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* DNA Culture Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">NOSSO <span className="text-neon-cyan">DNA</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Não contratamos apenas habilidades técnicas. Contratamos pessoas que vibram na mesma frequência dos nossos valores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-black border-gray-800 hover:border-neon-cyan transition-colors duration-300 group">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-neon-cyan/10 transition-colors">
                    <value.icon className="w-8 h-8 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                  </div>
                  <h3 className="text-6xl font-black text-gray-800 mb-4 group-hover:text-white transition-colors">
                    {value.letter}
                  </h3>
                  <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-neon-purple/10 border border-neon-purple/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Pronto para o Desafio?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Se você leu até aqui e sentiu um frio na barriga, é um bom sinal. 
            Envie seu material agora e vamos construir o futuro juntos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold px-8 w-full sm:w-auto"
              onClick={() => window.location.href = 'mailto:rh@fabrani.com.br'}
            >
              Enviar CV + Vídeo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-700 hover:bg-gray-800 text-white w-full sm:w-auto"
              onClick={() => window.open('https://wa.me/5516997117597', '_blank')}
            >
              Dúvidas? Fale no WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  )
}
