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
