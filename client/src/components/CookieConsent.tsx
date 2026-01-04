import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("fabrani_cookie_consent");
    if (!hasConsented) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("fabrani_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
      "bg-black/90 backdrop-blur-xl border-t border-neon-cyan/30 shadow-[0_-10px_40px_-15px_rgba(0,255,255,0.1)]",
      "animate-in slide-in-from-bottom-full duration-500"
    )}>
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 bg-neon-cyan/10 rounded-full shrink-0 hidden md:block">
            <Cookie className="w-6 h-6 text-neon-cyan" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 md:block">
              <Cookie className="w-5 h-5 text-neon-cyan md:hidden" />
              Controle de Privacidade
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Utilizamos cookies para aprimorar sua experiência, analisar o tráfego e personalizar conteúdo, conforme nossa <Link href="/politica-cookies" className="text-neon-cyan hover:underline font-medium">Política de Cookies</Link>. Ao continuar navegando, você concorda com o uso dessas tecnologias.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button 
            variant="outline" 
            className="border-white/20 hover:bg-white/10 text-white"
            onClick={handleAccept}
          >
            Continuar sem aceitar
          </Button>
          <Button 
            className="bg-neon-cyan text-black hover:bg-neon-cyan/90 font-bold shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            onClick={handleAccept}
          >
            Aceitar todos os cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
