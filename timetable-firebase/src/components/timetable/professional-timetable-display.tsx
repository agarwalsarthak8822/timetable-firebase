'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import { type GenerateOptimizedTimetablesOutput } from '@/ai/flows/generate-optimized-timetables';
import { getSubjectsForDepartmentAndSemester, departments, semesters } from '@/lib/data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  { slot: 1, time: '9:10-9:25' },
  { slot: 2, time: '9:30-10:30' },
  { slot: 3, time: '10:30-11:25' },
  { slot: 4, time: '11:30-12:25' },
  { slot: 5, time: '12:30-1:25' },
  { slot: 6, time: '1:25-2:25' }
];

type TimetableOption = GenerateOptimizedTimetablesOutput[0];

interface ProfessionalTimetableDisplayProps {
  timetables: TimetableOption[];
  departmentId?: string;
  semesterId?: string;
}

export function ProfessionalTimetableDisplay({ 
  timetables, 
  departmentId, 
  semesterId 
}: ProfessionalTimetableDisplayProps) {
  if (!timetables || timetables.length === 0) {
    return null;
  }

  // Get department and semester names
  const departmentName = departments.find(d => d.id === departmentId)?.name || 'Unknown Department';
  const semesterName = semesters.find(s => s.id === semesterId)?.name || 'Unknown Semester';
  
  // Get subjects for the department and semester
  const subjects = departmentId && semesterId 
    ? getSubjectsForDepartmentAndSemester(departmentId, semesterId)
    : [];

  // Get subject name mapping
  const getSubjectName = (subjectId: string) => {
    if (!departmentId || !semesterId) return subjectId;
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : subjectId;
  };

  // Generate course codes and faculty mapping
  const generateCourseCode = (subjectId: string, index: number) => {
    const prefix = departmentId === 'computer-science' ? 'CS' : 
                   departmentId === 'electrical-engineering' ? 'EE' : 'ME';
    const semesterNum = semesterId?.split('-')[1] || '1';
    return `${prefix}${semesterNum}${String(index + 1).padStart(2, '0')}`;
  };

  const generateFacultyName = (subjectId: string, index: number) => {
    const facultyNames = [
      'DR. RAJESH KUMAR', 'DR. PRIYA SHARMA', 'MR. AMIT SINGH', 
      'MS. NEHA GUPTA', 'DR. SURESH PATEL', 'MR. VIKASH KUMAR',
      'DR. ANITA VERMA', 'MR. ROHIT AGARWAL', 'MS. KAVITA SINGH'
    ];
    return facultyNames[index % facultyNames.length];
  };

  const generateShortName = (subjectName: string) => {
    if (subjectName.includes('Database')) return 'DBMS';
    if (subjectName.includes('C++')) return 'CPP';
    if (subjectName.includes('Python')) return 'PY';
    if (subjectName.includes('DECO')) return 'DECO';
    if (subjectName.includes('Aptitude')) return 'APT';
    return subjectName.substring(0, 4).toUpperCase();
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue={timetables[0].timetableId} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-gradient-to-r from-primary/10 to-accent/10 p-1 rounded-xl">
          {timetables.map((tt, index) => (
            <TabsTrigger 
              key={tt.timetableId} 
              value={tt.timetableId}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300 hover:bg-primary/10"
            >
              Option {index + 1}
              {tt.conflicts.length > 0 && (
                <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {timetables.map((tt, index) => (
          <TabsContent key={tt.timetableId} value={tt.timetableId}>
            <Card className="gradient-card card-hover animate-fade-in">
              <CardContent className="p-0">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-t-lg">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <BookOpen className="h-8 w-8" />
                      <h1 className="text-2xl font-bold">College of Computing Sciences and Information Technology</h1>
                    </div>
                    <p className="text-lg opacity-90">TIME TABLE (Version: 2.1)</p>
                    <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>SESSION 2025-2026 (ODD SEMESTER)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>w.e.f. 02/09/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Information */}
                <div className="bg-gradient-to-r from-secondary/20 to-muted/20 p-4 border-b">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-primary">
                      B.Tech. ({departmentName}) {semesterName}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mentor Name: DR. MUDIT SAXENA
                    </p>
                  </div>
                </div>

                {/* Timetable Grid */}
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      {/* Header Row */}
                      <thead>
                        <tr className="bg-gradient-to-r from-primary/20 to-accent/20">
                          <th className="border border-gray-300 p-3 font-bold text-center min-w-[80px]">
                            TIME
                          </th>
                          {timeSlots.map(slot => (
                            <th key={slot.slot} className="border border-gray-300 p-3 font-bold text-center min-w-[120px]">
                              {slot.time}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {days.map(day => (
                          <tr key={day} className="hover:bg-muted/30 transition-colors">
                            <td className="border border-gray-300 p-3 font-semibold bg-gradient-to-r from-secondary/30 to-muted/30 text-center">
                              {day.toUpperCase()}
                            </td>
                            {timeSlots.map(timeSlot => {
                              const entry = tt.schedule.find((e: any) => 
                                e.day === day && e.slot === timeSlot.slot
                              );
                              const isConflict = tt.conflicts.some((c: any) => 
                                c.includes(day) && c.includes(`slot ${timeSlot.slot}`)
                              );

                              return (
                                <td 
                                  key={`${day}-${timeSlot.slot}`} 
                                  className={`border border-gray-300 p-2 text-xs text-center min-h-[80px] ${
                                    entry 
                                      ? 'bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5' 
                                      : 'bg-white'
                                  } ${
                                    isConflict ? 'ring-2 ring-destructive bg-destructive/10' : ''
                                  }`}
                                >
                                  {entry && (
                                    <div className="space-y-1">
                                      <div className="font-bold text-primary text-sm">
                                        {generateShortName(getSubjectName(entry.subjectId))}
                                      </div>
                                      <div className="text-accent font-medium text-xs">
                                        {entry.facultyId}
                                      </div>
                                      <div className="text-muted-foreground text-xs bg-white/70 px-1 py-0.5 rounded">
                                        {entry.classroomId}
                                      </div>
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Subject Details Table */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Subject Details</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gradient-to-r from-primary/20 to-accent/20">
                            <th className="border border-gray-300 p-3 font-bold text-center">S. No.</th>
                            <th className="border border-gray-300 p-3 font-bold text-center">Course Code</th>
                            <th className="border border-gray-300 p-3 font-bold text-center">Subject Name</th>
                            <th className="border border-gray-300 p-3 font-bold text-center">Short Name</th>
                            <th className="border border-gray-300 p-3 font-bold text-center">Faculty Name</th>
                            <th className="border border-gray-300 p-3 font-bold text-center">Credits</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.map((subject, idx) => (
                            <tr key={subject.id} className="hover:bg-muted/30 transition-colors">
                              <td className="border border-gray-300 p-3 text-center font-medium">
                                {idx + 1}
                              </td>
                              <td className="border border-gray-300 p-3 text-center font-mono">
                                {generateCourseCode(subject.id, idx)}
                              </td>
                              <td className="border border-gray-300 p-3 text-left">
                                {subject.name}
                              </td>
                              <td className="border border-gray-300 p-3 text-center font-bold text-primary">
                                {generateShortName(subject.name)}
                              </td>
                              <td className="border border-gray-300 p-3 text-left">
                                {generateFacultyName(subject.id, idx)}
                              </td>
                              <td className="border border-gray-300 p-3 text-center">
                                {subject.credits}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Optimization Info */}
                  <div className="mt-6 flex justify-between items-center p-4 bg-gradient-to-r from-secondary/10 to-muted/10 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-primary">Timetable Option {index + 1}</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimization Score: <span className="font-semibold text-primary">{tt.score}</span>
                      </p>
                    </div>
                    {tt.conflicts.length > 0 && (
                      <Badge variant="destructive" className="animate-pulse shadow-lg">
                        {tt.conflicts.length} conflict(s)
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
