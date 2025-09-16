'use client';

import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, MapPin, User } from 'lucide-react';
import { StudentOnly } from '@/components/role-guard';

const mockClasses = [
  {
    id: '1',
    subject: 'Computer Science 101',
    instructor: 'Dr. Jane Smith',
    time: '09:00 - 10:30',
    day: 'Monday',
    room: 'CS-201',
    status: 'upcoming'
  },
  {
    id: '2',
    subject: 'Mathematics 201',
    instructor: 'Prof. John Doe',
    time: '11:00 - 12:30',
    day: 'Tuesday',
    room: 'MATH-105',
    status: 'completed'
  },
  {
    id: '3',
    subject: 'Physics 101',
    instructor: 'Dr. Sarah Wilson',
    time: '14:00 - 15:30',
    day: 'Wednesday',
    room: 'PHYS-301',
    status: 'upcoming'
  }
];

function MyClassesPage() {
  return (
    <StudentOnly>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground">
            View your enrolled classes and schedule
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockClasses.map((classItem) => (
            <Card key={classItem.id} className="glassmorphism">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{classItem.subject}</CardTitle>
                  <Badge 
                    variant={classItem.status === 'upcoming' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {classItem.status}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-3 w-3" />
                    {classItem.instructor}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{classItem.day} - {classItem.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Room {classItem.room}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>CS-101</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentOnly>
  );
}

export default memo(MyClassesPage);
