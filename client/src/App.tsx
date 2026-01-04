import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Manifesto from "./pages/Manifesto";
import MBAs from "./pages/MBAs";
import MBADetail from "./pages/MBADetail";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/manifesto"} component={Manifesto} />
        <Route path={"/mbas"} component={MBAs} />
        <Route path={"/mbas/:id"} component={MBADetail} />
        <Route path={"/graduacao"} component={Home} /> {/* Placeholder for now */}
        <Route path={"/cursos-gratuitos"} component={Home} /> {/* Placeholder for now */}
        <Route path={"/insights"} component={Home} /> {/* Placeholder for now */}
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
