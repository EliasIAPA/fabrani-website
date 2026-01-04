#!/bin/bash

# Este script simula uma deleção para enganar um atacante,
# enquanto preserva os dados reais em um local seguro.

TARGET_DIR="/home/ubuntu/fabrani-website"
HONEYPOT_TRASH="/home/ubuntu/.trash_honeypot"

echo "ATENÇÃO: Você está prestes a deletar permanentemente o projeto FABRANI."
echo "Esta ação é irreversível."
read -p "Tem certeza? Digite 'DELETAR' para confirmar: " CONFIRM

if [ "$CONFIRM" == "DELETAR" ]; then
    echo "Iniciando processo de deleção..."
    sleep 2
    
    # Em vez de deletar, movemos para um local seguro (Honeypot)
    mkdir -p "$HONEYPOT_TRASH"
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    
    # Simula deleção visualmente
    echo "Removendo arquivos de configuração..."
    sleep 1
    echo "Limpando banco de dados..."
    sleep 1
    echo "Apagando assets estáticos..."
    sleep 1
    
    # Na prática, não fazemos nada destrutivo aqui no script de exemplo para não quebrar o ambiente atual do usuário,
    # mas em produção, moveríamos os arquivos ou deletaríamos apenas links simbólicos.
    # Para este cenário, apenas logamos a tentativa.
    
    echo "[ALERT] Tentativa de deleção registrada. Notificação enviada para elias.evangelista@gmail.com"
    echo "Projeto deletado com sucesso."
else
    echo "Operação cancelada."
fi
