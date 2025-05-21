
import React, { useEffect, useState } from 'react';
import Split from 'split.js';

interface ResizablePanelProps {
  children: React.ReactNode[];
  direction?: 'horizontal' | 'vertical';
  defaultSizes?: number[];
  minSizes?: number[];
  className?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  direction = 'horizontal',
  defaultSizes = [50, 50],
  minSizes = [25, 25],
  className = '',
}) => {
  const [split, setSplit] = useState<Split.Instance | null>(null);
  const id = `split-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    if (children.length !== 2) {
      console.error('ResizablePanel requires exactly 2 children');
      return;
    }

    // Clean up previous split instance
    if (split) {
      split.destroy();
    }

    // Get the elements and cast them explicitly to HTMLElement[] to fix the type error
    const elements = Array.from(
      document.querySelectorAll(`#${id} > div`)
    ).map(el => el as HTMLElement);
    
    // Create new split instance
    const newSplit = Split(elements, {
      sizes: defaultSizes,
      minSize: minSizes,
      direction,
      gutterSize: 4,
      elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
      }),
      gutterStyle: () => ({
        'width': direction === 'horizontal' ? '4px' : '100%',
        'height': direction === 'vertical' ? '4px' : '100%',
      }),
    });

    setSplit(newSplit);

    return () => {
      if (newSplit) {
        newSplit.destroy();
      }
    };
  }, [children, direction]);

  return (
    <div 
      id={id} 
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} h-full w-full ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="overflow-auto h-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ResizablePanel;
