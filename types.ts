
export interface AbsenceRecord {
  id: string;
  absentTeacher: string;
  absentSubject: string;
  absentCourse: string;
  absenceDate: string;
  affectedBlocks: number[];
  replacementTeacher: string;
  replacementSubject: string;
  replacementDate: string;
  coveredBlocks: number[];
  status: "Hora realizada" | "Hora cubierta, pero no realizada";
}
