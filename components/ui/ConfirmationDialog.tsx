
import React from 'react';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      style={{ animation: 'fadeIn 0.2s forwards' }}
      aria-labelledby="confirmation-dialog-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <Card
        className="w-full max-w-md mx-4 transition-transform duration-300 ease-in-out"
        style={{ animation: 'scaleIn 0.2s forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <CardTitle id="confirmation-dialog-title">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">{children}</p>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Sí, eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationDialog;
