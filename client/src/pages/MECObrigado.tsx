import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Mail, Monitor } from "lucide-react";

export default function MECObrigado() {
  // Esconder o widget flutuante Rosana.io (SOPHIA AI) nesta página
  useEffect(() => {
    const hideWidget = () => {
      const floatingBtn = document.getElementById('click-plug-to-support');
      if (floatingBtn) {
        (floatingBtn as HTMLElement).style.display = 'none';
      }
      const allElements = document.querySelectorAll('[id*="rosana"], [class*="rosana"], [id*="plug-to-support"]');
      allElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
      const widgetContainer = floatingBtn?.parentElement;
      if (widgetContainer && widgetContainer.id !== 'root') {
        (widgetContainer as HTMLElement).style.display = 'none';
      }
    };

    hideWidget();
    const timer1 = setTimeout(hideWidget, 1000);
    const timer2 = setTimeout(hideWidget, 3000);
    const timer3 = setTimeout(hideWidget, 5000);

    const observer = new MutationObserver(() => {
      hideWidget();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
      const floatingBtn = document.getElementById('click-plug-to-support');
      if (floatingBtn) {
        (floatingBtn as HTMLElement).style.display = '';
      }
      const widgetContainer = floatingBtn?.parentElement;
      if (widgetContainer && widgetContainer.id !== 'root') {
        (widgetContainer as HTMLElement).style.display = '';
      }
    };
  }, []);

  // Meta Pixel (2419105295112897) - PageView + Lead + Schedule
  useEffect(() => {
    // Evitar duplicação se já foi carregado
    if ((window as any).fbq) {
      // Pixel já inicializado (veio da /mec ou /mec/agenda2), disparar PageView + Schedule
      (window as any).fbq('track', 'PageView');
      (window as any).fbq('track', 'Schedule');
      return;
    }

    // Inicializar fbq
    const f = window as any;
    const b = document;
    let e: any, n: any;
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    e = b.createElement('script');
    e.async = true;
    e.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(e, s);

    // Inicializar com os Pixel IDs e disparar PageView + Schedule
    (window as any).fbq('init', '1101040821159474');
    (window as any).fbq('init', '2419105295112897');
    (window as any).fbq('track', 'PageView');
    (window as any).fbq('track', 'Schedule');

    // Adicionar noscript fallback
    const noscript = b.createElement('noscript');
    noscript.id = 'fb-pixel-noscript-obrigado';
    const img = b.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=1101040821159474&ev=PageView&noscript=1';
    noscript.appendChild(img);
    b.body.appendChild(noscript);

    const noscript2 = b.createElement('noscript');
    noscript2.id = 'fb-pixel-noscript2-obrigado';
    const img2 = b.createElement('img');
    img2.height = 1;
    img2.width = 1;
    img2.style.display = 'none';
    img2.src = 'https://www.facebook.com/tr?id=2419105295112897&ev=PageView&noscript=1';
    noscript2.appendChild(img2);
    b.body.appendChild(noscript2);

    return () => {
      const ns1 = document.getElementById('fb-pixel-noscript-obrigado');
      const ns2 = document.getElementById('fb-pixel-noscript2-obrigado');
      if (ns1?.parentNode) ns1.parentNode.removeChild(ns1);
      if (ns2?.parentNode) ns2.parentNode.removeChild(ns2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SEO
        title="Agendamento Confirmado | FABRANI - Consultoria MEC"
        description="Seu agendamento para a Avaliação Acadêmica está quase confirmado. Siga os passos para garantir sua participação."
      />

      {/* Background sutil */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)]" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        
        {/* Logo FABRANI */}
        <div className="mb-12">
          <img 
            src="/images/logo-fabrani.png" 
            alt="FABRANI" 
            className="h-10 md:h-12 opacity-80"
          />
        </div>

        {/* Ícone de sucesso */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl scale-150" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-red-500 flex items-center justify-center bg-black">
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl md:text-5xl font-bold text-center tracking-tight mb-4 max-w-3xl leading-tight">
          Parabéns, seu agendamento está quase confirmado...
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-4">
          Siga os passos abaixo para garantir sua participação na Avaliação Acadêmica.
        </p>

        {/* Aviso do e-mail */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-sm font-medium mb-16">
          <Mail className="w-4 h-4" />
          Os detalhes da reunião foram enviados para o seu e-mail.
        </div>

        {/* Texto "Para confirmar sua presença:" */}
        <p className="text-lg md:text-xl text-white font-semibold text-center mb-10">
          Para confirmar sua presença:
        </p>

        {/* Cards dos passos */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full mb-16">
          
          {/* Passo 1 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur-sm" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-2xl p-8 md:p-10 h-full">
              {/* Número do passo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  1
                </div>
                <Mail className="w-8 h-8 text-red-400" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Responda o e-mail de @fabrani.com.br
              </h3>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Responda com um <span className="text-white font-semibold">"sim — vou participar"</span>
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur-sm" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-2xl p-8 md:p-10 h-full">
              {/* Número do passo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  2
                </div>
                <Monitor className="w-8 h-8 text-red-400" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Entre na Consultoria 5 minutos antes
              </h3>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Com microfone e câmera ligados. Não faça do celular — entre por seu <span className="text-white font-semibold">computador</span>.
              </p>
            </div>
          </div>

        </div>

        {/* Footer mínimo */}
        <div className="text-center">
          <p className="text-xs text-gray-600 font-mono uppercase tracking-widest">
            FABRANI — Faculdade Brasileira de Negócios Inovadores
          </p>
        </div>

      </div>
    </div>
  );
}
