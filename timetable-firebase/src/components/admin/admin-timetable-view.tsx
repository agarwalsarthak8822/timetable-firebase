'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Settings, 
  Bell, 
  Edit,
  Save,
  X,
  Plus,
  GraduationCap,
  Coffee,
  MapPin
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const timeSlots = [
  { id: 1, time: '9:30-10:25', label: 'Lecture 1' },
  { id: 2, time: '10:30-11:25', label: 'Lecture 2' },
  { id: 3, time: '11:30-12:25', label: 'Lecture 3' },
  { id: 4, time: '12:30-1:25', label: 'Lecture 4' },
  { id: 5, time: '1:30-2:25', label: 'Lunch Break' },
  { id: 6, time: '2:30-3:10', label: 'Lecture 5' },
  { id: 7, time: '3:15-3:55', label: 'Lecture 6' },
];

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialTimetableData: Record<string, Record<number, any>> = {
  'MON': {
    1: { subject: 'Software Engineering Lab', code: 'SE Lab', room: 'Lab-1', faculty: 'Dr. Smith', type: 'lab', color: 'bg-blue-100 border-blue-300' },
    2: { subject: 'Algorithm Analysis', code: 'AA', room: 'CR-101', faculty: 'Prof. Johnson', type: 'theory', color: 'bg-green-100 border-green-300' },
    3: { subject: 'Database Systems', code: 'DBMS', room: 'CR-102', faculty: 'Dr. Wilson', type: 'theory', color: 'bg-purple-100 border-purple-300' },
    4: { subject: 'Internship Prep', code: 'IP', room: 'CR-103', faculty: 'Ms. Davis', type: 'practical', color: 'bg-yellow-100 border-yellow-300' },
    5: 'lunch',
    6: { subject: 'Computer Networks', code: 'CN', room: 'CR-104', faculty: 'Prof. Brown', type: 'theory', color: 'bg-red-100 border-red-300' },
    7: { subject: 'Computer Networks', code: 'CN', room: 'CR-104', faculty: 'Prof. Brown', type: 'theory', color: 'bg-red-100 border-red-300' },
  },
  'TUE': {
    1: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    2: { subject: 'Technical Seminar', code: 'TS', room: 'Auditorium', faculty: 'Guest Speaker', type: 'seminar', color: 'bg-indigo-100 border-indigo-300' },
    3: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    4: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    5: 'lunch',
    6: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    7: { subject: 'Coding Practice', code: 'CP', room: 'Lab-2', faculty: 'TA', type: 'practice', color: 'bg-orange-100 border-orange-300' },
  },
  'WED': {
    1: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    2: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    3: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    4: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    5: 'lunch',
    6: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    7: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
  },
  'THU': {
    1: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    2: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    3: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    4: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    5: 'lunch',
    6: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    7: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
  },
  'FRI': {
    1: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    2: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    3: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    4: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    5: 'lunch',
    6: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    7: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
  },
  'SAT': {
    1: { subject: 'Library Session', code: 'LIB', room: 'Library', faculty: 'Librarian', type: 'activity', color: 'bg-teal-100 border-teal-300' },
    2: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    3: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    4: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    5: 'lunch',
    6: { subject: 'Free Period', type: 'free', color: 'bg-gray-50 border-gray-200' },
    7: { subject: 'Coding Practice', code: 'CP', room: 'Lab-2', faculty: 'TA', type: 'practice', color: 'bg-orange-100 border-orange-300' },
  },
};

const mentorSessions = [
  { day: 'MON', time: '9:10-9:25', type: 'Mentor' },
  { day: 'TUE', time: '9:10-9:25', type: 'Mentor' },
  { day: 'WED', time: '9:10-9:25', type: 'Mentor' },
  { day: 'THU', time: '9:10-9:25', type: 'Mentor' },
  { day: 'FRI', time: '9:10-9:25', type: 'Mentor' },
  { day: 'SAT', time: '9:10-9:25', type: 'Mentor' },
];

export function AdminTimetableView() {
  const [timetableData, setTimetableData] = useState(initialTimetableData);
  const [editingCell, setEditingCell] = useState<{day: string, slot: number} | null>(null);
  const [editForm, setEditForm] = useState({
    subject: '',
    code: '',
    room: '',
    faculty: '',
    type: 'theory'
  });

  const handleEditClick = (day: string, slotId: number) => {
    const slot = timetableData[day]?.[slotId];
    if (slot && slot !== 'lunch') {
      setEditForm({
        subject: slot.subject || '',
        code: slot.code || '',
        room: slot.room || '',
        faculty: slot.faculty || '',
        type: slot.type || 'theory'
      });
      setEditingCell({ day, slot: slotId });
    }
  };

  const handleSave = () => {
    if (editingCell) {
      const { day, slot } = editingCell;
      const colorMap: Record<string, string> = {
        theory: 'bg-blue-100 border-blue-300',
        lab: 'bg-green-100 border-green-300',
        practical: 'bg-yellow-100 border-yellow-300',
        seminar: 'bg-purple-100 border-purple-300',
        activity: 'bg-teal-100 border-teal-300',
        practice: 'bg-orange-100 border-orange-300'
      };

      setTimetableData(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [slot]: {
            ...editForm,
            color: colorMap[editForm.type] || 'bg-gray-100 border-gray-300'
          }
        }
      }));
      setEditingCell(null);
    }
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditForm({ subject: '', code: '', room: '', faculty: '', type: 'theory' });
  };

  const renderTimeSlot = (day: string, slotId: number) => {
    const slot = timetableData[day]?.[slotId];
    const isEditing = editingCell?.day === day && editingCell?.slot === slotId;
    
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

    if (isEditing) {
      return (
        <div className="h-16 bg-white border-2 border-primary rounded-lg p-1">
          <div className="grid grid-cols-2 gap-1 h-full text-xs">
            <Input
              value={editForm.subject}
              onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Subject"
              className="h-6 text-xs p-1"
            />
            <Input
              value={editForm.code}
              onChange={(e) => setEditForm(prev => ({ ...prev, code: e.target.value }))}
              placeholder="Code"
              className="h-6 text-xs p-1"
            />
            <Input
              value={editForm.room}
              onChange={(e) => setEditForm(prev => ({ ...prev, room: e.target.value }))}
              placeholder="Room"
              className="h-6 text-xs p-1"
            />
            <div className="flex space-x-1">
              <Button size="sm" onClick={handleSave} className="h-6 w-6 p-0">
                <Save className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (!slot || slot.type === 'free') {
      return (
        <div 
          className="h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 group"
          onClick={() => handleEditClick(day, slotId)}
        >
          <div className="flex items-center space-x-1 text-gray-400">
            <Plus className="h-4 w-4 group-hover:text-primary" />
            <span className="text-sm group-hover:text-primary">Add Class</span>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`h-16 border-2 rounded-lg p-2 cursor-pointer hover:shadow-md transition-all group ${slot.color}`}
        onClick={() => handleEditClick(day, slotId)}
      >
        <div className="flex flex-col h-full justify-between relative">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-gray-800">{slot.code || slot.subject}</span>
            <Edit className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
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
              Publish Changes
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Timetable Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Department:</label>
              <Select defaultValue="computer-science">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="information-technology">Information Technology</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Semester:</label>
              <Select defaultValue="7">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>{sem}th Semester</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="ml-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Timetable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timetable */}
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
                HOURS<br />
                <span className="text-xs font-normal">All Timings</span>
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
            <h4 className="font-semibold text-gray-800 mb-3">Legend & Instructions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-sm">Theory Classes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm">Lab Sessions</span>
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
            <p className="text-sm text-gray-600">
              <strong>Instructions:</strong> Click on any cell to edit. Use "Add Class" for empty slots. 
              Changes are saved automatically when you click the save button.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
