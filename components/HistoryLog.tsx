
import React from 'react';
import { AbsenceRecord } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface HistoryLogProps {
  records: AbsenceRecord[];
  onDeleteRecord: (id: string) => void;
}

const StatusBadge: React.FC<{ status: AbsenceRecord['status'] }> = ({ status }) => {
  const isRealizada = status === 'Hora realizada';
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isRealizada ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
      {status}
    </span>
  );
};

const HistoryLog: React.FC<HistoryLogProps> = ({ records, onDeleteRecord }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Registros</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 font-semibold">Aún no hay registros.</p>
            <p className="text-sm">Utilice el formulario para agregar el primero.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
            {records.map(record => (
              <div key={record.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-800">
                    Ausencia: {record.absentTeacher}
                  </h3>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={record.status} />
                    <button
                      onClick={() => onDeleteRecord(record.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 opacity-0 group-hover:opacity-100"
                      aria-label="Eliminar registro"
                      title="Eliminar registro"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-600">
                    <div><span className="font-semibold text-slate-700">Asignatura Ausente:</span> {record.absentSubject}</div>
                    <div><span className="font-semibold text-slate-700">Reemplazante:</span> {record.replacementTeacher}</div>
                    <div><span className="font-semibold text-slate-700">Curso Afectado:</span> {record.absentCourse}</div>
                    <div><span className="font-semibold text-slate-700">Asignatura Reemplazo:</span> {record.replacementSubject}</div>
                    <div><span className="font-semibold text-slate-700">Fecha:</span> {new Date(record.absenceDate).toLocaleDateString('es-CL', { timeZone: 'UTC' })}</div>
                    <div><span className="font-semibold text-slate-700">Bloques:</span> {record.affectedBlocks.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryLog;
