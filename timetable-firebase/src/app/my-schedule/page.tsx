'use client';

import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { FacultyOnly } from '@/components/role-guard';

const mockSchedule = [
  {
    id: '1',
    subject: 'Computer Science 101',
    time: '09:00 - 10:30',
    day: 'Monday',
    room: 'CS-201',
    students: 45,
    type: 'Lecture'
  },
  {
    id: '2',
    subject: 'Data Structures',
    time: '11:00 - 12:30',
    day: 'Tuesday',
    room: 'CS-205',
    students: 32,
    type: 'Lab'
  },
  {
    id: '3',
    subject: 'Algorithms',
    time: '14:00 - 15:30',
    day: 'Wednesday',
    room: 'CS-301',
    students: 28,
    type: 'Lecture'
  },
  {
    id: '4',
    subject: 'Software Engineering',
    time: '10:00 - 11:30',
    day: 'Thursday',
    room: 'CS-203',
    students: 35,
    type: 'Seminar'
  }
];

function MySchedulePage() {
  return (
    <FacultyOnly>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
          <p className="text-muted-foreground">
            View your teaching schedule and class details
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockSchedule.map((scheduleItem) => (
            <Card key={scheduleItem.id} className="glassmorphism">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{scheduleItem.subject}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {scheduleItem.type}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-3 w-3" />
                    {scheduleItem.students} students
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{scheduleItem.day}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{scheduleItem.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Room {scheduleItem.room}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FacultyOnly>
  );
}

export default memo(MySchedulePage);
