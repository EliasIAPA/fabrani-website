import { useRoute, Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { SEO } from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Newsletter from "@/components/Newsletter";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`Blog FABRANI, ${post.category}, ${post.title}, IA nos Negócios`}
        image={`https://fabrani.com.br${post.imageUrl}`}
        type="article"
      />

      {/* Progress Bar (Optional - could be added later) */}
      
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white hover:bg-white/5 pl-0 gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 px-3 py-1">
              {post.category}
            </Badge>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime} de leitura
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 border-y border-white/10 py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium text-white">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-neon-purple/10">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none mb-16 prose-headings:text-white prose-p:text-gray-300 prose-a:text-neon-cyan prose-strong:text-white prose-blockquote:border-l-neon-purple prose-blockquote:bg-zinc-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="flex items-center justify-between border-t border-b border-white/10 py-8 mb-16">
          <span className="font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-neon-cyan" /> Compartilhar Artigo
          </span>
          <div className="flex gap-4">
            <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-blue-400 hover:border-blue-400/50 transition-colors">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-sky-400 hover:border-sky-400/50 transition-colors">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-blue-600 hover:border-blue-600/50 transition-colors">
              <Facebook className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Newsletter Integration */}
        <Newsletter />
      </article>
    </div>
  );
}
