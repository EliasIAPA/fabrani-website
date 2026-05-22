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
      const widgets = document.querySelectorAll(
        '[id*="rosana"], [class*="rosana"], [id*="sophia"], [class*="sophia"]'
      );
      widgets.forEach((el) => {
        (el as HTMLElement).style.display = "";
      });
    };
  }, []);

  // Meta Pixel - PageView
  useEffect(() => {
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
      return;
    }

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

    (window as any).fbq('init', '1101040821159474');
    (window as any).fbq('init', '2419105295112897');
    (window as any).fbq('track', 'PageView');

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
            src="https://api.leadconnectorhq.com/widget/booking/HJLt2GBkeX3Hx6RYtvTd"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
            scrolling="no"
            id="HJLt2GBkeX3Hx6RYtvTd_1779455697531"
            title="Agenda - Avaliação Acadêmica"
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
