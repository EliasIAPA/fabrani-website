import { Download } from 'lucide-react';

export default function BrevoFormEmbed() {
  const brevoFormUrl = 'https://18a0dd9e.sibforms.com/serve/MUIFACBW_dgbNDoGOU-vfvkfZOYVg_6wpg1-KIdwke0UEQ17HZNJ5AGGtNPxb0rlXyyIdkjkol5JznmWGQK32fWvemsLXbY3Mp4bKzFog61pn89WaFzmBsMkq5ulLqRSTTrkG1OyTfKbe82ngnc7t_FWz1m4qXNHQCgfnJ2FQp4fZpoqey4xtuQp0NI3RkabW3T9yLRbasyRj01E';

  const handleClick = () => {
    window.open(brevoFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-black bg-red-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:scale-105"
    >
      <Download className="w-5 h-5" />
      <span>BAIXAR GUIA AGORA</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  );
}
