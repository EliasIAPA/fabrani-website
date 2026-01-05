import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Newsletter from "@/components/Newsletter";

export default function Blog() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <SEO 
        title="Blog FABRANI | Inteligência Artificial e Negócios"
        description="Artigos, análises e tendências sobre Inteligência Artificial aplicada aos negócios. Mantenha-se atualizado com o conteúdo da FABRANI."
        keywords="Blog IA, Artigos Inteligência Artificial, Tendências IA 2026, Negócios e Tecnologia, FABRANI Blog"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-neon-purple/50 text-neon-purple bg-neon-purple/10 mb-4 px-4 py-1">
            CONHECIMENTO DE PONTA
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hub de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Inteligência</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explorando a fronteira entre tecnologia e estratégia de negócios.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 hover:border-neon-cyan/30 transition-all duration-500 cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 md:hidden"></div>
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <Badge className="bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 border-none">
                      {featuredPost.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-neon-cyan transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{featuredPost.author}</span>
                    </div>
                    <span className="flex items-center gap-2 text-neon-cyan font-bold group-hover:translate-x-2 transition-transform">
                      Ler Artigo <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Newsletter Section (Middle) */}
        <div className="mb-20">
          <Newsletter />
        </div>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-neon-purple/30 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-purple transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-xs text-gray-400">Por {post.author}</span>
                    <span className="text-neon-purple text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ler mais <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
