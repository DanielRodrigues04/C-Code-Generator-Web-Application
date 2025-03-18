# Gerador de Código C

Uma aplicação web moderna que gera código C usando o modelo CodeLlama através do Ollama.

![Screenshot da aplicação](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000)

## 🚀 Funcionalidades

- Interface intuitiva para entrada de prompts
- Geração de código C em tempo real
- Highlighting de sintaxe para melhor visualização
- Tratamento de erros robusto
- Design responsivo

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- [Ollama](https://ollama.ai) instalado e rodando
- Modelo CodeLlama instalado no Ollama

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd <seu-diretorio>
```

2. Instale as dependências:
```bash
npm install
```

3. Certifique-se de que o Ollama está instalado e rodando com o modelo CodeLlama:
```bash
ollama pull codellama
ollama run codellama
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 💻 Como Usar

1. Abra o navegador e acesse `http://localhost:5173`
2. Digite sua descrição do código C que deseja gerar no campo de texto
3. Clique em "Gerar Código"
4. O código C gerado aparecerá no painel à direita

## 🔧 Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)
- React Syntax Highlighter
- Ollama (CodeLlama)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.
