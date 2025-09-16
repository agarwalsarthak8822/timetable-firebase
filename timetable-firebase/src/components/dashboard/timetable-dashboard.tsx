'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Settings, 
  Bell, 
  Home,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Video,
  MapPin
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Timetable', active: false },
  { icon: Users, label: 'Faculty', active: false },
  { icon: BookOpen, label: 'Classrooms', active: false },
  { icon: GraduationCap, label: 'Students', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const timeSlots = [
  { id: 1, time: '9:30 AM - 10:25 AM', label: 'Lecture 1' },
  { id: 2, time: '10:30 AM - 11:25 AM', label: 'Lecture 2' },
  { id: 3, time: '11:30 AM - 12:25 PM', label: 'Lecture 3' },
  { id: 4, time: '12:30 PM - 1:25 PM', label: 'Lecture 4' },
  { id: 5, time: '1:30 PM - 2:25 PM', label: 'Lunch Break' },
  { id: 6, time: '2:30 PM - 3:10 PM', label: 'Lecture 5' },
  { id: 7, time: '3:15 PM - 3:55 PM', label: 'Lecture 6' },
];

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timetableData: Record<string, Record<number, any>> = {
  'MON': {
    1: { subject: 'Database Management System', code: 'DBMS', room: 'CR-101', faculty: 'Dr. Smith', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    2: { subject: 'C++ & DSA', code: 'CPP', room: 'CR-102', faculty: 'Prof. Johnson', type: 'theory', color: 'bg-green-100 border-green-300' },
    3: { subject: 'Python', code: 'PY', room: 'CR-103', faculty: 'Dr. Wilson', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    4: { subject: 'DECO', code: 'DECO', room: 'CR-104', faculty: 'Ms. Davis', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    5: 'lunch',
    6: { subject: 'Aptitude', code: 'APT', room: 'CR-105', faculty: 'Prof. Brown', type: 'theory', color: 'bg-red-100 border-red-300' },
    7: { subject: 'Database Management System Lab', code: 'DBMS Lab', room: 'Lab-1', faculty: 'Dr. Smith', type: 'lab', color: 'bg-indigo-100 border-indigo-300' },
  },
  'TUE': {
    1: { subject: 'C++ & DSA Lab', code: 'CPP Lab', room: 'Lab-2', faculty: 'Prof. Johnson', type: 'lab', color: 'bg-teal-100 border-teal-300' },
    2: { subject: 'Python', code: 'PY', room: 'CR-101', faculty: 'Dr. Wilson', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    3: { subject: 'Database Management System', code: 'DBMS', room: 'CR-102', faculty: 'Dr. Smith', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    4: { subject: 'Aptitude', code: 'APT', room: 'CR-103', faculty: 'Prof. Brown', type: 'theory', color: 'bg-red-100 border-red-300' },
    5: 'lunch',
    6: { subject: 'DECO', code: 'DECO', room: 'CR-104', faculty: 'Ms. Davis', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    7: { subject: 'Python Lab', code: 'PY Lab', room: 'Lab-3', faculty: 'Dr. Wilson', type: 'lab', color: 'bg-orange-100 border-orange-300' },
  },
  'WED': {
    1: { subject: 'DECO', code: 'DECO', room: 'CR-101', faculty: 'Ms. Davis', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    2: { subject: 'Database Management System', code: 'DBMS', room: 'CR-102', faculty: 'Dr. Smith', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    3: { subject: 'C++ & DSA', code: 'CPP', room: 'CR-103', faculty: 'Prof. Johnson', type: 'theory', color: 'bg-green-100 border-green-300' },
    4: { subject: 'Python', code: 'PY', room: 'CR-104', faculty: 'Dr. Wilson', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    5: 'lunch',
    6: { subject: 'Aptitude', code: 'APT', room: 'CR-105', faculty: 'Prof. Brown', type: 'theory', color: 'bg-red-100 border-red-300' },
    7: { subject: 'C++ & DSA Lab', code: 'CPP Lab', room: 'Lab-2', faculty: 'Prof. Johnson', type: 'lab', color: 'bg-teal-100 border-teal-300' },
  },
  'THU': {
    1: { subject: 'Python Lab', code: 'PY Lab', room: 'Lab-3', faculty: 'Dr. Wilson', type: 'lab', color: 'bg-orange-100 border-orange-300' },
    2: { subject: 'DECO', code: 'DECO', room: 'CR-101', faculty: 'Ms. Davis', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    3: { subject: 'Database Management System', code: 'DBMS', room: 'CR-102', faculty: 'Dr. Smith', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    4: { subject: 'C++ & DSA', code: 'CPP', room: 'CR-103', faculty: 'Prof. Johnson', type: 'theory', color: 'bg-green-100 border-green-300' },
    5: 'lunch',
    6: { subject: 'Python', code: 'PY', room: 'CR-104', faculty: 'Dr. Wilson', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    7: { subject: 'Database Management System Lab', code: 'DBMS Lab', room: 'Lab-1', faculty: 'Dr. Smith', type: 'lab', color: 'bg-indigo-100 border-indigo-300' },
  },
  'FRI': {
    1: { subject: 'Aptitude', code: 'APT', room: 'CR-101', faculty: 'F-105', type: 'theory', color: 'bg-red-100 border-red-300' },
    2: { subject: 'Database Management System', code: 'DBMS', room: 'CR-101', faculty: 'F-101', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    3: { subject: 'C++ & DSA', code: 'CPP', room: 'CR-102', faculty: 'F-102', type: 'theory', color: 'bg-green-100 border-green-300' },
    4: { subject: 'Python', code: 'PY', room: 'CR-102', faculty: 'F-103', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    5: 'lunch',
    6: { subject: 'DECO', code: 'DECO', room: 'CR-103', faculty: 'F-104', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    7: { subject: 'Aptitude', code: 'APT', room: 'Lab-1', faculty: 'F-105', type: 'theory', color: 'bg-red-100 border-red-300' },
  },
  'SAT': {
    1: { subject: 'Python', code: 'PY', room: 'CR-101', faculty: 'F-103', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    2: { subject: 'DECO', code: 'DECO', room: 'CR-101', faculty: 'F-104', type: 'theory', color: 'bg-yellow-100 border-yellow-300' },
    3: { subject: 'Database Management System', code: 'DBMS', room: 'CR-102', faculty: 'F-101', type: 'theory', color: 'bg-blue-100 border-blue-300' },
    4: { subject: 'C++ & DSA', code: 'CPP', room: 'CR-102', faculty: 'F-102', type: 'theory', color: 'bg-green-100 border-green-300' },
    5: 'lunch',
    6: { subject: 'Aptitude', code: 'APT', room: 'CR-103', faculty: 'F-105', type: 'theory', color: 'bg-red-100 border-red-300' },
    7: { subject: 'C++ & DSA', code: 'CPP', room: 'Lab-1', faculty: 'F-102', type: 'lab', color: 'bg-green-100 border-green-300' },
  },
};

const mentorSessions = [
  { day: 'MON', time: '9:10 AM', type: 'Mentor' },
  { day: 'TUE', time: '9:10 AM', type: 'Mentor' },
  { day: 'WED', time: '9:10 AM', type: 'Mentor' },
  { day: 'THU', time: '9:10 AM', type: 'Mentor' },
  { day: 'FRI', time: '9:10 AM', type: 'Mentor' },
  { day: 'SAT', time: '9:10 AM', type: 'Mentor' },
];

export function TimetableDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderTimeSlot = (day: string, slotId: number) => {
    const slot = timetableData[day as keyof typeof timetableData]?.[slotId];
    
    if (slot === 'lunch') {
      return (
        <div className="h-16 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
          <div className="flex items-center space-x-2 text-orange-700">
            <Coffee className="h-4 w-4" />
            <span className="font-medium text-sm">Lunch</span>
          </div>
        </div>
      );
    }

    if (!slot || slot.type === 'free') {
      return (
        <div className="h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Free Period</span>
        </div>
      );
    }

    return (
      <div className={`h-16 border-2 rounded-lg p-2 ${slot.color} hover:shadow-md transition-all cursor-pointer`}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-gray-800">{slot.code || slot.subject}</span>
            {slot.type === 'lab' && <Badge variant="secondary" className="text-xs px-1 py-0">Lab</Badge>}
            {slot.type === 'seminar' && <Badge variant="outline" className="text-xs px-1 py-0">Seminar</Badge>}
          </div>
          <div className="text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{slot.room}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'}`}
            >
              <item.icon className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">College of Computing Sciences</h1>
                <p className="text-blue-100">Information Technology</p>
                <p className="text-sm text-blue-200">
                  B.Tech (Information Technology) | Semester: 7th | Academic Year: 2024-25
                </p>
                <p className="text-sm text-blue-200">
                  Effective from: 2nd September 2024 | Timetable Version: 2.1
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Video className="h-4 w-4 mr-2" />
                Live Classes
              </Button>
            </div>
          </div>
        </div>

        {/* Timetable Content */}
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              {/* Mentor Interactions Row */}
              <div className="bg-yellow-50 border-b p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Mentor Interactions (9:10 AM - 9:25 AM)
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  <div className="font-medium text-sm text-gray-600 flex items-center justify-center">
                    HOURS
                  </div>
                  {mentorSessions.map((session, index) => (
                    <div key={index} className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-center">
                      <div className="text-xs font-medium text-yellow-800">Mentor</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Timetable */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {/* Header Row */}
                  <div className="font-bold text-center text-gray-700 border-b pb-2">
                    HOURS<br />
                    <span className="text-xs font-normal">All Timings</span>
                  </div>
                  {days.map((day, index) => (
                    <div key={day} className="font-bold text-center text-gray-700 border-b pb-2">
                      {day}<br />
                      <span className="text-xs font-normal">{dayLabels[index]}</span>
                    </div>
                  ))}

                  {/* Time Slots */}
                  {timeSlots.map((slot) => (
                    <React.Fragment key={slot.id}>
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg border">
                        <div className="font-semibold text-sm text-gray-800">{slot.label}</div>
                        <div className="text-xs text-gray-600 text-center mt-1">{slot.time}</div>
                      </div>
                      {days.map((day) => (
                        <div key={`${day}-${slot.id}`} className="p-1">
                          {renderTimeSlot(day, slot.id)}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="border-t p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                    <span className="text-sm">Lab Sessions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-sm">Theory Classes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span className="text-sm">Practical/Prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                    <span className="text-sm">Lunch Break</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
