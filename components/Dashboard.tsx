import React, { useMemo } from 'react';
import { AbsenceRecord } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { BarChart } from './ui/BarChart';

interface DashboardProps {
  records: AbsenceRecord[];
}

const KpiCard: React.FC<{ title: string; value: string | number; description?: string }> = ({ title, value, description }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </CardContent>
    </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  const stats = useMemo(() => {
    const totalRecords = records.length;
    const horasRealizadas = records.filter(r => r.status === 'Hora realizada').length;
    const horasCubiertas = totalRecords - horasRealizadas;
    const tasaCoberturaEfectiva = totalRecords > 0 ? `${((horasRealizadas / totalRecords) * 100).toFixed(0)}%` : 'N/A';
    
    const replacementsBySubject = records.reduce((acc, record) => {
      acc[record.absentSubject] = (acc[record.absentSubject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartDataBySubject = Object.entries(replacementsBySubject)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
      
    const replacementsByCourse = records.reduce((acc, record) => {
        acc[record.absentCourse] = (acc[record.absentCourse] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartDataByCourse = Object.entries(replacementsByCourse)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    return { totalRecords, horasRealizadas, horasCubiertas, tasaCoberturaEfectiva, chartDataBySubject, chartDataByCourse };
  }, [records]);

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-16 text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          <p className="mt-4 font-semibold text-lg">No hay datos suficientes</p>
          <p className="text-sm">Agregue registros para poder visualizar el dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total de Reemplazos" value={stats.totalRecords} />
        <KpiCard title="Horas Realizadas" value={stats.horasRealizadas} description="Asignatura coincidente" />
        <KpiCard title="Horas Cubiertas" value={stats.horasCubiertas} description="Asignatura distinta" />
        <KpiCard title="Cobertura Efectiva" value={stats.tasaCoberturaEfectiva} description="Tasa de horas realizadas" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
            <CardTitle>Reemplazos por Asignatura</CardTitle>
            </CardHeader>
            <CardContent>
            {stats.chartDataBySubject.length > 0 ? (
                <div className="h-96">
                    <BarChart data={stats.chartDataBySubject} />
                </div>
            ) : (
                <p className="text-slate-500 text-center py-10">No hay datos de asignaturas para mostrar.</p>
            )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Reemplazos por Curso</CardTitle>
            </CardHeader>
            <CardContent>
            {stats.chartDataByCourse.length > 0 ? (
                <div className="h-96">
                    <BarChart data={stats.chartDataByCourse} />
                </div>
            ) : (
                <p className="text-slate-500 text-center py-10">No hay datos de cursos para mostrar.</p>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;