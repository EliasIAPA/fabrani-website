import os
import re

def check_integrity(root_dir):
    print(f"[INTEGRITY] Iniciando varredura em: {root_dir}")
    issues = []
    
    # Padrões para encontrar links e imagens
    link_pattern = re.compile(r'href=["\'](.*?)["\']')
    img_pattern = re.compile(r'src=["\'](.*?)["\']')
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
                filepath = os.path.join(subdir, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                        # Verificar Links Vazios ou Suspeitos
                        links = link_pattern.findall(content)
                        for link in links:
                            if link == "" or link == "#":
                                issues.append(f"[WARNING] Link vazio encontrado em {file}")
                            if "http:" in link: # Forçar HTTPS
                                issues.append(f"[SECURITY] Link inseguro (HTTP) encontrado em {file}: {link}")
                                
                        # Verificar Imagens
                        imgs = img_pattern.findall(content)
                        for img in imgs:
                            if not img.startswith(('http', 'https', '/', 'data:')):
                                # Caminhos relativos complexos podem quebrar
                                issues.append(f"[CHECK] Caminho de imagem relativo em {file}: {img}")
                                
                except Exception as e:
                    print(f"[ERROR] Não foi possível ler {file}: {e}")

    if not issues:
        print("[SUCCESS] Integridade verificada. Nenhum problema crítico encontrado.")
    else:
        print(f"[REPORT] Encontrados {len(issues)} pontos de atenção:")
        for issue in issues:
            print(issue)

if __name__ == "__main__":
    check_integrity("/home/ubuntu/fabrani-website/client/src")
