
import { AbsenceRecord } from '../types';

export const downloadCSV = (data: AbsenceRecord[], filename: string): void => {
  const headers = [
    'ID Registro',
    'Profesor Ausente',
    'Asignatura Ausente',
    'Curso',
    'Fecha Ausencia',
    'Bloques Afectados',
    'Profesor Reemplazante',
    'Asignatura Reemplazo',
    'Fecha Reemplazo',
    'Bloques Cubiertos',
    'Estado'
  ];

  const csvRows = [headers.join(',')];

  for (const record of data) {
    const values = [
      record.id,
      `"${record.absentTeacher}"`,
      `"${record.absentSubject}"`,
      `"${record.absentCourse}"`,
      record.absenceDate,
      `"${record.affectedBlocks.join('; ')}"`,
      `"${record.replacementTeacher}"`,
      `"${record.replacementSubject}"`,
      record.replacementDate,
      `"${record.coveredBlocks.join('; ')}"`,
      `"${record.status}"`
    ];
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
