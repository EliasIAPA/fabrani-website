import { motion } from "framer-motion";
import { ShieldCheck, Award, QrCode } from "lucide-react";
import certificateBg from '/images/certificate-mockup-bg.jpg?url';

export default function CertificateMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000 group">
      {/* Efeito de brilho de fundo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse-slow"></div>
      
      {/* Container do Certificado com efeito 3D */}
      <motion.div 
        initial={{ rotateX: 5, rotateY: 0 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl aspect-[1.414/1]"
      >
        {/* Imagem de Fundo Gerada */}
        <div className="absolute inset-0 z-0">
          <img 
            src={certificateBg} 
            alt="Certificate Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80"></div>
        </div>

        {/* Conteúdo do Certificado */}
        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-center font-serif">
          
          {/* Cabeçalho */}
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-neon-cyan/50 flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Award className="w-10 h-10 text-neon-cyan" />
              </div>
            </div>
            <h2 className="text-xs md:text-sm tracking-[0.3em] text-neon-cyan uppercase font-sans">Certificado de Extensão Universitária</h2>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">FABRANI</h1>
            <p className="text-sm text-gray-400 font-sans">Faculdade Brasileira de Negócios Inovadores</p>
          </div>

          {/* Corpo */}
          <div className="space-y-6 my-8">
            <p className="text-gray-300 text-sm md:text-base italic">Concede a</p>
            <div className="relative inline-block">
              <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 font-display py-2 border-b border-white/20 px-8">
                NOME DO PARTICIPANTE
              </h3>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">CPF: XXX.XXX.XXX-XX</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-300 text-sm md:text-base">a Dupla Certificação em:</p>
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="px-4 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-bold text-sm md:text-lg shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  Letramento em Inteligência Artificial
                </span>
                <span className="px-4 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-bold text-sm md:text-lg shadow-[0_0_10px_rgba(189,0,255,0.1)]">
                  Gestor(a) de Engenharia de Prompt
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              por ter cumprido os requisitos acadêmicos e de avaliação estabelecidos, com carga horária total de <span className="text-white font-bold">60 horas</span>.
            </p>
          </div>

          {/* Rodapé */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-auto pt-8 border-t border-white/10">
            <div className="text-left space-y-1">
              <p className="text-[10px] text-gray-500 font-mono">Código de Verificação:</p>
              <p className="text-xs text-neon-cyan font-mono tracking-widest">FAB-2026-IA-XXXX</p>
              <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                Autenticidade verificada via Blockchain
              </div>
            </div>

            <div className="flex gap-8">
              <div className="text-center">
                <div className="w-32 h-10 border-b border-gray-600 mb-1"></div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Direção Acadêmica</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-10 border-b border-gray-600 mb-1"></div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Coordenação</p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white p-1 rounded">
                <QrCode className="w-12 h-12 text-black" />
              </div>
            </div>
          </div>

          {/* Selo Holográfico */}
          <div className="absolute bottom-8 right-8 md:right-24 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-500/50 flex items-center justify-center backdrop-blur-sm animate-pulse-slow hidden md:flex">
            <div className="text-[8px] text-yellow-500 font-bold text-center leading-tight rotate-[-15deg]">
              SELO DE<br/>EXCELÊNCIA<br/>MEC 5
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
