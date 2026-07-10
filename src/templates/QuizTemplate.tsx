import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuizTemplateProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  points?: number;
}

export function QuizTemplate({ question, options, explanation, points = 10 }: QuizTemplateProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (optionId: number) => {
    if (selectedOption === null) {
      setSelectedOption(optionId);
      setShowExplanation(true);
    }
  };

  return (
    <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Quiz</h4>
        </div>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
          {points} points
        </span>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 mb-6 text-lg">{question}</p>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.isCorrect;
          
          let optionStyle = "p-4 rounded-lg border cursor-pointer transition-all ";
          
          if (selectedOption !== null) {
            if (isSelected) {
              optionStyle += isCorrect
                ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
            } else if (isCorrect) {
              optionStyle += "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20";
            }
          } else {
            optionStyle += "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
          }
          
          return (
            <div
              key={option.id}
              className={optionStyle}
              onClick={() => handleSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {String.fromCharCode(64 + option.id)}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{option.text}</span>
                </div>
                {isSelected && (
                  isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {showExplanation && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <div className="text-blue-600 dark:text-blue-400 mt-0.5">💡</div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Explanation:</strong> {explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}