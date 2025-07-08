
import React from 'react';
import { AbsenceRecord } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface HistoryLogProps {
  records: AbsenceRecord[];
}

const StatusBadge: React.FC<{ status: AbsenceRecord['status'] }> = ({ status }) => {
  const isRealizada = status === 'Hora realizada';
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isRealizada ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
      {status}
    </span>
  );
};

const HistoryLog: React.FC<HistoryLogProps> = ({ records }) => {
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
              <div key={record.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-800">
                    Ausencia: {record.absentTeacher}
                  </h3>
                  <StatusBadge status={record.status} />
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
