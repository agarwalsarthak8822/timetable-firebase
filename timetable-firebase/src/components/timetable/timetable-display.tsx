'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { type GenerateOptimizedTimetablesOutput } from '@/ai/flows/generate-optimized-timetables';
import { getSubjectsForDepartmentAndSemester } from '@/lib/data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const slots = [1, 2, 3, 4, 5, 6];

type TimetableOption = GenerateOptimizedTimetablesOutput[0];

export function TimetableDisplay({ timetables, departmentId, semesterId }: { 
  timetables: TimetableOption[]; 
  departmentId?: string; 
  semesterId?: string; 
}) {
  if (!timetables || timetables.length === 0) {
    return null;
  }

  // Get subject names mapping
  const getSubjectName = (subjectId: string) => {
    if (!departmentId || !semesterId) return subjectId;
    const subjects = getSubjectsForDepartmentAndSemester(departmentId, semesterId);
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : subjectId;
  };

  return (
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
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Timetable Option {index + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground">Optimization Score: <span className="font-semibold text-primary">{tt.score}</span></p>
                </div>
                {tt.conflicts.length > 0 && (
                  <Badge variant="destructive" className="animate-pulse shadow-lg">
                    {tt.conflicts.length} conflict(s)
                  </Badge>
                )}
              </div>
              <div className="overflow-x-auto">
                <div className="grid gap-2 rounded-xl overflow-hidden border border-primary/20" style={{gridTemplateColumns: `auto repeat(${days.length}, minmax(120px, 1fr))`}}>
                  <div className="font-bold p-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-r border-primary/20">Time</div>
                  {days.map(day => (
                    <div key={day} className="font-bold text-center p-3 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-r border-primary/10 last:border-r-0">
                      {day}
                    </div>
                  ))}
                  
                  {slots.map(slot => (
                    <React.Fragment key={slot}>
                      <div className="font-semibold p-3 bg-gradient-to-r from-secondary/30 to-muted/30 border-r border-primary/20 text-center">
                        Slot {slot}
                      </div>
                      {days.map(day => {
                        const entry = tt.schedule.find((e: any) => e.day === day && e.slot === slot);
                        const isConflict = tt.conflicts.some((c: any) => c.includes(day) && c.includes(`slot ${slot}`));

                        return (
                          <div key={`${day}-${slot}`} className={`p-3 min-h-[90px] text-xs transition-all duration-300 border-r border-b border-primary/10 last:border-r-0 hover:shadow-lg ${
                            entry 
                              ? 'bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 hover:from-primary/25 hover:via-accent/15 hover:to-primary/10' 
                              : 'bg-gradient-to-br from-muted/30 to-secondary/20 hover:from-muted/40 hover:to-secondary/30'
                          } ${
                            isConflict ? 'ring-2 ring-destructive animate-pulse bg-destructive/10' : ''
                          }`}>
                            {entry && (
                              <div className="flex flex-col h-full justify-center space-y-1">
                                <p className="font-bold text-primary text-sm">{getSubjectName(entry.subjectId)}</p>
                                <p className="text-accent font-medium text-xs">{entry.facultyId}</p>
                                <p className="text-muted-foreground text-xs bg-white/50 px-2 py-1 rounded-md">{entry.classroomId}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
