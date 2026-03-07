import { FileText, Scale, Shield, Users, CreditCard, AlertTriangle, BookOpen, Clock, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Termos de Uso
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Condições gerais para uso dos sites, ambientes virtuais e serviços educacionais da FABRANI.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Última atualização: 4 de janeiro de 2026</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          {/* Introduction */}
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="mb-4">
              A <span className="text-red-500 font-bold">FABRANI</span> (Faculdade Brasileira de Negócios Inovadores) estabelece abaixo as condições gerais para uso de seus sites e serviços. Ao acessar o site <span className="font-mono">www.fabrani.com.br</span> ou utilizar o AVA, você concorda com estes Termos, com a <Link href="/privacidade" className="text-red-500 hover:underline">Política de Privacidade</Link> e com a <Link href="/politica-cookies" className="text-red-500 hover:underline">Política de Cookies</Link>.
            </p>
            <div className="mt-4 p-4 bg-black/50 rounded-lg border border-white/10 text-sm">
              <p><strong>Mantenedora:</strong> Negócios Inovadores Ltda (Ni1) - CNPJ 37.232.192/0001-71</p>
              <p><strong>Mantida:</strong> FABRANI - Av. General Carneiro, 380, Jaboticabal/SP</p>
            </div>
          </section>

          {/* 1. Definições */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">01</span>
              Definições e Escopo
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h3 className="font-bold text-white mb-2">Definições</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Site:</strong> www.fabrani.com.br e subdomínios.</li>
                  <li>• <strong>AVA:</strong> Ambientes virtuais de aprendizagem.</li>
                  <li>• <strong>Aluno:</strong> Pessoa inscrita em oferta educacional.</li>
                  <li>• <strong>Parceiros EAD:</strong> Ensínio, Curseduca, Cademi.</li>
                </ul>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h3 className="font-bold text-white mb-2">Escopo</h3>
                <p className="text-sm">Regula o uso do Site, AVA, serviços EAD, relacionamento acadêmico e integrações com parceiros e pagamentos.</p>
              </div>
            </div>
          </section>

          {/* 2. Aceitação */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">02</span>
              Aceitação e Cadastro
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-white/5 rounded-lg border-l-4 border-red-500">
                <Users className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Elegibilidade e Cadastro</h3>
                  <p className="text-sm mt-1">Maiores de 18 anos. Adolescentes precisam de autorização. Você declara fornecer dados verídicos e é responsável pela segurança de suas credenciais (login/senha).</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Conduta */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">03</span>
              Conduta e Uso Aceitável
            </h2>
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> É estritamente proibido:
              </h3>
              <ul className="grid gap-2 md:grid-cols-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Compartilhar credenciais de acesso.</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Copiar ou revender materiais didáticos.</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Fraudar presença ou avaliações (proctoring).</li>
                <li className="flex items-center gap-2"><span className="text-red-500">•</span> Praticar assédio ou discurso de ódio.</li>
              </ul>
            </div>
          </section>

          {/* 4. Pagamentos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">04</span>
              Pagamentos e Cancelamentos
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <CreditCard className="w-6 h-6 text-red-500 mb-3" />
                <h3 className="font-bold text-white mb-2">Processamento</h3>
                <p className="text-sm text-muted-foreground">Via Monetizze, Eduzz, Hotmart, etc. Dados de cartão ficam com o provedor.</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Scale className="w-6 h-6 text-red-500 mb-3" />
                <h3 className="font-bold text-white mb-2">Arrependimento</h3>
                <p className="text-sm text-muted-foreground">7 dias para contratações online (CDC). Reembolsos adicionais conforme contrato específico.</p>
              </div>
            </div>
          </section>

          {/* 5. Propriedade Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">05</span>
              Propriedade Intelectual
            </h2>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
              <BookOpen className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <div>
                <p className="text-sm">
                  A FABRANI detém os direitos sobre materiais, marcas e layouts. O Aluno recebe uma <strong>licença pessoal, limitada e intransferível</strong> para uso acadêmico durante o curso. É proibida a cópia, distribuição ou engenharia reversa.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Responsabilidade */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">06</span>
              Limitações de Responsabilidade
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-red-500">•</span> A FABRANI não responde por danos indiretos ou lucros cessantes.</li>
              <li className="flex gap-2"><span className="text-red-500">•</span> Não nos responsabilizamos por falhas em serviços de terceiros (gateways, nuvem).</li>
              <li className="flex gap-2"><span className="text-red-500">•</span> Adotamos medidas de segurança, mas nenhuma infraestrutura é 100% imune.</li>
            </ul>
          </section>

          {/* 7. Contato */}
          <section className="bg-black border border-white/20 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Canais de Atendimento</h2>
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500" />
                  <a href="mailto:contato@fabrani.com.br" className="hover:text-white transition-colors">contato@fabrani.com.br</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>(16) 99711-7597</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <span className="text-sm">Av. General Carneiro, 380, Centro<br/>Jaboticabal/SP</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-12 border-t border-white/10 space-y-4">
            <p className="text-sm text-muted-foreground">
              Lei aplicável: Legislação brasileira. Foro: Jaboticabal/SP.
            </p>
            <p className="text-xs text-muted-foreground/60">
              O uso continuado do site implica concordância com estes Termos.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
