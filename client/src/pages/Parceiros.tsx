import { useState, useMemo } from "react";
import { Search, Filter, Building2, Briefcase, GraduationCap, Heart, Scale, Cpu, X } from "lucide-react";
import partnersData from "../data/partners.json";

// Mapeamento de categorias para ícones e labels
const categories = [
  { id: "all", label: "Todas", icon: Building2 },
  { id: "tecnologia", label: "Tecnologia", icon: Cpu },
  { id: "educacao", label: "Educação", icon: GraduationCap },
  { id: "saude", label: "Saúde", icon: Heart },
  { id: "marketing", label: "Marketing", icon: Briefcase },
  { id: "juridico", label: "Jurídico", icon: Scale },
  { id: "gestao-negocios", label: "Gestão", icon: Briefcase },
];

export default function Parceiros() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (catId: string) => {
    if (catId === "all") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    );
  };

  const filteredPartners = useMemo(() => {
    return partnersData.filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(partner.category);
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Empresas que Confiam na <span className="text-neon-cyan">FABRANI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça as organizações líderes que impulsionam a inovação junto conosco.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-neon-cyan transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar empresa..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all placeholder:text-muted-foreground/50"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = cat.id === "all" ? selectedCategories.length === 0 : selectedCategories.includes(cat.id);
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border
                      ${isActive 
                        ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                        : "bg-black/30 border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPartners.map((partner, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center aspect-square hover:border-neon-cyan/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                {partner.localPath ? (
                  <img 
                    src={partner.localPath} 
                    alt={partner.name}
                    className="max-w-[80%] max-h-[80%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 transform group-hover:scale-110"
                    onError={(e) => {
                      // Fallback para texto se a imagem falhar
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <div className="text-center">
                     <Building2 className="w-12 h-12 text-white/20 mx-auto mb-2 group-hover:text-neon-cyan transition-colors" />
                     <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors">{partner.name}</span>
                  </div>
                )}
                
                {/* Fallback Text Element (hidden by default) */}
                <div className="hidden text-center absolute inset-0 flex flex-col items-center justify-center p-4">
                   <Building2 className="w-12 h-12 text-white/20 mx-auto mb-2 group-hover:text-neon-cyan transition-colors" />
                   <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors">{partner.name}</span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#06b6d4]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhum parceiro encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar seus filtros ou busca.</p>
            <button 
              onClick={() => {setSearch(""); setSelectedCategories([]);}}
              className="mt-4 text-neon-cyan hover:underline"
            >
              Limpar tudo
            </button>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {[
            { label: "Empresas Parceiras", value: partnersData.length + "+" },
            { label: "Alunos Contratados", value: "85%" },
            { label: "Projetos em Conjunto", value: "120+" },
            { label: "Setores Atendidos", value: "15+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
