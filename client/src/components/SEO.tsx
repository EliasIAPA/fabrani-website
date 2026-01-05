import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://fabrani.com.br/images/og-image.jpg', 
  url = 'https://fabrani.com.br', 
  type = 'website' 
}: SEOProps) {
  const siteTitle = `${title} | FABRANI`;
  const defaultKeywords = "Faculdade IA, Inteligência Artificial, Graduação Marketing Digital, MBA Executivo, Cursos Gratuitos IA, FABRANI, Negócios Inovadores, Elias Evangelista de Souza, IA para Negócios, IA para Vendas, Pós graduação em IA, MBA em IA, como criar agentes de ia, CHATGPT, ia do google, atendimento com ia, IA para empresas";
  
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
