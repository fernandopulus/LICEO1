
import React from 'react';

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`bg-white shadow-sm rounded-xl border border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-4 md:p-6 border-b border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h2 className={`text-xl font-bold text-slate-800 ${className}`} {...props}>
    {children}
  </h2>
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-4 md:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent };
