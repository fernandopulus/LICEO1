import React, { useState } from 'react';
import { AbsenceRecord } from '../types';
import BlockSelector from './BlockSelector';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

interface AbsenceFormProps {
  onSubmit: (data: Omit<AbsenceRecord, 'id' | 'status'>) => void;
}

const AbsenceForm: React.FC<AbsenceFormProps> = ({ onSubmit }) => {
  const today = new Date().toISOString().split('T')[0];
  const [absentTeacher, setAbsentTeacher] = useState('');
  const [absentSubject, setAbsentSubject] = useState('');
  const [absentCourse, setAbsentCourse] = useState('');
  const [absenceDate, setAbsenceDate] = useState(today);
  const [affectedBlocks, setAffectedBlocks] = useState<number[]>([]);
  
  const [replacementTeacher, setReplacementTeacher] = useState('');
  const [replacementSubject, setReplacementSubject] = useState('');
  const [replacementDate, setReplacementDate] = useState(today);

  const [error, setError] = useState<string | null>(null);

  const courses = [
    '1ºA', '1ºB', '1ºC', '1ºD', '1ºE',
    '2ºA', '2ºB', '2ºC', '2ºD',
    '3ºA', '3ºB', '3ºC', '3ºD',
    '4ºA', '4ºB', '4ºC', '4ºD'
  ];

  const subjects = [
    'Lengua y Literatura',
    'Matemática',
    'Inglés',
    'Filosofía',
    'Historia y Geografía',
    'Educación Ciudadana',
    'Ciencias',
    'Ciencias para la Ciudadanía',
    'Artes',
    'Música',
    'Educación Física',
    'Orientación',
    'Mecánica Industrial',
    'Mecánica Automotriz',
    'Emprendimiento',
    'Tecnología',
    'Pensamiento Lógico',
    'Competencia Lectora'
  ];

  const handleToggleBlock = (setter: React.Dispatch<React.SetStateAction<number[]>>) => (block: number) => {
    setter(prev => 
      prev.includes(block) ? prev.filter(b => b !== block) : [...prev, block].sort((a,b) => a - b)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!absentTeacher || !absentSubject || !absentCourse || affectedBlocks.length === 0 || !replacementTeacher || !replacementSubject) {
      setError("Por favor, complete todos los campos y seleccione al menos un bloque.");
      return;
    }
    setError(null);
    onSubmit({
      absentTeacher,
      absentSubject,
      absentCourse,
      absenceDate,
      affectedBlocks,
      replacementTeacher,
      replacementSubject,
      replacementDate,
      coveredBlocks: affectedBlocks,
    });
    // Reset form
    setAbsentTeacher('');
    setAbsentSubject('');
    setAbsentCourse('');
    setAbsenceDate(today);
    setAffectedBlocks([]);
    setReplacementTeacher('');
    setReplacementSubject('');
    setReplacementDate(today);
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Registrar Nuevo Reemplazo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="border-t pt-4 space-y-4">
            <legend className="text-lg font-semibold text-slate-700 -mt-8 px-2 bg-white">Profesor Ausente</legend>
            <div>
              <Label htmlFor="absentTeacher">Nombre del Profesor</Label>
              <Input id="absentTeacher" value={absentTeacher} onChange={e => setAbsentTeacher(e.target.value)} placeholder="Ej: Juan Pérez" required />
            </div>
            <div>
              <Label htmlFor="absentSubject">Asignatura</Label>
              <Select id="absentSubject" value={absentSubject} onChange={e => setAbsentSubject(e.target.value)} required>
                <option value="" disabled>Seleccione una asignatura</option>
                {subjects.map(subject => (
                  <option key={`absent-${subject}`} value={subject}>{subject}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="absentCourse">Curso</Label>
              <Select id="absentCourse" value={absentCourse} onChange={e => setAbsentCourse(e.target.value)} required>
                <option value="" disabled>Seleccione un curso</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="absenceDate">Día de la Ausencia</Label>
              <Input id="absenceDate" type="date" value={absenceDate} onChange={e => setAbsenceDate(e.target.value)} required />
            </div>
            <div>
              <Label>Bloques Afectados</Label>
              <BlockSelector selectedBlocks={affectedBlocks} onToggleBlock={handleToggleBlock(setAffectedBlocks)} />
            </div>
          </fieldset>

          <fieldset className="border-t pt-4 space-y-4">
            <legend className="text-lg font-semibold text-slate-700 -mt-8 px-2 bg-white">Profesor Reemplazante</legend>
            <div>
              <Label htmlFor="replacementTeacher">Nombre del Reemplazante</Label>
              <Input id="replacementTeacher" value={replacementTeacher} onChange={e => setReplacementTeacher(e.target.value)} placeholder="Ej: Ana Gómez" required />
            </div>
            <div>
              <Label htmlFor="replacementSubject">Asignatura que Imparte</Label>
               <Select id="replacementSubject" value={replacementSubject} onChange={e => setReplacementSubject(e.target.value)} required>
                <option value="" disabled>Seleccione una asignatura</option>
                {subjects.map(subject => (
                  <option key={`replacement-${subject}`} value={subject}>{subject}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="replacementDate">Día del Reemplazo</Label>
              <Input id="replacementDate" type="date" value={replacementDate} onChange={e => setReplacementDate(e.target.value)} required />
            </div>
          </fieldset>
          
          {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          
          <Button type="submit" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Guardar Registro
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AbsenceForm;