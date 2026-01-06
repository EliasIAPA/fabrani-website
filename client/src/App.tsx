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
import FabraniIAPlus from "@/pages/FabraniIAPlus";
import IAParaNegocios from "@/pages/IAParaNegocios";
import IAParaNegociosLP from "@/pages/IAParaNegociosLP";

function Router() {
  return (
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
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
