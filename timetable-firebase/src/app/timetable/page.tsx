'use client';

import { TimetableGenerator } from '@/components/timetable/timetable-generator';

export default function TimetablePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Timetable Management</h1>
        <p className="text-muted-foreground">
          Generate and manage academic timetables with AI-powered optimization.
        </p>
      </div>
      
      <TimetableGenerator />
    </div>
  );
}