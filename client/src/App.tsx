import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Manifesto from "./pages/Manifesto";
import MBAs from "./pages/MBAs";
import MBADetail from "./pages/MBADetail";
import GraduacaoMarketing from "./pages/GraduacaoMarketing";
import GraduacaoImobiliaria from "./pages/GraduacaoImobiliaria";
import CPA from "./pages/CPA";
import NAP from "./pages/NAP";
import ResponsabilidadeSocial from "./pages/ResponsabilidadeSocial";
import HubInsights from "@/pages/HubInsights";
import InsightDetail from "@/pages/InsightDetail";
import PIVIC from "@/pages/PIVIC";
import TrabalheConosco from "@/pages/TrabalheConosco";
import PoliticaCookies from "@/pages/PoliticaCookies";
import PoliticaPrivacidade from "@/pages/PoliticaPrivacidade";
import TermosDeUso from "@/pages/TermosDeUso";
import Parceiros from "@/pages/Parceiros";
import ComoSerParceiro from "@/pages/ComoSerParceiro";
import FabraniIAPlus from "@/pages/FabraniIAPlus";
import IAParaNegocios from "@/pages/IAParaNegocios";
import IAParaNegociosLP from "@/pages/IAParaNegociosLP";
import MEC from "@/pages/MEC";
import MECSaude from "@/pages/MECSaude";
import MECObrigado from "@/pages/MECObrigado";
import MECAgenda2 from "@/pages/MECAgenda2";
import MbaServico from "@/pages/MbaServico";
import AntiFraudDashboard from "@/pages/AntiFraudDashboard";
import MECLgpd from "@/pages/MECLgpd";
import CloserLogin from "@/pages/closer/CloserLogin";
import CloserDashboard from "@/pages/closer/CloserDashboard";
import CloserClients from "@/pages/closer/CloserClients";
import CloserNewClient from "@/pages/closer/CloserNewClient";
import CloserProposals from "@/pages/closer/CloserProposals";
import CloserNewProposal from "@/pages/closer/CloserNewProposal";
import CloserSales from "@/pages/closer/CloserSales";
import CloserNewSale from "@/pages/closer/CloserNewSale";
import CloserManage from "@/pages/closer/CloserManage";
import CloserNewCloser from "@/pages/closer/CloserNewCloser";
import CloserEditProposal from "@/pages/closer/CloserEditProposal";
import CloserEditClient from "@/pages/closer/CloserEditClient";
import CloserEditSale from "@/pages/closer/CloserEditSale";
import CloserLogs from "@/pages/closer/CloserLogs";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Landing pages standalone - sem header/footer */}
      <Route path="/mec/agenda2" component={MECAgenda2} />
      <Route path="/mec/obrigado" component={MECObrigado} />
      <Route path="/mec/saude" component={MECSaude} />
      <Route path="/mec" component={MEC} />
      <Route path="/mba-servico" component={MbaServico} />
      <Route path="/mec/lgpd" component={MECLgpd} />
      <Route path="/admin/anti-fraude" component={AntiFraudDashboard} />
      
      {/* Painel Closer - standalone */}
      <Route path="/closer/login" component={CloserLogin} />
      <Route path="/closer/clientes" component={CloserClients} />
      <Route path="/closer/novo-cliente" component={CloserNewClient} />
      <Route path="/closer/propostas" component={CloserProposals} />
      <Route path="/closer/nova-proposta" component={CloserNewProposal} />
      <Route path="/closer/vendas" component={CloserSales} />
      <Route path="/closer/nova-venda" component={CloserNewSale} />
      <Route path="/closer/closers" component={CloserManage} />
      <Route path="/closer/novo-closer" component={CloserNewCloser} />
      <Route path="/closer/editar-proposta/:id" component={CloserEditProposal} />
      <Route path="/closer/editar-cliente/:id" component={CloserEditClient} />
      <Route path="/closer/editar-venda/:id" component={CloserEditSale} />
      <Route path="/closer/logs" component={CloserLogs} />
      <Route path="/closer" component={CloserDashboard} />
      
      {/* Todas as outras rotas com Layout (header + footer) */}
      <Route>
        <Layout>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/manifesto"} component={Manifesto} />
            <Route path={"/mbas"} component={MBAs} />
            <Route path={"/mbas/:id"} component={MBADetail} />
            <Route path={"/graduacao/marketing-digital"} component={GraduacaoMarketing} />
            <Route path={"/graduacao/negocios-imobiliarios"} component={GraduacaoImobiliaria} />
            <Route path="/fabrani-conecta/cpa" component={CPA} />
            <Route path="/fabrani-conecta/nap" component={NAP} />
            <Route path="/fabrani-conecta/responsabilidade-social" component={ResponsabilidadeSocial} />
            <Route path={"/cursos-gratuitos"} component={FabraniIAPlus} />
            <Route path="/ia-para-negocios" component={IAParaNegocios} />
            <Route path="/lp/mba-ia-negocios" component={IAParaNegociosLP} />
            <Route path="/hub-insights" component={HubInsights} />
            <Route path="/hub-insights/:id" component={InsightDetail} />
            <Route path="/pesquisa/pivic" component={PIVIC} />
            <Route path="/trabalhe-conosco" component={TrabalheConosco} />
            <Route path="/politica-cookies" component={PoliticaCookies} />
            <Route path="/privacidade" component={PoliticaPrivacidade} />
            <Route path="/termos-de-uso" component={TermosDeUso} />
            <Route path="/parceiros" component={Parceiros} />
            <Route path="/como-ser-parceiro" component={ComoSerParceiro} />
            <Route path={"/404"} component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
