import { motion } from "framer-motion";
import { Heart, Globe, Users, Eye, Calendar, MapPin, ExternalLink, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function ResponsabilidadeSocial() {
  return (
    <div className="min-h-screen bg-void-black text-white selection:bg-red-500 selection:text-void-black overflow-hidden pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 text-xs font-mono mb-6">
              <Heart className="w-3 h-3" />
              <span>SOCIAL IMPACT</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-display">
              COMPROMISSO COM A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">INCLUSÃO</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A FABRANI reafirma seu comprometimento com a responsabilidade social através de parcerias significativas e apoio a causas nobres. Nosso objetivo é promover a inclusão e melhorar a qualidade de vida de pessoas com deficiência em diversas áreas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parcerias Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Instituto Abraçar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <HandHeart className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold">Instituto Abraçar Guariba</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Em nossa missão de apoiar a causa autista, temos orgulho de colaborar com o Instituto Abraçar Guariba. Esta organização sem fins lucrativos é dedicada a promover a qualidade de vida de pessoas com Transtorno do Espectro Autista (TEA) e outras deficiências mentais.
              </p>
              <p className="text-muted-foreground mb-8">
                A FABRANI reconhece a importância do Instituto em assegurar o pleno exercício da cidadania e está comprometida em contribuir para continuar seu trabalho vital.
              </p>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Rua São Martinho, 1575 - sala 1, Jardim Boa Vista, Guariba/SP</span>
                </div>
              </div>

              <Button asChild variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-black">
                <a href="https://www.institutoabracarguariba.org.br" target="_blank" rel="noopener noreferrer">
                  Visitar Site Oficial <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full opacity-20"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <HandHeart className="w-24 h-24 text-white/20 group-hover:text-red-500/50 transition-colors duration-500" />
                <div className="absolute bottom-4 right-4 text-xs font-mono text-white/40">PARCEIRO OFICIAL</div>
              </div>
            </div>
          </motion.div>

          {/* Congresso Autismo360 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-1 relative">
              <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full opacity-20"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-bl from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Users className="w-24 h-24 text-white/20 group-hover:text-red-600/50 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-white/40">EVENTO 2025</div>
              </div>
            </div>
            <div className="order-2">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold">Congresso Autismo360</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Estamos entusiasmados em apoiar o maior congresso sobre autismo do Brasil. O evento reúne especialistas, palestrantes autistas e oferece experiências transformadoras.
              </p>
              <p className="text-muted-foreground mb-8">
                A colaboração da FABRANI neste evento reforça nosso compromisso com a disseminação de conhecimento e inclusão social.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold text-sm">DATA</span>
                  </div>
                  <p className="text-sm">07, 08 e 09 de Novembro de 2025</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-bold text-sm">LOCAL</span>
                  </div>
                  <p className="text-sm">Hotel Vogue Square, Barra da Tijuca - RJ</p>
                </div>
              </div>

              <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                <a href="https://www.congressoautismo360.com" target="_blank" rel="noopener noreferrer">
                  Saiba Mais sobre o Evento <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Associação Olhos da Alma */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold">Associação Olhos da Alma</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Em nossa cidade sede, Jaboticabal, temos a honra de apoiar a Associação Olhos da Alma. Esta unidade oferece atendimento especializado a pessoas com deficiência visual.
              </p>
              <p className="text-muted-foreground mb-8">
                A associação atua em áreas vitais como Assistência e Desenvolvimento Social, Educação, Direitos, Esporte, Saúde e Cultura. Nossa parceria busca fortalecer iniciativas que promovem a autonomia e qualidade de vida.
              </p>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Rua Maestro Grossi, 348, Jaboticabal/SP</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full opacity-20"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Eye className="w-24 h-24 text-white/20 group-hover:text-red-500/50 transition-colors duration-500" />
                <div className="absolute bottom-4 right-4 text-xs font-mono text-white/40">PARCEIRO LOCAL</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Manifesto Final */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Compromisso da FABRANI</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            A FABRANI continua comprometida em ser um agente de mudança positiva nas comunidades em que atua. Através dessas parcerias com o Instituto Abraçar, o Congresso Autismo360 e a Associação Olhos da Alma, reafirmamos nosso papel na construção de uma sociedade mais inclusiva e equitativa. Estamos empenhados em continuar nosso apoio a causas que promovem bem-estar social e qualidade de vida para todos.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>
      </section>

    </div>
  );
}
