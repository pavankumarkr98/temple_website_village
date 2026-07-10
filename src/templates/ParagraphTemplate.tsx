interface ParagraphProps {
  content: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}

export function ParagraphTemplate({ 
  content, 
  align = 'left', 
  size = 'base',
  className = '' 
}: ParagraphProps) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  const fontSize = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <div className={`${alignment[align]} ${fontSize[size]} leading-relaxed text-gray-700 dark:text-gray-300 my-4 ${className}`}>
      {content}
    </div>
  );
}