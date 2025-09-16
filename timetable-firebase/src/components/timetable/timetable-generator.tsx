'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createTimetable, type TimetableState } from '@/app/actions';
import { departments, semesters, getSubjectsForDepartmentAndSemester, type Subject } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Bot, BookOpen, Check, X } from 'lucide-react';
import { ProfessionalTimetableDisplay } from './professional-timetable-display';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full sm:w-auto primary-gradient hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
    >
      {pending ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Generating...
        </>
      ) : (
        <>
          Generate with AI
          <Bot className="ml-2 h-4 w-4 animate-bounce-gentle" />
        </>
      )}
    </Button>
  );
}

export function TimetableGenerator() {
  const initialState: TimetableState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createTimetable, initialState);
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = React.useState('');
  const [selectedSemester, setSelectedSemester] = React.useState('');
  const [availableSubjects, setAvailableSubjects] = React.useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  // Update available subjects when department or semester changes
  React.useEffect(() => {
    if (selectedDepartment && selectedSemester) {
      const subjects = getSubjectsForDepartmentAndSemester(selectedDepartment, selectedSemester);
      console.log('Loading subjects for:', selectedDepartment, selectedSemester, 'Found:', subjects.length);
      setAvailableSubjects(subjects);
      setSelectedSubjects([]); // Reset selected subjects
    } else {
      setAvailableSubjects([]);
      setSelectedSubjects([]);
    }
  }, [selectedDepartment, selectedSemester]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === availableSubjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(availableSubjects.map(s => s.id));
    }
  };

  return (
    <div className="space-y-6">
      <form action={dispatch}>
        <Card className="gradient-card card-hover animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary animate-pulse" />
              Generate Timetable
            </CardTitle>
            <CardDescription className="text-base">
              Select a department and semester to generate optimized timetables using AI.
              <br />
              <span className="text-xs text-muted-foreground bg-warning/10 px-2 py-1 rounded-md mt-2 inline-block">
                💡 Note: To use AI features, please configure your Google AI API key in the .env.local file.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departmentId" className="text-sm font-semibold text-primary">Department</Label>
                <Select 
                  name="departmentId" 
                  value={selectedDepartment} 
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger id="departmentId" className="border-primary/20 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state.errors?.departmentId && (
                  <p className="text-sm text-destructive mt-1">{state.errors.departmentId[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="semesterId" className="text-sm font-semibold text-primary">Semester</Label>
                <Select 
                  name="semesterId" 
                  value={selectedSemester} 
                  onValueChange={setSelectedSemester}
                >
                  <SelectTrigger id="semesterId" className="border-primary/20 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem.id} value={sem.id}>
                        {sem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {state.errors?.semesterId && (
                  <p className="text-sm text-destructive mt-1">{state.errors.semesterId[0]}</p>
                )}
              </div>
            </div>

            {/* Subject Selection - Show for all users when subjects are available */}
            {availableSubjects.length > 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-primary flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Select Subjects ({selectedSubjects.length}/{availableSubjects.length})
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllSubjects}
                    className="text-xs border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    {selectedSubjects.length === availableSubjects.length ? (
                      <><X className="w-3 h-3 mr-1" /> Deselect All</>
                    ) : (
                      <><Check className="w-3 h-3 mr-1" /> Select All</>
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  {availableSubjects.map((subject) => {
                    const isSelected = selectedSubjects.includes(subject.id);
                    return (
                      <div
                        key={subject.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                          isSelected 
                            ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-sm' 
                            : 'bg-white/50 border-primary/10 hover:border-primary/20'
                        }`}
                        onClick={() => handleSubjectToggle(subject.id)}
                      >
                        <input
                          type="checkbox"
                          id={subject.id}
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSubjectToggle(subject.id);
                          }}
                          className="w-4 h-4 text-primary bg-gray-100 border-primary/30 rounded focus:ring-primary focus:ring-2"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Label 
                              htmlFor={subject.id} 
                              className="text-sm font-medium cursor-pointer truncate"
                            >
                              {subject.name}
                            </Label>
                            <div className="flex items-center gap-2 ml-2">
                              <Badge 
                                variant={subject.type === 'core' ? 'default' : 'secondary'}
                                className={`text-xs ${
                                  subject.type === 'core' 
                                    ? 'bg-primary/20 text-primary border-primary/30' 
                                    : 'bg-accent/20 text-accent border-accent/30'
                                }`}
                              >
                                {subject.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-medium">
                                {subject.credits} credits
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Subject ID: {subject.id}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {selectedSubjects.length === 0 && (
                  <Alert className="border-warning/20 bg-warning/5">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <AlertDescription className="text-sm text-warning-foreground">
                      Please select at least one subject to generate the timetable.
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* Hidden input to pass selected subjects to form */}
                <input 
                  type="hidden" 
                  name="selectedSubjects" 
                  value={JSON.stringify(selectedSubjects)} 
                />
              </div>
            )}

            {state.message && !state.result && (
              <Alert variant="destructive" className="mt-4 animate-scale-in border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 animate-pulse" />
                <AlertTitle className="font-semibold">Error</AlertTitle>
                <AlertDescription className="text-sm">{state.message}</AlertDescription>
              </Alert>
            )}
            
            {selectedDepartment && selectedSemester && availableSubjects.length > 0 && selectedSubjects.length === 0 && (
              <Alert className="mt-4 animate-scale-in border-warning/20 bg-warning/5">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertTitle className="font-semibold text-warning">Subject Selection Required</AlertTitle>
                <AlertDescription className="text-sm text-warning-foreground">
                  Please select the subjects you want to include in the timetable generation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-secondary/10 to-muted/10 border-t border-primary/10">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.result && <ProfessionalTimetableDisplay timetables={state.result} departmentId={selectedDepartment} semesterId={selectedSemester} />}
    </div>
  );
}
