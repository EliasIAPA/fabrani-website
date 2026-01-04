# 🛡️ PROTOCOLO DE SEGURANÇA CIBERNÉTICA - FABRANI

**Classificação:** CONFIDENCIAL | **Nível de Acesso:** CAIO & Proprietário
**Responsável:** CAIO (Chief AI Security Officer)
**Contato de Emergência:** elias.evangelista@gmail.com

---

## 1. PREMISSAS DE GOVERNANÇA (ZERO TRUST)

Este documento estabelece as diretrizes irrevogáveis para a proteção da integridade digital da FABRANI. Assumimos que o perímetro já foi violado; portanto, a segurança deve ser intrínseca a cada componente.

### 1.1. Controle de Alterações Críticas
Qualquer modificação que afete a integridade estrutural, banco de dados de alunos ou disponibilidade do site é classificada como **CRÍTICA**.

*   **Gatilho de Alerta:** Detecção de deleção em massa (>5 arquivos), alteração em arquivos de configuração (`.env`, `vite.config.ts`) ou injeção de scripts externos.
*   **Protocolo de Bloqueio:** O sistema deve suspender a operação de deploy automaticamente.
*   **Confirmação Obrigatória:** Um token de autorização único será enviado para **elias.evangelista@gmail.com**. A alteração só prossegue após validação manual.

### 1.2. Monitoramento de Ameaças (SIEM)
*   **Log de Acesso:** Todos os acessos administrativos devem registrar IP, User-Agent, Timestamp e Geolocalização.
*   **Padrões Anormais:**
    *   Múltiplas falhas de login (>3 em 1 minuto).
    *   Acessos fora do horário comercial (00h - 05h) originados de países não listados na *whitelist*.
    *   Alterações diretas no banco de dados sem migração registrada.

---

## 2. ARQUITETURA DE DEFESA (HARDENING)

### 2.1. Proteção de Aplicação (WAF & Headers)
A aplicação deve implementar rigorosas políticas de segurança no nível do navegador e servidor:

*   **Content-Security-Policy (CSP):** Proibir carregamento de scripts de domínios desconhecidos. Apenas `*.fabrani.com.br`, `*.google.com` (Analytics), e `*.whatsapp.com` são permitidos.
*   **X-Frame-Options:** DENY (Impede Clickjacking).
*   **X-Content-Type-Options:** nosniff.
*   **Referrer-Policy:** strict-origin-when-cross-origin.

### 2.2. Sanitização de Entradas
*   Todas as entradas de formulários (Trabalhe Conosco, Pesquisa) devem passar por validação rigorosa para prevenir SQL Injection e XSS (Cross-Site Scripting).

---

## 3. PROTOCOLO "BLACK BOX" (BACKUP IMUTÁVEL)

**ATENÇÃO: ESTA SEÇÃO É RESTRITA.**

Para garantir a resiliência contra ataques de *Ransomware* ou sabotagem interna:

1.  **Backup Oculto:** Um script automatizado (`.security/blackbox_backup.sh`) executa cópias diárias do código-fonte e banco de dados.
2.  **Armazenamento Seguro:** Os backups são criptografados (AES-256) e armazenados em um diretório oculto e/ou bucket S3 com versionamento ativado.
3.  **Política de Retenção:** 12 Meses (Rolling Window).
4.  **Simulação de Deleção (Honeypot):**
    *   Se um atacante (ou usuário comprometido) solicitar a deleção dos backups, o sistema executará uma interface de "Deleção com Sucesso".
    *   **Realidade:** Os arquivos são apenas movidos para uma camada de armazenamento "frio" (Cold Storage) e marcados como `_DELETED_ATTEMPT_{TIMESTAMP}`.
    *   **Recuperação:** A restauração só pode ser iniciada pelo CAIO mediante chave física ou autenticação de dois fatores do proprietário.

---

## 4. PLANO DE RESPOSTA A INCIDENTES (IRP)

Em caso de detecção de violação:

1.  **Isolamento:** O servidor entra em modo "Lockdown" (apenas leitura).
2.  **Notificação:** E-mail imediato para elias.evangelista@gmail.com com relatório forense preliminar (IP de origem, vetores de ataque).
3.  **Restauração:** Ativação do último backup limpo do cofre "Black Box".
4.  **Análise Forense:** Preservação de logs para medidas legais.

---

*Assinado digitalmente,*
**CAIO - Chief AI Security Officer**
*FABRANI Security Division*
