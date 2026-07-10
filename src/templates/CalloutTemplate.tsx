import React from 'react';
import { AlertCircle, CheckCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';

type CalloutType = 'info' | 'success' | 'warning' | 'danger' | 'tip';

interface CalloutTemplateProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function CalloutTemplate({ type, title, children }: CalloutTemplateProps) {
  const styles = {
    info: {
      icon: <Info className="w-5 h-5" />,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300'
    },
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300'
    },
    danger: {
      icon: <AlertCircle className="w-5 h-5" />,
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300'
    },
    tip: {
      icon: <Lightbulb className="w-5 h-5" />,
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-800 dark:text-purple-300'
    }
  };

  const style = styles[type];

  return (
    <div className={`my-6 p-4 rounded-lg border ${style.bg} ${style.border}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${style.text}`}>
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <div className={`font-semibold mb-1 ${style.text}`}>
              {title}
            </div>
          )}
          <div className="text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}