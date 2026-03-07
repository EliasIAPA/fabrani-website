import { TrendingUp, DollarSign, Users, ShieldCheck, Zap, Rocket, BarChart } from "lucide-react";

export const insights = [
  {
    id: 1,
    category: "Marketing",
    title: "Marketing Que Vende Enquanto Você Dorme",
    description: "Como criar 100 posts e 50 emails por semana com IA, reduzindo custos em 80% e multiplicando engajamento.",
    fullContent: `
      <h2>A Revolução do Marketing Autônomo</h2>
      <p>O marketing digital tradicional exige exércitos de redatores, designers e analistas. A IA muda esse jogo permitindo que uma única pessoa opere como uma agência inteira.</p>
      
      <h3>1. Criação de Conteúdo em Escala</h3>
      <p>Ferramentas como ChatGPT e Claude podem gerar calendários editoriais inteiros, roteiros de vídeo e legendas para redes sociais em minutos, não dias. O segredo está na engenharia de prompt para manter a voz da marca consistente.</p>
      
      <h3>2. Hiper-Personalização</h3>
      <p>Imagine enviar 10.000 emails onde cada um menciona um detalhe específico do negócio do cliente. Com IA, isso é trivial. A personalização em massa aumenta as taxas de abertura em até 300%.</p>
      
      <h3>3. Análise Preditiva de Tendências</h3>
      <p>Em vez de reagir ao que viralizou ontem, a IA analisa padrões de busca e conversas sociais para prever o que será tendência amanhã, permitindo que sua marca lidere a conversa.</p>
    `,
    stats: "Custo -80% | Engajamento 5x",
    image: "/images/insight-marketing.jpg",
    icon: "TrendingUp",
    color: "text-red-500",
    borderColor: "border-red-500/50"
  },
  {
    id: 2,
    category: "Vendas",
    title: "Vendedores Imparáveis + IA",
    description: "Assistentes de vendas em tempo real que aumentam o fechamento em 40% e reduzem o ciclo de vendas pela metade.",
    fullContent: `
      <h2>O Fim do "Eu Acho" em Vendas</h2>
      <p>Vendas sempre foi uma mistura de arte e ciência. A IA traz a ciência para o primeiro plano, eliminando a adivinhação do processo comercial.</p>
      
      <h3>1. Coaching em Tempo Real</h3>
      <p>Durante uma chamada, a IA analisa o tom de voz e as palavras do cliente, sugerindo ao vendedor a melhor resposta ou argumento para contornar objeções instantaneamente.</p>
      
      <h3>2. Lead Scoring Preditivo</h3>
      <p>Pare de perder tempo com leads frios. Algoritmos analisam centenas de variáveis para identificar quais prospects estão prontos para comprar agora, aumentando a eficiência do time em 40%.</p>
      
      <h3>3. Automação de Follow-up</h3>
      <p>A IA pode nutrir leads com mensagens personalizadas e naturais por meses, garantindo que nenhuma oportunidade seja esquecida, até que o cliente esteja pronto para falar com um humano.</p>
    `,
    stats: "Fechamento +40% | Ciclo -50%",
    image: "/images/insight-sales.jpg",
    icon: "DollarSign",
    color: "text-red-600",
    borderColor: "border-red-600/50"
  },
  {
    id: 3,
    category: "RH",
    title: "Contrate Certo, Retenha Talentos",
    description: "Recrutamento preditivo com 85% de acurácia e detecção precoce de burnout para blindar sua equipe.",
    fullContent: `
      <h2>RH Estratégico, Não Burocrático</h2>
      <p>O RH está deixando de ser um departamento de "papelada" para se tornar o centro de inteligência de talentos da empresa.</p>
      
      <h3>1. Triagem Imparcial de Currículos</h3>
      <p>A IA pode analisar milhares de currículos em segundos, focando puramente em habilidades e experiências, eliminando vieses inconscientes e encontrando as joias escondidas.</p>
      
      <h3>2. Previsão de Turnover</h3>
      <p>Analisando padrões de engajamento e feedback, a IA pode alertar gestores sobre quais colaboradores estão em risco de sair meses antes do pedido de demissão, permitindo ações preventivas.</p>
      
      <h3>3. Planos de Desenvolvimento Personalizados</h3>
      <p>Cada colaborador recebe uma trilha de aprendizado única, adaptada às suas lacunas de competência e objetivos de carreira, gerada automaticamente por IA.</p>
    `,
    stats: "Turnover -70% | Qualidade +300%",
    image: "/images/insight-hr.jpg",
    icon: "Users",
    color: "text-pink-500",
    borderColor: "border-pink-500/50"
  },
  {
    id: 4,
    category: "Atendimento",
    title: "Clientes Fanáticos São Criados",
    description: "Atendimento omnichannel unificado e resolução automática de 80% dos tickets sem intervenção humana.",
    fullContent: `
      <h2>Suporte 24/7 Realmente Inteligente</h2>
      <p>Esqueça os chatbots burros do passado. A nova geração de agentes de IA entende contexto, ironia e emoção.</p>
      
      <h3>1. Resolução Instantânea</h3>
      <p>80% das dúvidas dos clientes são repetitivas. A IA resolve essas questões em segundos, liberando os agentes humanos para resolver problemas complexos e construir relacionamentos.</p>
      
      <h3>2. Análise de Sentimento</h3>
      <p>O sistema monitora todas as interações e alerta supervisores imediatamente quando detecta um cliente frustrado, permitindo intervenção antes que a situação escale.</p>
      
      <h3>3. Suporte Proativo</h3>
      <p>A IA pode prever que um cliente terá um problema (baseado em logs de erro ou comportamento de navegação) e entrar em contato com a solução antes mesmo que o cliente reclame.</p>
    `,
    stats: "NPS +40pts | Custo -70%",
    image: "/images/insight-support.jpg",
    icon: "ShieldCheck",
    color: "text-yellow-400",
    borderColor: "border-yellow-400/50"
  },
  {
    id: 5,
    category: "Processos",
    title: "Processos Perfeitos = Lucros Explosivos",
    description: "Mapeamento automático e automação RPA que elimina 60% das tarefas administrativas repetitivas.",
    fullContent: `
      <h2>Eficiência Operacional Extrema</h2>
      <p>Empresas perdem milhões anualmente em ineficiências invisíveis. A IA ilumina e elimina esses gargalos.</p>
      
      <h3>1. Process Mining</h3>
      <p>A IA analisa os logs dos seus sistemas para desenhar o mapa real de como o trabalho flui na empresa, identificando gargalos e retrabalhos que nenhum consultor humano veria.</p>
      
      <h3>2. Automação Inteligente (RPA + AI)</h3>
      <p>Robôs de software agora podem ler documentos, interpretar emails e tomar decisões simples, automatizando processos complexos de ponta a ponta sem supervisão.</p>
      
      <h3>3. Gestão de Contratos e Documentos</h3>
      <p>A IA extrai dados críticos de contratos, notas fiscais e relatórios automaticamente, eliminando a digitação manual e os erros associados a ela.</p>
    `,
    stats: "Produtividade +40% | Erros -95%",
    image: "/images/insight-processes.jpg",
    icon: "Zap",
    color: "text-red-400",
    borderColor: "border-red-400/50"
  },
  {
    id: 6,
    category: "Produtos",
    title: "Inovação Não É Sorte. É Ciência.",
    description: "Identificação de oportunidades em 10 milhões de conversas e prototipagem rápida com IA.",
    fullContent: `
      <h2>Desenvolvimento de Produtos Guiado por Dados</h2>
      <p>Lançar produtos baseados em "feeling" é coisa do passado. A IA reduz drasticamente o risco de inovação.</p>
      
      <h3>1. Análise de Gap de Mercado</h3>
      <p>A IA varre reviews de concorrentes, fóruns e redes sociais para identificar exatamente o que os consumidores estão pedindo e ninguém está entregando.</p>
      
      <h3>2. Prototipagem Generativa</h3>
      <p>Descreva um produto e a IA gera designs, especificações técnicas e até código inicial em minutos, permitindo testar dezenas de conceitos no tempo que levaria para criar um.</p>
      
      <h3>3. Simulação de Cenários</h3>
      <p>Antes de lançar, simule como o mercado reagirá a diferentes preços e features usando modelos preditivos baseados em dados históricos.</p>
    `,
    stats: "Risco -80% | Time-to-market -50%",
    image: "/images/insight-product.jpg",
    icon: "Rocket",
    color: "text-green-400",
    borderColor: "border-green-400/50"
  }
];
