import { useEffect, useRef } from "react";

/**
 * Formulário GHL SE02 | Sessão Estratégica Saúde
 * Form ID: qQ6R5J4SI2zEKsjalM2v
 * Fonte: api.leadconnectorhq.com
 */
export function GHLFormSaude() {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Remove script anterior se existir para evitar duplicação
    const existingScript = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Injeta o script de embed do GHL após o iframe estar no DOM
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }, 150);

    return () => {
      clearTimeout(timer);
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ghl-form-saude-container w-full">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/qQ6R5J4SI2zEKsjalM2v"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "500px",
          border: "none",
          borderRadius: "0px",
          display: "block",
        }}
        id="inline-qQ6R5J4SI2zEKsjalM2v"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="SE02 | Sessão Estratégica Saúde"
        data-height="undefined"
        data-layout-iframe-id="inline-qQ6R5J4SI2zEKsjalM2v"
        data-form-id="qQ6R5J4SI2zEKsjalM2v"
        title="SE02 | Sessão Estratégica Saúde"
        allow="payment"
      />
    </div>
  );
}
