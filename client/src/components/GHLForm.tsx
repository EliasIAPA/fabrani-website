import { useEffect, useRef } from "react";

interface GHLFormProps {
  formId?: string;
  title?: string;
  height?: string | number;
  className?: string;
}

export function GHLForm({
  formId = "NIiX8zUL3aiJ65D44Z8J",
  title = "SE01 | Sessão Estratégica",
  height = 465,
  className = "",
}: GHLFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Remove script anterior se existir
    const existingScript = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Aguarda o iframe estar no DOM antes de carregar o script
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [formId]);

  const iframeHeight = typeof height === "number" ? height : parseInt(String(height), 10) || 465;

  return (
    <div ref={containerRef} className={`ghl-form-container w-full ${className}`}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${formId}?notrack=true`}
        style={{
          width: "100%",
          height: `${iframeHeight}px`,
          border: "none",
          borderRadius: "0px",
          display: "block",
        }}
        id={`inline-${formId}`}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height={String(iframeHeight)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={title}
        allow="payment"
      />
    </div>
  );
}
