import { useCloserAuth } from "@/hooks/useCloserAuth";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  UserPlus,
  LogOut,
  Menu,
  X,
  Building2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CloserLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { path: "/closer", label: "Dashboard", icon: LayoutDashboard },
  { path: "/closer/clientes", label: "Clientes", icon: Building2 },
  { path: "/closer/propostas", label: "Propostas", icon: FileText },
  { path: "/closer/vendas", label: "Vendas", icon: DollarSign },
];

const ADMIN_ITEMS = [
  { path: "/closer/closers", label: "Closers", icon: Users },
  { path: "/closer/novo-closer", label: "Novo Closer", icon: UserPlus },
];

export default function CloserLayout({ children }: CloserLayoutProps) {
  const { closer, isLoading, isAdmin } = useCloserAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutMutation = trpc.closer.logout.useMutation();
  const utils = trpc.useUtils();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    utils.closer.me.invalidate();
    window.location.href = "/closer/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!closer) return null;

  const isActive = (path: string) => {
    if (path === "/closer") return location === "/closer";
    return location.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/closer">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <span className="text-white font-black text-lg">F</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg tracking-tight">FABRANI</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Painel Closer</p>
              </div>
            </div>
          </Link>
          <button
            className="lg:hidden absolute top-6 right-4 text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-3 mb-2">
            Principal
          </p>
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive(item.path)
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive(item.path) && (
                  <ChevronRight className="w-3 h-3 ml-auto" />
                )}
              </div>
            </Link>
          ))}

          {isAdmin && (
            <>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-3 mt-6 mb-2">
                Administração
              </p>
              {ADMIN_ITEMS.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      isActive(item.path)
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
              {closer.name?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{closer.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                {closer.role === "admin" ? "Administrador" : "Closer"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-gray-400 border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
            onClick={handleLogout}
          >
            <LogOut className="w-3 h-3 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar mobile */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center gap-3">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white font-black text-xs">F</span>
            </div>
            <span className="text-white font-bold text-sm">FABRANI Closer</span>
          </div>
        </div>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
