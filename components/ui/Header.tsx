
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 flex-shrink-0 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            LI
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Registro de Reemplazos Docentes</h1>
            <p className="text-sm text-slate-500">Liceo Industrial de Recoleta</p>
          </div>
        </div>
      </div>
    </header>
  );
};
