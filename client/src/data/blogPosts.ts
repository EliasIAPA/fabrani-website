export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ia-generativa-nos-negocios-2026",
    title: "O Impacto da IA Generativa nos Negócios em 2026",
    excerpt: "Descubra como empresas líderes estão utilizando LLMs para automatizar processos criativos e decisórios, reduzindo custos em até 40%.",
    content: `
      <p>A Inteligência Artificial Generativa deixou de ser uma promessa futurista para se tornar o motor central da eficiência corporativa em 2026. Não estamos mais falando apenas de chatbots simples ou geração de imagens; estamos testemunhando a reestruturação completa de fluxos de trabalho.</p>
      
      <h2>A Nova Era da Produtividade</h2>
      <p>Empresas que adotaram agentes autônomos para gestão de CRM e análise preditiva de vendas reportaram um aumento de produtividade de 300% no último ano. A capacidade da IA de analisar grandes volumes de dados não estruturados e fornecer insights acionáveis em tempo real é o que separa os líderes de mercado dos seguidores.</p>

      <h2>Automação Criativa</h2>
      <p>No marketing, a hiperpersonalização atingiu níveis inéditos. Campanhas inteiras são geradas, testadas e otimizadas por algoritmos que entendem a psicologia do consumidor melhor do que qualquer humano. O resultado? Taxas de conversão que desafiam as métricas tradicionais.</p>

      <h2>O Papel do Líder AI-Driven</h2>
      <p>Para os executivos, o desafio mudou. Não é mais sobre 'se' usar IA, mas 'como' orquestrar equipes híbridas de humanos e agentes digitais. A FABRANI prepara exatamente esse perfil de liderança: gestores que não apenas entendem a tecnologia, mas que sabem como extrair valor estratégico dela.</p>
    `,
    author: "Elias Evangelista",
    date: "02 Fev 2026",
    category: "Negócios",
    imageUrl: "/images/blog-business-ai.jpg",
    readTime: "5 min"
  },
  {
    id: "2",
    slug: "agentes-autonomos-revolucao",
    title: "Agentes Autônomos: A Próxima Fronteira da Automação",
    excerpt: "Esqueça os scripts rígidos. Os novos agentes de IA tomam decisões, executam tarefas complexas e aprendem com o feedback.",
    content: `
      <p>Se 2023 foi o ano do ChatGPT, 2026 é, sem dúvida, o ano dos Agentes Autônomos. Diferente dos modelos de linguagem passivos que aguardam um prompt, os agentes autônomos têm objetivos, memória e a capacidade de usar ferramentas para atingir metas.</p>

      <h2>Do Chat à Ação</h2>
      <p>Imagine um agente que não apenas escreve um e-mail de vendas, mas pesquisa o lead no LinkedIn, personaliza a mensagem com base nas notícias recentes da empresa alvo, envia o e-mail, monitora a resposta e agenda a reunião no seu calendário. Isso já é realidade.</p>

      <h2>Integração Profunda</h2>
      <p>Na FABRANI, ensinamos nossos alunos a construir e orquestrar esses agentes. A barreira de entrada técnica diminuiu, mas a necessidade de pensamento estratégico aumentou. Saber definir o objetivo e as restrições do agente é a nova habilidade de ouro.</p>

      <h2>Ética e Controle</h2>
      <p>Com grande poder vem grande responsabilidade. A governança de agentes autônomos é um tema central em nossos MBAs. Como garantir que o agente atue dentro dos limites éticos e legais da empresa? Essa é a discussão que estamos liderando.</p>
    `,
    author: "Prof. Carlos Eduardo",
    date: "28 Jan 2026",
    category: "Tecnologia",
    imageUrl: "/images/blog-agents.jpg",
    readTime: "7 min"
  },
  {
    id: "3",
    slug: "futuro-educacao-personalizada",
    title: "O Fim da Sala de Aula Tradicional: Educação 100% Personalizada",
    excerpt: "Como a IA está permitindo que cada aluno tenha um currículo único, adaptado ao seu ritmo e estilo de aprendizado.",
    content: `
      <p>O modelo industrial de educação — todos aprendendo a mesma coisa, no mesmo ritmo, da mesma forma — está obsoleto. A Inteligência Artificial viabilizou o sonho da tutoria individual em escala.</p>

      <h2>O Tutor Infinito</h2>
      <p>Sistemas de IA adaptativos mapeiam as lacunas de conhecimento de cada estudante em tempo real. Se um aluno tem dificuldade em estatística, o sistema ajusta a explicação, oferece exemplos práticos ligados aos hobbies do aluno e desacelera o ritmo. Se outro voa no conteúdo, o sistema aprofunda e desafia.</p>

      <h2>A Experiência FABRANI</h2>
      <p>Nossa metodologia AI-First não é apenas sobre o que ensinamos, mas *como* ensinamos. Utilizamos plataformas que se adaptam ao perfil cognitivo de cada aluno do MBA, garantindo que o aprendizado seja eficiente e engajador.</p>

      <h2>Lifelong Learning Turbinado</h2>
      <p>Em um mundo onde o conhecimento técnico tem meia-vida de 2 anos, aprender a aprender é vital. A IA atua como um copiloto de carreira, sugerindo micro-certificações e atualizações baseadas nas tendências de mercado detectadas em tempo real.</p>
    `,
    author: "Equipe Pedagógica",
    date: "15 Jan 2026",
    category: "Educação",
    imageUrl: "/images/blog-education.jpg",
    readTime: "4 min"
  }
];
