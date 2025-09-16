export const departments = [
  { id: 'computer-science', name: 'Computer Science' },
  { id: 'electrical-engineering', name: 'Electrical Engineering' },
  { id: 'mechanical-engineering', name: 'Mechanical Engineering' },
];

export const semesters = [
  { id: 'semester-1', name: '1st Semester' },
  { id: 'semester-2', name: '2nd Semester' },
  { id: 'semester-3', name: '3rd Semester' },
  { id: 'semester-4', name: '4th Semester' },
  { id: 'semester-5', name: '5th Semester' },
  { id: 'semester-6', name: '6th Semester' },
  { id: 'semester-7', name: '7th Semester' },
  { id: 'semester-8', name: '8th Semester' },
];

export const subjects = {
  'computer-science': {
    'semester-1': [
      { id: 'cs101', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs102', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'cs103', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs104', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'cs105', name: 'DECO', credits: 3, type: 'core' },
      { id: 'cs106', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-2': [
      { id: 'cs201', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs202', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs203', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs204', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'cs205', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs206', name: 'Python Lab', credits: 2, type: 'core' },
    ] as const,
    'semester-3': [
      { id: 'cs301', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs302', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs303', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs304', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'cs305', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs306', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-4': [
      { id: 'cs401', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs402', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs403', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs404', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'cs405', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs406', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-5': [
      { id: 'cs501', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs502', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs503', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs504', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs505', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'cs506', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-6': [
      { id: 'cs601', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs602', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs603', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs604', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'cs605', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs606', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-7': [
      { id: 'cs701', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs702', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'cs703', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs704', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs705', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-8': [
      { id: 'cs801', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'cs802', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'cs803', name: 'Python', credits: 3, type: 'core' },
      { id: 'cs804', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'cs805', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
  },
  'electrical-engineering': {
    'semester-1': [
      { id: 'ee101', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee102', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'ee103', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee104', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'ee105', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee106', name: 'Python Lab', credits: 2, type: 'core' },
    ] as const,
    'semester-2': [
      { id: 'ee201', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee202', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'ee203', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee204', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee205', name: 'DECO', credits: 3, type: 'core' },
      { id: 'ee206', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-3': [
      { id: 'ee301', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee302', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'ee303', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee304', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'ee305', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee306', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-4': [
      { id: 'ee401', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee402', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'ee403', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee404', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee405', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'ee406', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-5': [
      { id: 'ee501', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee502', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee503', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee504', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'ee505', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-6': [
      { id: 'ee601', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee602', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'ee603', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee604', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee605', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-7': [
      { id: 'ee701', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee702', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee703', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'ee704', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee705', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-8': [
      { id: 'ee801', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'ee802', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'ee803', name: 'Python', credits: 3, type: 'core' },
      { id: 'ee804', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'ee805', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
  },
  'mechanical-engineering': {
    'semester-1': [
      { id: 'me101', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me102', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'me103', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me104', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'me105', name: 'Python', credits: 3, type: 'core' },
      { id: 'me106', name: 'Python Lab', credits: 2, type: 'core' },
    ] as const,
    'semester-2': [
      { id: 'me201', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me202', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'me203', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me204', name: 'Python', credits: 3, type: 'core' },
      { id: 'me205', name: 'DECO', credits: 3, type: 'core' },
      { id: 'me206', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-3': [
      { id: 'me301', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me302', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'me303', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me304', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'me305', name: 'Python', credits: 3, type: 'core' },
      { id: 'me306', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-4': [
      { id: 'me401', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me402', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'me403', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me404', name: 'Python', credits: 3, type: 'core' },
      { id: 'me405', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'me406', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-5': [
      { id: 'me501', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me502', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me503', name: 'Python', credits: 3, type: 'core' },
      { id: 'me504', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'me505', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-6': [
      { id: 'me601', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me602', name: 'Database Management System Lab', credits: 2, type: 'core' },
      { id: 'me603', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me604', name: 'Python', credits: 3, type: 'core' },
      { id: 'me605', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
    'semester-7': [
      { id: 'me701', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me702', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me703', name: 'C++ & DSA Lab', credits: 2, type: 'core' },
      { id: 'me704', name: 'Python', credits: 3, type: 'core' },
      { id: 'me705', name: 'DECO', credits: 3, type: 'core' },
    ] as const,
    'semester-8': [
      { id: 'me801', name: 'Database Management System', credits: 4, type: 'core' },
      { id: 'me802', name: 'C++ & DSA', credits: 4, type: 'core' },
      { id: 'me803', name: 'Python', credits: 3, type: 'core' },
      { id: 'me804', name: 'Python Lab', credits: 2, type: 'core' },
      { id: 'me805', name: 'Aptitude', credits: 2, type: 'core' },
    ] as const,
  },
};

export type Subject = {
  id: string;
  name: string;
  credits: number;
  type: 'core' | 'elective';
};

export const getSubjectsForDepartmentAndSemester = (departmentId: string, semesterId: string): Subject[] => {
  const departmentSubjects = subjects[departmentId as keyof typeof subjects];
  if (!departmentSubjects) return [];
  const semesterSubjects = departmentSubjects[semesterId as keyof typeof departmentSubjects];
  if (!semesterSubjects) return [];
  return semesterSubjects.map(subject => ({
    id: subject.id,
    name: subject.name,
    credits: subject.credits,
    type: subject.type
  }));
};
