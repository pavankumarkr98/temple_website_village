// components/MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Define proper type for code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="bg-gray-900 rounded-lg my-4 overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400">
                  {match ? `Language: ${match[1]}` : 'Code'}
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-100">{children}</code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }: any) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
          ),
          h2: ({ node, ...props }: any) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />
          ),
          h3: ({ node, ...props }: any) => (
            <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />
          ),
          p: ({ node, ...props }: any) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4" {...props} />
          ),
          ul: ({ node, ...props }: any) => (
            <ul className="list-disc pl-6 my-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          ol: ({ node, ...props }: any) => (
            <ol className="list-decimal pl-6 my-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          li: ({ node, ...props }: any) => (
            <li className="mb-1" {...props} />
          ),
          blockquote: ({ node, ...props }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />
          ),
          table: ({ node, ...props }: any) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
            </div>
          ),
          thead: ({ node, ...props }: any) => (
            <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
          ),
          th: ({ node, ...props }: any) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }: any) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" {...props} />
          ),
          a: ({ node, href, children, ...props }: any) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          strong: ({ node, ...props }: any) => (
            <strong className="font-semibold text-gray-900 dark:text-white" {...props} />
          ),
          em: ({ node, ...props }: any) => (
            <em className="italic" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}