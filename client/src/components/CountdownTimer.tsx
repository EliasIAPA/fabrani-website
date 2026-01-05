import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 horas em segundos

  useEffect(() => {
    // Tenta recuperar o tempo salvo no localStorage para persistência durante a navegação
    const savedEndTime = localStorage.getItem('fabrani_offer_end_time');
    const now = Date.now();

    if (savedEndTime) {
      const remaining = Math.floor((parseInt(savedEndTime) - now) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        // Se o tempo acabou, reinicia o ciclo de 48h
        resetTimer();
      }
    } else {
      // Se não há tempo salvo, inicia um novo ciclo
      resetTimer();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          resetTimer();
          return 48 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetTimer = () => {
    const now = Date.now();
    const duration = 48 * 60 * 60 * 1000; // 48h em ms
    const endTime = now + duration;
    localStorage.setItem('fabrani_offer_end_time', endTime.toString());
    setTimeLeft(48 * 60 * 60);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="w-full bg-gradient-to-r from-red-900/80 via-red-600/80 to-red-900/80 backdrop-blur-sm border-b border-red-500/30 py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 animate-in slide-in-from-top duration-500 relative z-[60]">
      <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs sm:text-sm animate-pulse">
        <Clock className="w-4 h-4" />
        <span>Oferta Encerra em:</span>
      </div>
      
      <div className="flex items-center gap-2 font-mono text-white font-black text-lg sm:text-xl">
        <div className="bg-black/40 px-2 py-1 rounded border border-white/10 min-w-[40px] text-center">
          {time.h}
        </div>
        <span className="text-red-300">:</span>
        <div className="bg-black/40 px-2 py-1 rounded border border-white/10 min-w-[40px] text-center">
          {time.m}
        </div>
        <span className="text-red-300">:</span>
        <div className="bg-black/40 px-2 py-1 rounded border border-white/10 min-w-[40px] text-center text-red-400">
          {time.s}
        </div>
      </div>
      
      <div className="hidden sm:block text-xs text-red-200 font-medium">
        Garanta sua vaga com bônus exclusivos
      </div>
    </div>
  );
}
