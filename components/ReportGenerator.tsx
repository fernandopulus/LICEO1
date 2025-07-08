
import React from 'react';
import { AbsenceRecord } from '../types';
import { downloadCSV } from '../utils/csv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface ReportGeneratorProps {
  records: AbsenceRecord[];
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ records }) => {
  const handleDownload = (period: 'month' | 'year') => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const filteredRecords = records.filter(record => {
      const recordDate = new Date(record.absenceDate);
      if (period === 'year') {
        return recordDate.getFullYear() === currentYear;
      }
      if (period === 'month') {
        return recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth;
      }
      return false;
    });
    
    if (filteredRecords.length === 0) {
        alert(`No hay registros para el ${period === 'month' ? 'mes' : 'año'} actual.`);
        return;
    }

    const filename = `informe_reemplazos_${period}_${now.toISOString().split('T')[0]}.csv`;
    downloadCSV(filteredRecords, filename);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generar Informes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => handleDownload('month')} variant="outline" className="w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Informe Mensual
        </Button>
        <Button onClick={() => handleDownload('year')} variant="outline" className="w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Informe Anual
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
