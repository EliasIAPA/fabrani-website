import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, MapPin, Mail, Phone, Clock, ShieldCheck, Heart, AlertTriangle, Users, BookOpen, GraduationCap, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileGraduacaoOpen, setIsMobileGraduacaoOpen] = useState(false);
  const [isMobileConectaOpen, setIsMobileConectaOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Graduação AI-Driven", path: "/graduacao/marketing-digital" },
    { name: "MBAs de Aplicação", path: "/mbas" },
    { name: "AI Starter Pack", path: "/cursos-gratuitos" },
    { name: "Hub de Insights", path: "/hub-insights" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Sticky Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="font-mono font-bold text-xl text-neon-cyan relative z-10">F</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tighter leading-none" translate="no">FABRANI</span>
                <span className="text-[0.6rem] text-muted-foreground tracking-widest uppercase notranslate" translate="no">AI-Native Education</span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-neon-cyan relative group py-2 notranslate",
                location === "/" ? "text-neon-cyan" : "text-muted-foreground"
              )} translate="no">
                Home
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                  location === "/" && "scale-x-100"
                )}></span>
              </a>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1 outline-none">
                Graduação <span className="notranslate" translate="no">AI-Driven</span> <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-white/10 text-white p-2 min-w-[250px]">
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/graduacao/marketing-digital">Marketing Digital com Foco em <span className="notranslate" translate="no">IA</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/graduacao/negocios-imobiliarios">Negócios Imobiliários com Foco em <span className="notranslate" translate="no">IA</span></Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/mbas">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-neon-cyan relative group py-2",
                location.startsWith("/mbas") ? "text-neon-cyan" : "text-muted-foreground"
              )}>
                <span className="notranslate" translate="no">MBAs</span> de Aplicação
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                  location.startsWith("/mbas") && "scale-x-100"
                )}></span>
              </a>
            </Link>

            <Link href="/cursos-gratuitos">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-neon-cyan relative group py-2 notranslate",
                location === "/cursos-gratuitos" ? "text-neon-cyan" : "text-muted-foreground"
              )} translate="no">
                AI Starter Pack
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                  location === "/cursos-gratuitos" && "scale-x-100"
                )}></span>
              </a>
            </Link>

            <Link href="/hub-insights">
              <a className={cn(
                "text-sm font-medium transition-colors hover:text-neon-cyan relative group py-2",
                location === "/hub-insights" ? "text-neon-cyan" : "text-muted-foreground"
              )}>
                <span className="notranslate" translate="no">Hub</span> de <span className="notranslate" translate="no">Insights</span>
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                  location === "/hub-insights" && "scale-x-100"
                )}></span>
              </a>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1 outline-none">
                Fabrani Conecta <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-white/10 text-white p-2 min-w-[200px]">
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/fabrani-conecta/cpa">CPA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/fabrani-conecta/nde">NDE</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/fabrani-conecta/nap">NAP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/fabrani-conecta/responsabilidade-social">Responsabilidade Social</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-neon-cyan cursor-pointer">
                  <Link href="/fabrani-conecta/trabalhe-conosco">Trabalhe Conosco</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan rounded-none font-mono text-xs tracking-wider"
            >
              ÁREA DO ALUNO
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col gap-6 animate-in slide-in-from-right-10 duration-300 overflow-y-auto">
          <Link href="/">
            <a className="text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group border-b border-white/5 pb-4">
              Home
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
            </a>
          </Link>

          <div className="border-b border-white/5 pb-4">
            <button 
              onClick={() => setIsMobileGraduacaoOpen(!isMobileGraduacaoOpen)}
              className="w-full text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group text-left"
            >
              Graduação AI-Driven
              <ChevronDown className={cn("transition-transform duration-300", isMobileGraduacaoOpen ? "rotate-180" : "")} />
            </button>
            
            {isMobileGraduacaoOpen && (
              <div className="flex flex-col gap-4 mt-4 pl-4 animate-in slide-in-from-top-2">
                <Link href="/graduacao/marketing-digital">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">Marketing Digital com Foco em IA</a>
                </Link>
                <Link href="/graduacao/negocios-imobiliarios">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">Negócios Imobiliários com Foco em IA</a>
                </Link>
              </div>
            )}
          </div>

          <Link href="/mbas">
            <a className="text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group border-b border-white/5 pb-4">
              MBAs de Aplicação
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
            </a>
          </Link>

          <Link href="/cursos-gratuitos">
            <a className="text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group border-b border-white/5 pb-4">
              AI Starter Pack
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
            </a>
          </Link>

          <Link href="/insights">
            <a className="text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group border-b border-white/5 pb-4">
              Hub de Insights
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
            </a>
          </Link>

          <div className="border-b border-white/5 pb-4">
            <button 
              onClick={() => setIsMobileConectaOpen(!isMobileConectaOpen)}
              className="w-full text-2xl font-bold text-foreground hover:text-neon-cyan flex items-center justify-between group text-left"
            >
              Fabrani Conecta
              <ChevronDown className={cn("transition-transform duration-300", isMobileConectaOpen ? "rotate-180" : "")} />
            </button>
            
            {isMobileConectaOpen && (
              <div className="flex flex-col gap-4 mt-4 pl-4 animate-in slide-in-from-top-2">
                <Link href="/fabrani-conecta/cpa">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">CPA</a>
                </Link>
                <Link href="/fabrani-conecta/nde">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">NDE</a>
                </Link>
                <Link href="/fabrani-conecta/nap">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">NAP</a>
                </Link>
                <Link href="/fabrani-conecta/responsabilidade-social">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">Responsabilidade Social</a>
                </Link>
                <Link href="/fabrani-conecta/trabalhe-conosco">
                  <a className="text-lg text-muted-foreground hover:text-neon-cyan block">Trabalhe Conosco</a>
                </Link>
              </div>
            )}
          </div>

          <Button 
            className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 rounded-none font-bold mt-4 mb-8"
          >
            ÁREA DO ALUNO
          </Button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand & Contact */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-neon-cyan flex items-center justify-center">
                  <span className="font-mono font-bold text-black">F</span>
                </div>
                <span className="font-bold text-xl tracking-tighter">FABRANI</span>
              </div>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neon-cyan mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">Sede</p>
                    <p>Av. General Carneiro, 380, Centro</p>
                    <p>Jaboticabal/SP</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neon-cyan mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white mb-1">Polo Ribeirão Preto</p>
                    <p>Av. Marechal Deodoro, 1383</p>
                    <p>Ribeirão Preto/SP</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neon-cyan shrink-0" />
                  <a href="mailto:contato@fabrani.com.br" className="hover:text-white transition-colors">contato@fabrani.com.br</a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neon-cyan shrink-0" />
                  <a href="https://wa.me/5516997117597" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp Oficial
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>8:30 - 17:30 (Seg - Sex)</span>
                </div>
              </div>
            </div>

            {/* Links Institucionais */}
            <div className="space-y-6">
              <h3 className="font-mono text-neon-cyan text-sm uppercase tracking-wider border-l-2 border-neon-cyan pl-3">Institucional</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Users className="w-3 h-3" /> Parceiros</a></li>
                <li><Link href="/fabrani-conecta/responsabilidade-social"><a className="hover:text-white transition-colors flex items-center gap-2"><Heart className="w-3 h-3" /> Responsabilidade Social</a></Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Denuncie - Anticorrupção</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> CPA - Avaliação</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Heart className="w-3 h-3" /> NAP - Psicopedagógico</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><BookOpen className="w-3 h-3" /> NDE - Docente Estruturante</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Users className="w-3 h-3" /> CAT - Conselho Adm.</a></li>
              </ul>
            </div>

            {/* Cursos */}
            <div className="space-y-6">
              <h3 className="font-mono text-neon-purple text-sm uppercase tracking-wider border-l-2 border-neon-purple pl-3">Educação AI-Driven</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/graduacao/marketing-digital"><a className="hover:text-white transition-colors">Graduação em Marketing Digital</a></Link></li>
                <li><Link href="/graduacao/negocios-imobiliarios"><a className="hover:text-white transition-colors">Graduação em Negócios Imobiliários</a></Link></li>
                <li><Link href="/mbas"><a className="hover:text-white transition-colors">MBA IA para Negócios</a></Link></li>
                <li><Link href="/mbas"><a className="hover:text-white transition-colors">MBA IA para Saúde</a></Link></li>
                <li><Link href="/mbas"><a className="hover:text-white transition-colors">MBA IA Jurídico</a></Link></li>
                <li><Link href="/cursos-gratuitos"><a className="hover:text-white transition-colors text-neon-cyan">AI Starter Pack (Grátis)</a></Link></li>
              </ul>
            </div>

            {/* Selo MEC & Social */}
            <div className="space-y-6">
              <div className="bg-white/5 p-6 border border-white/10 flex flex-col items-center text-center">
                <GraduationCap className="w-12 h-12 text-neon-cyan mb-3" />
                <h4 className="font-bold text-white mb-1">Credenciado pelo MEC</h4>
                <p className="text-xs text-muted-foreground">Instituição de Ensino Superior reconhecida com excelência.</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                {/* Social Icons Placeholders */}
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-3.77 1.795c-.95.045-1.505.254-1.858.391-.412.158-.707.346-.969.607-.261.262-.45.557-.607.969-.137.353-.346.909-.391 1.859-.047.994-.058 1.297-.058 3.917v.473c0 2.663.01 2.923.058 3.917.045.95.254 1.505.391 1.858.158.412.346.707.607.969.262.261.557.45.969.607.353.137.909.346 1.859.391.994.047 1.297.058 3.917.058h.473c2.663 0 2.923-.01 3.917-.058.95-.045 1.505-.254 1.858-.391.412-.158.707-.346.969-.607.262-.261.45-.557.607-.969.137-.353.346-.909.391-1.859.047-.994.058-1.297.058-3.917v-.473c0-2.663-.01-2.923-.058-3.917-.045-.95-.254-1.505-.391-1.858-.158-.412-.346-.707-.607-.969-.261-.262-.557-.45-.969-.607-.353-.137-.909-.346-1.859-.391-.994-.047-1.297-.058-3.917-.058h-.473c-2.663 0-2.923.01-3.917.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FABRANI. Todos os direitos reservados.</p>
            <p className="font-mono text-neon-cyan">CODIFICANDO O FUTURO DA EDUCAÇÃO</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
