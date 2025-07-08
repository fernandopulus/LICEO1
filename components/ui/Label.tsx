
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
  return (
    <label className={`block text-sm font-medium text-slate-700 mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
};

export { Label };
