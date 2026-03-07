import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black overflow-x-hidden">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
            <AlertCircle className="relative h-16 w-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-2">404</h1>

        <h2 className="text-xl font-semibold text-gray-300 mb-4">
          Página não encontrada
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
          A página que você procura não existe ou foi movida.
        </p>

        <Button
          onClick={handleGoHome}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-none transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar para Home
        </Button>
      </div>
    </div>
  );
}
