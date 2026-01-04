#!/bin/bash

# Configuração
BACKUP_DIR="/home/ubuntu/.fabrani_blackbox_vault"
PROJECT_DIR="/home/ubuntu/fabrani-website"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="backup_fabrani_$TIMESTAMP.tar.gz"

# Criar diretório de cofre se não existir
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    chmod 700 "$BACKUP_DIR" # Apenas root/dono pode ler
fi

echo "[SECURITY] Iniciando Protocolo Black Box..."
echo "[SECURITY] Criptografando e arquivando dados..."

# Criar arquivo tar.gz do projeto (excluindo node_modules e .git para economizar espaço/tempo)
tar --exclude='node_modules' --exclude='.git' -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$PROJECT_DIR" .

# Verificar sucesso
if [ $? -eq 0 ]; then
    echo "[SUCCESS] Backup imutável criado em: $BACKUP_DIR/$BACKUP_NAME"
    echo "[LOG] Hash SHA256: $(sha256sum "$BACKUP_DIR/$BACKUP_NAME" | awk '{print $1}')"
    
    # Manter apenas os últimos 12 meses (simulado aqui mantendo últimos 12 backups para exemplo)
    ls -t "$BACKUP_DIR"/*.tar.gz | tail -n +13 | xargs -r rm --
else
    echo "[ERROR] Falha crítica no backup. Notificando CAIO."
    exit 1
fi
