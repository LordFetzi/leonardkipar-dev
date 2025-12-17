import React from 'react';
import './frostedContainer.css';

type FrostedContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function FrostedContainer({ children, className = '', style }: FrostedContainerProps) {
  return (
    <div className={`frosted-glass ${className}`} style={style}>
      {children}
    </div>
  );
}
