import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

// Lista de códigos de país mais comuns
const countryCodes = [
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+1", country: "EUA/Canadá", flag: "🇺🇸" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+34", country: "Espanha", flag: "🇪🇸" },
  { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  { code: "+49", country: "Alemanha", flag: "🇩🇪" },
  { code: "+33", country: "França", flag: "🇫🇷" },
  { code: "+39", country: "Itália", flag: "🇮🇹" },
  { code: "+81", country: "Japão", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colômbia", flag: "🇨🇴" },
  { code: "+52", country: "México", flag: "🇲🇽" },
];

export default function BrevoDownloadForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const subscribeMutation = trpc.brevo.subscribe.useMutation({
    onSuccess: () => {
      setStatus("success");
      setEmail("");
      setNome("");
      setWhatsapp("");
      
      // Iniciar download do PDF após 2 segundos
      setTimeout(() => {
        window.open("/downloads/g.prompt2026.pdf", "_blank");
      }, 2000);
    },
    onError: (error) => {
      setStatus("error");
      setErrorMessage(error.message || "Erro ao processar sua solicitação. Tente novamente.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !nome || !whatsapp) {
      setStatus("error");
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Combinar código do país com o número de WhatsApp
    const fullWhatsapp = `${countryCode} ${whatsapp}`;

    subscribeMutation.mutate({
      email,
      nome,
      whatsapp: fullWhatsapp,
    });
  };

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  if (status === "success") {
    return (
      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-2xl p-12 text-center">
        <CheckCircle2 className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
        <h3 className="text-3xl font-bold mb-4 text-white">
          🎉 Obrigado!
        </h3>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-4">
          Aproveite seu Guia!
        </p>
        <p className="text-xl text-gray-300 mb-6">
          ✉️ Guia enviado para seu email!
        </p>
        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
          <p className="text-gray-400 text-sm">
            O download também iniciará automaticamente em instantes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-bold text-gray-300 mb-2">
            Nome Completo *
          </label>
          <Input
            id="nome"
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-12 text-base text-white focus:ring-red-500 focus:border-red-500" 
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
            E-mail *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base text-white focus:ring-red-500 focus:border-red-500" 
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-300 mb-2">
            WhatsApp *
          </label>
          <div className="flex gap-2">
            {/* Seletor de Código de País */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="h-12 px-3 flex items-center gap-2 rounded-lg text-white font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px', borderStyle: 'solid' }}
                disabled={status === "loading"}
              >
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-sm">{selectedCountry.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showCountryDropdown && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto rounded-lg shadow-xl z-50 border"
                  style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(country.code);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-white text-sm">{country.country}</span>
                      <span className="text-gray-400 text-sm ml-auto">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Campo de Número */}
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="h-12 text-base text-white focus:ring-red-500 focus:border-red-500 flex-1" 
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: '1px' }}
              disabled={status === "loading"}
              required
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 text-black font-bold text-lg h-14 rounded-lg transition-all shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:shadow-[0_0_50px_rgba(0,217,255,0.5)]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            PROCESSANDO...
          </>
        ) : (
          "BAIXAR GUIA AGORA"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Ao preencher este formulário, você concorda em receber comunicações da FABRANI sobre IA e educação.
      </p>
    </form>
  );
}
