import { MarkdownRenderer } from './MarkdownRenderer';
import { CodeTemplate } from '../templates/CodeTemplate';
import { TableTemplate } from '../templates/TableTemplate';
import { ImageTemplate } from './ImageTemplate';
import { CalloutTemplate } from './CalloutTemplate';
import { QuizTemplate } from './QuizTemplate';

// Define content block types
export type ContentBlock = 
  | { type: 'paragraph'; content: string; align?: 'left' | 'center' | 'right' | 'justify'; size?: 'sm' | 'base' | 'lg' | 'xl' }
  | { type: 'markdown'; content: string }  // Add markdown type
  | { type: 'code'; code: string; language: string; title?: string; executable?: boolean }
  | { type: 'table'; columns: any[]; data: any[]; title?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; calloutType: 'info' | 'success' | 'warning' | 'danger' | 'tip'; title?: string; content: string }
  | { type: 'quiz'; question: string; options: any[]; explanation: string; points?: number };

interface ContentManagerProps {
  contentBlocks: ContentBlock[];
}

export function ContentManager({ contentBlocks }: ContentManagerProps) {
  return (
    <div className="space-y-6">
      {contentBlocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
          case 'markdown':
            return (
              <MarkdownRenderer
                key={index}
                content={block.content}
                className={`${block.type === 'paragraph' && block.align ? `text-${block.align}` : ''} ${block.type === 'paragraph' && block.size ? `text-${block.size}` : ''}`}
              />
            );
            
          case 'code':
            return (
              <CodeTemplate
                key={index}
                code={block.code}
                language={block.language}
                title={block.title}
                executable={block.executable}
              />
            );
            
          case 'table':
            return (
              <TableTemplate
                key={index}
                columns={block.columns}
                data={block.data}
                title={block.title}
              />
            );
            
          case 'image':
            return (
              <ImageTemplate
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            );
            
          case 'callout':
            return (
              <CalloutTemplate
                key={index}
                type={block.calloutType}
                title={block.title}
              >
                <MarkdownRenderer content={block.content} />
              </CalloutTemplate>
            );
            
          case 'quiz':
            return (
              <QuizTemplate
                key={index}
                question={block.question}
                options={block.options}
                explanation={block.explanation}
                points={block.points}
              />
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
}