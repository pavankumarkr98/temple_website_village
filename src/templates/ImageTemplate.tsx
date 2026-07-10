interface ImageTemplateProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  shadow?: boolean;
}

export function ImageTemplate({
  src,
  alt,
  caption,
  width = '100%',
  height = 'auto',
  rounded = false,
  shadow = true
}: ImageTemplateProps) {
  return (
    <div className="my-6">
      <div className={`overflow-hidden ${rounded ? 'rounded-xl' : ''} ${shadow ? 'shadow-lg' : ''}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          style={{ width, height }}
        />
      </div>
      {caption && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
          {caption}
        </div>
      )}
    </div>
  );
}