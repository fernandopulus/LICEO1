
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-8">
      <div className="container mx-auto py-4 px-4 md:px-6 lg:px-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Liceo Industrial de Recoleta. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
