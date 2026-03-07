# Project TODO

## Completed
- [x] Estrutura global do site (Menu, Rodapé, Layout)
- [x] Otimização SEO (Meta tags, Sitemap, Robots.txt)
- [x] Blog de IA e Newsletter
- [x] Integração SOPHIA AI (WhatsApp Widget)
- [x] Upload do Guia de Prompts 2026
- [x] Integração Brevo API (Backend seguro)
- [x] Formulário de captura de leads (BrevoForm)

## In Progress

## Recently Completed
- [x] Linkar formulário Brevo no botão de download do Guia de Prompts

## Backlog
- [ ] Criar listas segmentadas na Brevo
- [ ] Automação de e-mail de boas-vindas
- [ ] Dashboard de conversão de leads

## Bugs
- [x] Botão "BAIXAR PDF AGORA" não está redirecionando para o formulário Brevo (resolvido: link funciona)

## In Progress

## Recently Completed
- [x] Incorporar formulário Brevo como iframe em modal ao invés de redirecionar

## Critical Bugs
- [x] Botão "BAIXAR RELATÓRIO COMPLETO" no hero está redirecionando para WhatsApp ao invés de abrir modal Brevo (RESOLVIDO)

## In Progress

## Recently Completed
- [x] Incorporar formulário Brevo diretamente na página (sem modal) em seção dedicada

## In Progress

## Recently Completed
- [x] Substituir iframe bloqueado por formulário nativo integrado com API Brevo

## In Progress

## Recently Completed
- [x] Remover todos os links de WhatsApp dos botões do site

## Critical Bugs
- [x] Formulário Brevo não está aparecendo na página Hub de Insights (RESOLVIDO: aumentado contraste dos inputs)

## URGENT
- [x] Formulário Brevo não aparece no site publicado fabrani.com.br - investigar e criar alternativa na Home (RESOLVIDO: cores RGBA explícitas + seção na Home)

## In Progress

## Recently Completed
- [x] Adicionar seletor de código de país (+55) no campo WhatsApp
- [x] Personalizar mensagem de sucesso: "Obrigado! Aproveite seu Guia! Guia enviado para seu email!"
- [x] Substituir formulário nativo pelo formulário HTML da Brevo na Home Page (código fornecido pelo usuário)

## In Progress
- [x] Substituir formulário Brevo atual pelo novo código HTML com campos NOME, EMAIL e WHATSAPP

## Bugs
- [x] Formulário Brevo redireciona para página externa ao invés de processar na própria página (RESOLVIDO: formulário nativo com envio AJAX)

- [x] Criar popup/modal para formulário Brevo responsivo para mobile (alterado para abrir em nova aba devido a bloqueio de iframe pela Brevo)

## Bugs Resolvidos
- [x] Imagens não estão carregando corretamente após mudança para Git (ex: logotipo da FABRANI no menu) - RESOLVIDO: Logotipo agora está carregando e visível no menu (aumentado de h-10 para h-12)

## Tarefas Concluídas
- [x] Auditar e corrigir TODAS as imagens do site (problema: imagens não aparecem em fabrani.com.br mas aparecem em manus.im) - RESOLVIDO: Todas as imagens agora usam importação ES com ?url

## Novas Tarefas Concluídas
- [x] Adicionar submenu "Como ser Parceiro" em PARCERIA com conteúdo sobre certificação de cursos MEC

## Redesign PRETO E VERMELHO Premium (Em Andamento)

### Imagens IA Geradas
- [x] Hero Home (circuitos neon vermelho)
- [x] Card Manifesto, Simulador, Elite, Parceiros
- [x] Hero Graduação AI-Driven
- [x] Hero MBA Aplicação
- [x] Card Marketing Digital e Negócios Imobiliários
- [x] Hero MBA Business, Hub Insights, Parceiros
- [x] Card MBA Saúde

### Páginas Atualizadas (neon-cyan/purple → vermelho)
- [x] Home.tsx - Hero, Carta Aberta, Simulador, Elite, Lead Magnet
- [x] GraduacaoMarketing.tsx - Hero + Cards + Acordeão
- [x] GraduacaoImobiliaria.tsx - Hero + Cards
- [x] MBAs.tsx - Hero + Cards + Botões

### Páginas Pendentes
- [ ] MBADetail.tsx
- [ ] HubInsights.tsx
- [ ] InsightDetail.tsx
- [ ] IAParaNegocios.tsx
- [ ] IAParaNegociosLP.tsx
- [ ] Manifesto.tsx
- [ ] Parceiros.tsx
- [ ] ComoSerParceiro.tsx
- [ ] FabraniIAPlus.tsx
- [ ] NAP.tsx
- [ ] CPA.tsx
- [ ] ResponsabilidadeSocial.tsx
- [ ] TrabalheConosco.tsx
- [ ] PIVIC.tsx
- [ ] PoliticaCookies.tsx
- [ ] PoliticaPrivacidade.tsx
- [ ] TermosDeUso.tsx

### Componentes Globais Pendentes
- [ ] Layout.tsx (Header/Footer) - Atualizar cores
- [ ] ObsolescenceSimulator.tsx - Atualizar cores
- [ ] CertificateMockup.tsx - Atualizar cores
- [ ] index.css - Atualizar variáveis CSS globais
- [ ] Testes responsividade mobile
