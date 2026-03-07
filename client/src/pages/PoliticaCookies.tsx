import { ShieldCheck, Cookie, Info, Settings, BarChart, Megaphone, Users, Globe, Clock, UserCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
            <Cookie className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Política de Cookies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparência e controle sobre como utilizamos seus dados para melhorar sua experiência.
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
              Esta Política de Cookies explica como o site <span className="text-red-500 font-mono">www.fabrani.com.br</span> e seus subdomínios utilizam cookies e tecnologias similares para viabilizar a navegação, medir audiência e desempenho, aprimorar a experiência do usuário e operar ações de marketing, incluindo tráfego pago e campanhas em Meta (Facebook e Instagram), Google e outros canais de mídia.
            </p>
            <p>
              Esta Política integra os nossos Termos de Uso e a Política de Privacidade. Em caso de tratamento de dados pessoais por meio de cookies, aplicam-se também as regras da Política de Privacidade.
            </p>
          </section>

          {/* 1. O que são cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">01</span>
              O que são cookies e tecnologias similares
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/50 p-6 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors">
                <Info className="w-6 h-6 text-red-500 mb-4" />
                <h3 className="font-bold text-white mb-2">Definições</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-red-500">•</span> <span><strong>Cookies:</strong> pequenos arquivos de texto armazenados no seu dispositivo.</span></li>
                  <li className="flex gap-2"><span className="text-red-500">•</span> <span><strong>Pixels e tags:</strong> códigos para mensurar eventos e conversões.</span></li>
                  <li className="flex gap-2"><span className="text-red-500">•</span> <span><strong>Local Storage:</strong> armazenamento do navegador para configurações.</span></li>
                </ul>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-white/10 hover:border-red-600/50 transition-colors">
                <Settings className="w-6 h-6 text-red-600 mb-4" />
                <h3 className="font-bold text-white mb-2">Classificações</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-red-600">•</span> <span><strong>Origem:</strong> Próprios (primários) ou de Terceiros (Meta, Google).</span></li>
                  <li className="flex gap-2"><span className="text-red-600">•</span> <span><strong>Duração:</strong> Sessão (temporários) ou Persistentes.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Bases Legais */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">02</span>
              Bases legais (LGPD)
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-white/5 rounded-lg border-l-4 border-red-500">
                <ShieldCheck className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Cookies estritamente necessários</h3>
                  <p className="text-sm mt-1">Execução do contrato e/ou legítimo interesse. Viabilizam o funcionamento do site (autenticação, segurança, balanceamento).</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 bg-white/5 rounded-lg border-l-4 border-red-600">
                <UserCheck className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white">Cookies funcionais, analíticos e de marketing</h3>
                  <p className="text-sm mt-1">Consentimento do titular. Você pode aceitar, recusar ou revogar seu consentimento a qualquer momento através do nosso banner.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Categorias e Finalidades */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">03</span>
              Categorias e Finalidades
            </h2>
            <div className="grid gap-4">
              {[
                { icon: ShieldCheck, title: "1. Estritamente necessários", desc: "Autenticação, segurança, prevenção a fraudes. Sem estes, o site não funciona corretamente." },
                { icon: Settings, title: "2. Funcionais (preferências)", desc: "Lembram idioma, layout, modo escuro. Melhoram a experiência mas não são vitais." },
                { icon: BarChart, title: "3. Analíticos e de desempenho", desc: "Medem audiência, navegação e erros. Ex: páginas mais acessadas, tempo de permanência." },
                { icon: Megaphone, title: "4. Marketing e publicidade", desc: "Remarketing, conversões e suporte a tráfego pago em Meta, Google e outros canais." },
                { icon: Users, title: "5. Atendimento (CRM)", desc: "Chat, suporte e histórico de conversas para melhor atendimento." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <item.icon className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Terceiros */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">04</span>
              Cookies e pixels de terceiros
            </h2>
            <p className="mb-4">Utilizamos integrações que podem definir cookies próprios:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6 marker:text-red-500">
              <li><strong>Meta (Facebook/Instagram):</strong> Mensuração de eventos e anúncios.</li>
              <li><strong>Google (Ads/Analytics):</strong> Atribuição de conversões e relatórios.</li>
              <li><strong>Parceiros de EAD:</strong> Players de vídeo e ambientes virtuais.</li>
            </ul>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 items-start">
              <Globe className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
              <p className="text-sm text-yellow-200/80">
                <strong>Transferências internacionais:</strong> Alguns parceiros podem tratar dados fora do Brasil. Adotamos salvaguardas contratuais compatíveis com a LGPD.
              </p>
            </div>
          </section>

          {/* 5. Gerenciamento */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-red-600/20 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono">05</span>
              Gerenciamento de Consentimento
            </h2>
            <div className="space-y-4">
              <p>Você pode gerenciar suas preferências de três formas:</p>
              <ol className="list-decimal pl-6 space-y-3 marker:text-red-600 font-medium">
                <li><strong>Banner de consentimento:</strong> Ao acessar o site pela primeira vez.</li>
                <li><strong>Centro de preferências:</strong> Link no rodapé para revisar escolhas.</li>
                <li><strong>Navegador:</strong> Configurações de privacidade do seu browser (Chrome, Safari, Edge, etc).</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-4 italic">
                Nota: Desativar cookies essenciais pode comprometer o funcionamento do site.
              </p>
            </div>
          </section>

          {/* 6. Prazos e Crianças */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" /> Prazos de Retenção
              </h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Sessão:</strong> Expiram ao fechar o navegador.</li>
                <li>• <strong>Persistentes:</strong> Duram conforme definido pelo fornecedor.</li>
                <li>• Mantemos apenas pelo tempo necessário às finalidades.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" /> Crianças e Adolescentes
              </h2>
              <p className="text-sm">
                A coleta de consentimento para menores poderá exigir participação do responsável legal, conforme legislação vigente.
              </p>
            </div>
          </section>

          {/* 7. Contato DPO */}
          <section className="bg-gradient-to-br from-red-600/20 to-black p-8 rounded-2xl border border-red-600/30">
            <h2 className="text-2xl font-bold text-white mb-6">Contato do Encarregado (DPO)</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-red-500" />
                <span className="font-bold">Elias Evangelista de Souza</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                <a href="mailto:elias@fabrani.com.br" className="hover:text-white transition-colors">elias@fabrani.com.br</a>
              </div>
              <div className="flex items-center gap-3">
                <Megaphone className="w-5 h-5 text-red-500" />
                <span>(16) 99386-2050 // (16) 3203-7082</span>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-sm text-muted-foreground">
              Em caso de conflito, prevalecem as condições desta Política em conjunto com nossa <Link href="/privacidade" className="text-red-500 hover:underline">Política de Privacidade</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
