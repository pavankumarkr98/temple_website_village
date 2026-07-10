import { useState } from 'react';
import { Copy, Check, Play, Terminal } from 'lucide-react';

interface CodeTemplateProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  executable?: boolean;
}

export function CodeTemplate({ 
  code, 
  language = 'python',
  title = 'example.py',
  showLineNumbers = true,
  executable = false 
}: CodeTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [running, setRunning] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    setRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput(`>>> ${code.split('\n')[0]}\nCode executed successfully!`);
      setRunning(false);
    }, 1000);
  };

  return (
    <div className="my-6">
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">{title}</span>
            <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
              {language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {executable && (
              <button
                onClick={runCode}
                disabled={running}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm disabled:opacity-50"
              >
                <Play className="w-3 h-3" />
                {running ? 'Running...' : 'Run'}
              </button>
            )}
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Code */}
        <pre className={`p-4 overflow-x-auto ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code className={`language-${language} text-gray-100`}>
            {code}
          </code>
        </pre>
      </div>
      
      {/* Output */}
      {output && (
        <div className="mt-2 bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-2">Output:</div>
          <pre className="text-sm text-gray-200 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}