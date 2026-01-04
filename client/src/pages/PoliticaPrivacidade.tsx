import { Shield, Lock, Eye, Database, Globe, UserCheck, FileText, Scale, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-neon-purple/10 rounded-full mb-6 border border-neon-purple/20">
            <Shield className="w-8 h-8 text-neon-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Política de Privacidade
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compromisso com a proteção dos seus dados e transparência no tratamento das informações.
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
              A <span className="text-neon-cyan font-bold">FABRANI</span>, mantenedora do site <span className="font-mono">www.fabrani.com.br</span>, valoriza a privacidade e a proteção de dados pessoais. Esta Política descreve como coletamos, utilizamos, compartilhamos e protegemos dados de visitantes, alunos e parceiros.
            </p>
            <p>
              Ao utilizar nossos sites e serviços, você concorda com os termos desta Política, que deve ser lida em conjunto com nossos <span className="text-white font-medium">Termos de Uso</span> e <Link href="/politica-cookies" className="text-neon-cyan hover:underline">Política de Cookies</Link>.
            </p>
          </section>

          {/* 1. Quem somos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">01</span>
              Quem somos e papéis LGPD
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-neon-cyan" /> Controladora
                </h3>
                <p className="text-sm">FABRANI (Faculdade Brasileira de Negócios Inovadores), responsável pelas decisões de tratamento de dados.</p>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-neon-purple" /> Encarregado (DPO)
                </h3>
                <p className="text-sm">Elias Evangelista de Souza<br/>Contato: elias@fabrani.com.br</p>
              </div>
            </div>
          </section>

          {/* 2. Quais dados coletamos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">02</span>
              Quais dados coletamos
            </h2>
            <div className="space-y-4">
              {[
                { title: "Identificação e Contato", desc: "Nome, CPF, e-mail, telefone, endereço, profissão." },
                { title: "Navegação e Tecnologias", desc: "IP, dispositivo, cookies, páginas visitadas, origem de tráfego." },
                { title: "Dados Acadêmicos", desc: "Histórico, notas, frequência, certificações, interações no AVA." },
                { title: "Pagamento", desc: "Histórico de transações (dados de cartão são tratados pelas plataformas de pagamento)." },
                { title: "Atendimento", desc: "Registros de chamados, e-mails e interações de suporte." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border-l-2 border-white/10 hover:border-neon-cyan hover:bg-white/5 transition-all">
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Finalidades */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">03</span>
              Para que usamos seus dados
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {[
                "Execução acadêmica e contratual",
                "Atendimento e relacionamento (CRM)",
                "Compliance e obrigações legais (MEC)",
                "Marketing e captação (com consentimento)",
                "Mensuração e melhoria de produto",
                "Segurança e prevenção a fraudes"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm p-3 bg-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Compartilhamento */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">04</span>
              Com quem compartilhamos
            </h2>
            <p className="mb-4">Compartilhamos dados estritamente necessários com:</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Plataformas EAD</h3>
                <p className="text-xs text-muted-foreground">Ensínio, Curseduca, Cademi (acesso a conteúdos).</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Pagamentos</h3>
                <p className="text-xs text-muted-foreground">Monetizze, Eduzz, Hotmart, Ticto, Greenn.</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Mídia & Analytics</h3>
                <p className="text-xs text-muted-foreground">Meta, Google (mediante consentimento).</p>
              </div>
            </div>
          </section>

          {/* 5. Segurança */}
          <section className="bg-gradient-to-r from-neon-cyan/5 to-transparent p-6 rounded-xl border-l-4 border-neon-cyan">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-neon-cyan" /> Segurança da Informação
            </h2>
            <p className="text-sm mb-4">
              Aplicamos controles rigorosos como criptografia, autenticação forte e backups. Apesar dos esforços, nenhum ambiente é imune a riscos, mas temos planos de resposta a incidentes conforme a LGPD.
            </p>
            <div className="flex items-center gap-2 text-xs text-neon-cyan font-mono uppercase tracking-wider">
              <Shield className="w-3 h-3" /> Protocolos Ativos
            </div>
          </section>

          {/* 6. Seus Direitos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">06</span>
              Seus Direitos (LGPD)
            </h2>
            <div className="grid gap-2">
              {[
                "Confirmação e acesso aos dados",
                "Correção de dados incompletos ou desatualizados",
                "Anonimização ou eliminação de dados desnecessários",
                "Portabilidade de dados",
                "Revogação do consentimento"
              ].map((right, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Contato DPO */}
          <section className="bg-black border border-white/20 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-neon-purple/5 group-hover:bg-neon-purple/10 transition-colors" />
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Contato do Encarregado (DPO)</h2>
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-neon-purple" />
                  <span className="font-bold">Elias Evangelista de Souza</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neon-purple" />
                  <a href="mailto:elias@fabrani.com.br" className="hover:text-white transition-colors">elias@fabrani.com.br</a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-neon-purple" />
                  <span>(16) 99711-7597 // (16) 3203-7082</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neon-purple shrink-0 mt-1" />
                  <span className="text-sm">Av. General Carneiro, 380, Centro<br/>Jaboticabal/SP</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-12 border-t border-white/10 space-y-4">
            <p className="text-sm text-muted-foreground">
              Lei aplicável: Legislação brasileira (LGPD). Foro: Jaboticabal/SP.
            </p>
            <p className="text-xs text-muted-foreground/60">
              O uso dos serviços da FABRANI implica ciência e concordância com esta Política.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
