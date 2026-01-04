import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, CheckCircle2, Loader2, Download, AlertTriangle } from "lucide-react";
import { jsPDF } from "jspdf";

export default function ObsolescenceSimulator() {
  const [profession, setProfession] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    risk: number;
    requalification: string;
    automation_score: number;
    diagnosis: string;
  }>(null);

  const calculateRisk = () => {
    if (!profession) return;
    
    setIsAnalyzing(true);
    
    // Simulação de análise heurística baseada em palavras-chave
    setTimeout(() => {
      const prof = profession.toLowerCase();
      let risk = 0;
      let diagnosis = "";
      
      // Lógica simples de simulação (em um app real, isso viria de uma API/LLM)
      if (prof.includes("motorista") || prof.includes("atendente") || prof.includes("caixa") || prof.includes("operador")) {
        risk = 92;
        diagnosis = "Alta probabilidade de substituição por automação física e digital.";
      } else if (prof.includes("advogado") || prof.includes("contador") || prof.includes("analista") || prof.includes("redator")) {
        risk = 78;
        diagnosis = "Tarefas analíticas e repetitivas serão absorvidas por LLMs.";
      } else if (prof.includes("médico") || prof.includes("engenheiro") || prof.includes("arquiteto")) {
        risk = 45;
        diagnosis = "IA atuará como co-piloto, exigindo adaptação imediata.";
      } else if (prof.includes("programador") || prof.includes("desenvolvedor")) {
        risk = 65;
        diagnosis = "A codificação manual será reduzida; foco mudará para arquitetura e supervisão de IA.";
      } else {
        // Risco padrão aleatório alto para gerar urgência (marketing)
        risk = Math.floor(Math.random() * (85 - 60 + 1)) + 60;
        diagnosis = "Seu setor está passando por transformação acelerada.";
      }

      setResult({
        risk: risk,
        requalification: risk > 70 ? "CRÍTICA" : risk > 40 ? "ALTA" : "MODERADA",
        automation_score: risk,
        diagnosis: diagnosis
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Configuração de cores e fontes
    doc.setFillColor(10, 14, 39); // Dark Navy Background
    doc.rect(0, 0, 210, 297, "F");
    
    doc.setTextColor(0, 240, 255); // Neon Cyan
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("RELATÓRIO DE RISCO PROFISSIONAL", 105, 30, { align: "center" });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("FABRANI - AI-NATIVE EDUCATION", 105, 40, { align: "center" });
    
    // Linha divisória
    doc.setDrawColor(0, 240, 255);
    doc.line(20, 45, 190, 45);
    
    // Dados do Usuário
    doc.setFontSize(14);
    doc.text(`Profissão Analisada: ${profession.toUpperCase()}`, 20, 60);
    
    // Gráfico de Risco (Simulado visualmente)
    doc.setFillColor(20, 20, 20);
    doc.rect(20, 75, 170, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.text("RISCO DE AUTOMAÇÃO (3 ANOS)", 30, 90);
    
    // Barra de progresso
    doc.setFillColor(50, 50, 50);
    doc.rect(30, 100, 150, 5, "F");
    
    // Preenchimento baseado no risco
    if (result.risk > 70) doc.setFillColor(255, 50, 50); // Red
    else if (result.risk > 40) doc.setFillColor(255, 165, 0); // Orange
    else doc.setFillColor(0, 240, 255); // Cyan
    
    doc.rect(30, 100, 150 * (result.risk / 100), 5, "F");
    doc.text(`${result.risk}%`, 185, 104);
    
    // Diagnóstico
    doc.setFontSize(16);
    doc.setTextColor(0, 240, 255);
    doc.text("DIAGNÓSTICO DA IA:", 20, 135);
    
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const splitDiagnosis = doc.splitTextToSize(result.diagnosis, 170);
    doc.text(splitDiagnosis, 20, 145);
    
    // Recomendação (A Vacina)
    doc.setFillColor(112, 0, 255); // Neon Purple
    doc.rect(20, 170, 170, 60, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("A VACINA: LIDERANÇA AUMENTADA", 105, 185, { align: "center" });
    
    doc.setFontSize(11);
    const recommendation = "Para blindar sua carreira, você precisa deixar de ser um executor de tarefas e tornar-se um gestor de inteligência artificial. A FABRANI recomenda iniciar imediatamente uma especialização em IA aplicada ao seu setor.";
    const splitRec = doc.splitTextToSize(recommendation, 150);
    doc.text(splitRec, 105, 200, { align: "center" });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Gerado pelo Oráculo FABRANI em " + new Date().toLocaleDateString(), 105, 280, { align: "center" });
    
    doc.save("fabrani_relatorio_risco.pdf");
  };

  return (
    <Card className="relative bg-black/80 border-white/10 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 pb-6">
        <CardTitle className="flex items-center gap-3 text-xl font-mono">
          <Activity className="w-5 h-5 text-neon-purple animate-pulse" />
          ANÁLISE DE RISCO PROFISSIONAL
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        {!result ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profession" className="text-white">Qual é a sua profissão atual?</Label>
              <Input 
                id="profession" 
                placeholder="Ex: Advogado, Designer, Contador..." 
                className="bg-white/5 border-white/10 text-white focus:border-neon-cyan"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-white text-black hover:bg-gray-200 font-bold rounded-none py-6"
              onClick={calculateRisk}
              disabled={!profession || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> PROCESSANDO DADOS...
                </>
              ) : (
                "CALCULAR MEU RISCO AGORA"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Automação do Setor (Previsão 2026)</span>
                <span className={result.risk > 70 ? "text-red-400" : "text-orange-400"}>{result.risk}%</span>
              </div>
              <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden">
                <div 
                  className={`h-full w-full relative transition-all duration-1000 ${result.risk > 70 ? "bg-gradient-to-r from-neon-cyan to-red-500" : "bg-gradient-to-r from-neon-cyan to-orange-500"}`}
                  style={{ width: `${result.risk}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Necessidade de Requalificação</span>
                <span className="text-orange-400 font-bold">{result.requalification}</span>
              </div>
              <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: result.requalification === "CRÍTICA" ? "95%" : "70%" }}></div>
              </div>
            </div>

            <div className="bg-neon-purple/10 border border-neon-purple/30 p-4 rounded-sm">
              <p className="text-sm text-neon-purple font-mono mb-2">DIAGNÓSTICO DA IA:</p>
              <p className="text-sm text-white">
                {result.diagnosis}
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold rounded-none py-6"
                onClick={generatePDF}
              >
                <Download className="mr-2 h-4 w-4" /> BAIXAR RELATÓRIO PDF
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-none py-6"
                onClick={() => { setResult(null); setProfession(""); }}
              >
                NOVA ANÁLISE
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
