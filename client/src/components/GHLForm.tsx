import { useEffect } from "react";

interface GHLFormProps {
  formId?: string;
  title?: string;
  height?: string | number;
  className?: string;
}

export function GHLForm({
  formId = "NIiX8zUL3aiJ65D44Z8J",
  title = "SE01 | Sessão Estratégica",
  height = "467",
  className = "",
}: GHLFormProps) {
  useEffect(() => {
    // Carregar script do GHL
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpar script ao desmontar
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`ghl-form-container ${className}`}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        style={{
          width: "100%",
          height: typeof height === 'number' ? `${height}px` : height,
          border: "none",
          borderRadius: "0px",
        }}
        id={`inline-${formId}`}
        data-layout={JSON.stringify({ id: "INLINE" })}
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height={height}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={title}
      />
    </div>
  );
}
