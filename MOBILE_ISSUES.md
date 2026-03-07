# Mobile Issues Found (375px)

## Home Page
1. LOGOTIPO FABRANI CSS: Cortado - letras "F A B R A N i" muito grandes para 375px, cortando nas laterais
2. Badge MEC: Sobrepondo o logotipo no mobile - posição absolute conflitando
3. Subtítulo "FACULDADE BRASILEIRA DE NEGÓCIOS INOVADORES" cortado
4. Título "O MUNDO FOI REESCRITO PELA IA" - texto cortado na direita ("REESCR" visível, "ITO" cortado)
5. Menu desktop visível em 375px ao invés do menu hamburger (simulação CSS, não real mobile)
6. Badge MEC mobile deveria aparecer abaixo do título, não sobrepondo o logotipo

## Fixes Needed
- Reduzir tamanho do logotipo CSS para mobile (text-4xl ao invés de text-6xl)
- Ajustar posição do badge MEC para mobile
- Garantir que títulos não ultrapassem a largura da tela
- Verificar overflow-x: hidden em todas as seções
