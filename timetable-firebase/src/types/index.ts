export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface TimetableEntry {
  day: string;
  slot: number;
  classroomId: string;
  subjectId: string;
  facultyId: string;
}

export interface TimetableOption {
  timetableId: string;
  score: number;
  conflicts: string[];
  schedule: TimetableEntry[];
}
