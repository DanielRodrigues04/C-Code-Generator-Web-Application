import React, { useState } from 'react';
import { Code2, Send, Terminal, Loader2 } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('c', c);

function App() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:11434/api/tags');
      if (!response.ok) {
        throw new Error('Ollama service is not running');
      }
      return true;
    } catch {
      return false;
    }
  };

  const generateCode = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First check if Ollama is running
      const isOllamaRunning = await checkOllamaStatus();
      if (!isOllamaRunning) {
        throw new Error('Ollama service is not running. Please start Ollama and make sure CodeLlama model is installed.');
      }

      const response = await fetch('http://127.0.0.1:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'codellama',
          prompt: `Write C code for the following request: ${prompt}. Only provide the code, no explanations.`,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}. ${errorData}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setCode(data.response);
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
      setCode('// Error occurred while generating code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">Gerador de Código C</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold">Seu Prompt</h2>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 bg-gray-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva o código C que você quer gerar..."
              />
              {error && (
                <div className="mt-2 text-red-400 text-sm">
                  Error: {error}
                </div>
              )}
              <button
                onClick={generateCode}
                disabled={loading || !prompt}
                className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Gerar Código
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Código Gerado</h2>
            </div>
            <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language="c"
                style={vs2015}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: '#1E1E1E',
                  minHeight: '200px',
                }}
              >
                {code || '// O código gerado aparecerá aqui...'}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;