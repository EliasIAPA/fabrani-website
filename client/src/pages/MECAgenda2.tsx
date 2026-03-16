import { useEffect } from "react";

export default function MECAgenda2() {
  // Esconder widget flutuante Rosana.io nesta página
  useEffect(() => {
    const hideWidget = () => {
      const widgets = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], [id*="sophia"], [class*="sophia"]'
      );
      widgets.forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
      // Também esconder por seletor genérico de widget flutuante
      const floatingWidgets = document.querySelectorAll(
        'div[style*="position: fixed"][style*="bottom"]'
      );
      floatingWidgets.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (
          htmlEl.id?.includes("rosana") ||
          htmlEl.className?.includes("rosana") ||
          htmlEl.querySelector('iframe[src*="rosana"]')
        ) {
          htmlEl.style.display = "none";
        }
      });
    };

    hideWidget();
    const observer = new MutationObserver(hideWidget);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // Restaurar widgets ao sair
      const widgets = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], [id*="sophia"], [class*="sophia"]'
      );
      widgets.forEach((el) => {
        (el as HTMLElement).style.display = "";
      });
    };
  }, []);

  // Meta Pixel (2419105295112897) - PageView + Lead
  useEffect(() => {
    // Evitar duplicação se já foi carregado
    if ((window as any).fbq) {
      // Pixel já inicializado (veio da /mec), apenas disparar PageView
      (window as any).fbq('track', 'PageView');
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

    // Inicializar com os Pixel IDs e disparar PageView
    (window as any).fbq('init', '1101040821159474');
    (window as any).fbq('init', '2419105295112897');
    (window as any).fbq('track', 'PageView');

    // Adicionar noscript fallback
    const noscript = b.createElement('noscript');
    noscript.id = 'fb-pixel-noscript-agenda2';
    const img = b.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=1101040821159474&ev=PageView&noscript=1';
    noscript.appendChild(img);
    b.body.appendChild(noscript);

    const noscript2 = b.createElement('noscript');
    noscript2.id = 'fb-pixel-noscript2-agenda2';
    const img2 = b.createElement('img');
    img2.height = 1;
    img2.width = 1;
    img2.style.display = 'none';
    img2.src = 'https://www.facebook.com/tr?id=2419105295112897&ev=PageView&noscript=1';
    noscript2.appendChild(img2);
    b.body.appendChild(noscript2);

    return () => {
      const ns1 = document.getElementById('fb-pixel-noscript-agenda2');
      const ns2 = document.getElementById('fb-pixel-noscript2-agenda2');
      if (ns1?.parentNode) ns1.parentNode.removeChild(ns1);
      if (ns2?.parentNode) ns2.parentNode.removeChild(ns2);
    };
  }, []);

  // Detectar agendamento no iframe do GoHighLevel e disparar Lead
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin?.includes('leadconnectorhq.com') ||
        event.origin?.includes('msgsndr.com')
      ) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (
            data?.type === 'form_submitted' ||
            data?.type === 'formSubmitted' ||
            data?.event === 'form_submitted' ||
            data?.event === 'formSubmitted' ||
            data?.action === 'form_submitted' ||
            data?.formSubmitted === true ||
            data?.type === 'booking_submitted' ||
            data?.event === 'booking_submitted'
          ) {
            if ((window as any).fbq) {
              (window as any).fbq('track', 'Lead');
              (window as any).fbq('track', 'Schedule');
              console.log('[Meta Pixel] Evento Lead + Schedule disparado (agenda2)');
            }
            // Redirecionar para página de obrigado
            window.location.href = '/mec/obrigado';
          }
        } catch {
          if (
            typeof event.data === 'string' &&
            (event.data.includes('form_submitted') || event.data.includes('formSubmitted') || event.data.includes('booking'))
          ) {
            if ((window as any).fbq) {
              (window as any).fbq('track', 'Lead');
              (window as any).fbq('track', 'Schedule');
            }
            window.location.href = '/mec/obrigado';
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: detectar reload do iframe (segunda carga = booking confirmado)
    const checkIframeNavigation = () => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        'iframe[src*="leadconnectorhq.com"]'
      );
      iframes.forEach((iframe) => {
        iframe.addEventListener('load', () => {
          const loadCount = parseInt(iframe.dataset.loadCount || '0') + 1;
          iframe.dataset.loadCount = String(loadCount);
          if (loadCount > 1) {
            if ((window as any).fbq) {
              (window as any).fbq('track', 'Lead');
              (window as any).fbq('track', 'Schedule');
              console.log('[Meta Pixel] Lead + Schedule disparado (iframe reload agenda2)');
            }
            window.location.href = '/mec/obrigado';
          }
        });
      });
    };
    const iframeTimer = setTimeout(checkIframeNavigation, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(iframeTimer);
    };
  }, []);

  // Carregar script do GoHighLevel para embed
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center overflow-x-hidden">
      {/* Header com logo */}
      <div className="w-full py-6 flex justify-center border-b border-white/10">
        <img
          src="/images/logo-fabrani.png"
          alt="FABRANI"
          className="h-8 md:h-10 object-contain brightness-0 invert"
        />
      </div>

      {/* Headline */}
      <div className="w-full max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Realize seu Agendamento{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Agora!
          </span>
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4"></div>
      </div>

      {/* Embed da Agenda GoHighLevel */}
      <div className="w-full max-w-3xl mx-auto px-4 pb-16 flex-1">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 md:p-4 backdrop-blur-sm">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/3EMXyG2bzrPgMxV1YHW8"
            style={{ width: "100%", height: "700px", border: "none", borderRadius: "12px" }}
            id="inline-3EMXyG2bzrPgMxV1YHW8"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Agenda MEC"
            data-height="700"
            data-layout-iframe-id="inline-3EMXyG2bzrPgMxV1YHW8"
            data-form-id="3EMXyG2bzrPgMxV1YHW8"
            title="Agenda - Avaliação Acadêmica"
            scrolling="yes"
          />
        </div>
      </div>

      {/* Footer mínimo */}
      <div className="w-full py-6 border-t border-white/10 text-center">
        <p className="text-gray-500 text-xs">
          FABRANI - Faculdade Brasileira de Negócios Inovadores &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
