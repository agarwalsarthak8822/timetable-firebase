'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types for real-time updates
interface TimetableUpdate {
  id: string;
  type: 'timetable_change' | 'live_class' | 'announcement';
  timestamp: number;
  data: any;
  message: string;
  affectedUsers: ('student' | 'faculty' | 'admin')[];
}

interface LiveClass {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  status: 'scheduled' | 'live' | 'ended';
}

interface RealtimeContextType {
  updates: TimetableUpdate[];
  liveClasses: LiveClass[];
  currentTimetable: any;
  isConnected: boolean;
  
  // Admin functions
  publishTimetableUpdate: (timetable: any, message: string) => void;
  startLiveClass: (classData: LiveClass) => void;
  endLiveClass: (classId: string) => void;
  sendAnnouncement: (message: string, targetUsers: ('student' | 'faculty' | 'admin')[]) => void;
  
  // Student/Faculty functions
  markUpdateAsRead: (updateId: string) => void;
  joinLiveClass: (classId: string) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [updates, setUpdates] = useState<TimetableUpdate[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [currentTimetable, setCurrentTimetable] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  // Simulate WebSocket connection
  useEffect(() => {
    // Load existing data from localStorage
    const savedTimetable = localStorage.getItem('currentTimetable');
    const savedUpdates = localStorage.getItem('timetableUpdates');
    const savedLiveClasses = localStorage.getItem('liveClasses');

    if (savedTimetable) {
      setCurrentTimetable(JSON.parse(savedTimetable));
    }
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
    if (savedLiveClasses) {
      setLiveClasses(JSON.parse(savedLiveClasses));
    }

    // Simulate connection status
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => {
        if (!prev) {
          toast({
            title: "🔄 Reconnected",
            description: "Real-time updates are now active",
          });
        }
        return true;
      });
    }, 30000);

    return () => clearInterval(connectionInterval);
  }, [toast]);

  // Listen for storage changes (cross-tab communication)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage change detected:', e.key, e.newValue);
      
      if (e.key === 'timetableUpdates' && e.newValue) {
        const newUpdates = JSON.parse(e.newValue);
        setUpdates(newUpdates);
        
        // Show notification for new updates
        const latestUpdate = newUpdates[newUpdates.length - 1];
        if (latestUpdate && Date.now() - latestUpdate.timestamp < 10000) {
          toast({
            title: "📢 Timetable Updated",
            description: latestUpdate.message,
          });
        }
      }
      
      if (e.key === 'liveClasses' && e.newValue) {
        const newLiveClasses = JSON.parse(e.newValue);
        setLiveClasses(newLiveClasses);
        
        // Check for new live classes
        const activeLiveClass = newLiveClasses.find((cls: LiveClass) => cls.status === 'live');
        if (activeLiveClass) {
          toast({
            title: "🔴 Live Class Started",
            description: `${activeLiveClass.subjectName} with ${activeLiveClass.facultyName}`,
          });
        }
      }
      
      if (e.key === 'currentTimetable' && e.newValue) {
        const newTimetable = JSON.parse(e.newValue);
        console.log('New timetable received via storage event:', newTimetable);
        setCurrentTimetable(newTimetable);
        
        // Force re-render and show notification
        toast({
          title: "📅 Live Timetable Update",
          description: "New timetable published by administration",
        });
      }
    };

    // Also listen for custom events for same-tab updates
    const handleCustomUpdate = (e: CustomEvent) => {
      console.log('Custom update event:', e.detail);
      if (e.detail.type === 'timetableUpdate') {
        setCurrentTimetable(e.detail.data);
        const newUpdates = [...updates, {
          id: `update-${Date.now()}`,
          type: 'timetable_change' as const,
          timestamp: Date.now(),
          message: e.detail.message,
          data: e.detail.data,
          affectedUsers: ['student', 'faculty'] as ('student' | 'faculty' | 'admin')[]
        }];
        setUpdates(newUpdates);
        toast({
          title: "📢 Timetable Updated",
          description: e.detail.message,
        });
      }
    };

    // Listen for internal timetable updates
    const handleInternalUpdate = (e: CustomEvent) => {
      console.log('🔄 Internal timetable update received:', e.detail);
      if (e.detail.type === 'timetableUpdate') {
        setCurrentTimetable(e.detail.data);
        toast({
          title: "📅 Internal Sync Complete",
          description: "Timetable updated in real-time",
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('timetableUpdate', handleCustomUpdate as EventListener);
    window.addEventListener('internalTimetableUpdate', handleInternalUpdate as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('timetableUpdate', handleCustomUpdate as EventListener);
      window.removeEventListener('internalTimetableUpdate', handleInternalUpdate as EventListener);
    };
  }, [toast, updates]);

  // Admin function: Publish timetable update
  const publishTimetableUpdate = (timetable: any, message: string) => {
    console.log('🔄 Publishing timetable update internally:', timetable, message);
    
    const update: TimetableUpdate = {
      id: `update-${Date.now()}`,
      type: 'timetable_change',
      timestamp: Date.now(),
      data: timetable,
      message,
      affectedUsers: ['student', 'faculty']
    };

    // Immediate internal state update
    const newUpdates = [...updates, update];
    setUpdates(newUpdates);
    setCurrentTimetable(timetable);
    
    // Save to localStorage for persistence
    localStorage.setItem('timetableUpdates', JSON.stringify(newUpdates));
    localStorage.setItem('currentTimetable', JSON.stringify(timetable));
    
    // Force immediate internal sync - trigger all listeners
    setTimeout(() => {
      // Trigger internal update for same application
      window.dispatchEvent(new CustomEvent('internalTimetableUpdate', {
        detail: {
          type: 'timetableUpdate',
          data: timetable,
          message: message,
          timestamp: Date.now()
        }
      }));
      
      // Also trigger storage event for any other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'currentTimetable',
        newValue: JSON.stringify(timetable),
        oldValue: null,
        storageArea: localStorage,
        url: window.location.href
      }));
    }, 50);
    
    toast({
      title: "✅ Timetable Published",
      description: "Real-time sync to all students and faculty completed",
    });
  };

  // Admin function: Start live class
  const startLiveClass = (classData: LiveClass) => {
    const updatedClass = { ...classData, status: 'live' as const };
    const newLiveClasses = [...liveClasses.filter(cls => cls.id !== classData.id), updatedClass];
    
    setLiveClasses(newLiveClasses);
    localStorage.setItem('liveClasses', JSON.stringify(newLiveClasses));
    
    // Create announcement for live class
    const announcement: TimetableUpdate = {
      id: `live-${Date.now()}`,
      type: 'live_class',
      timestamp: Date.now(),
      data: updatedClass,
      message: `Live class started: ${classData.subjectName} in ${classData.room}`,
      affectedUsers: ['student', 'faculty']
    };
    
    const newUpdates = [...updates, announcement];
    setUpdates(newUpdates);
    localStorage.setItem('timetableUpdates', JSON.stringify(newUpdates));
    
    toast({
      title: "🔴 Live Class Started",
      description: `${classData.subjectName} is now live in ${classData.room}`,
    });
  };

  // Admin function: End live class
  const endLiveClass = (classId: string) => {
    const updatedClasses = liveClasses.map(cls => 
      cls.id === classId ? { ...cls, status: 'ended' as const } : cls
    );
    
    setLiveClasses(updatedClasses);
    localStorage.setItem('liveClasses', JSON.stringify(updatedClasses));
    
    const endedClass = liveClasses.find(cls => cls.id === classId);
    if (endedClass) {
      toast({
        title: "⏹️ Live Class Ended",
        description: `${endedClass.subjectName} class has ended`,
      });
    }
  };

  // Admin function: Send announcement
  const sendAnnouncement = (message: string, targetUsers: ('student' | 'faculty' | 'admin')[]) => {
    const announcement: TimetableUpdate = {
      id: `announcement-${Date.now()}`,
      type: 'announcement',
      timestamp: Date.now(),
      data: { message },
      message,
      affectedUsers: targetUsers
    };
    
    const newUpdates = [...updates, announcement];
    setUpdates(newUpdates);
    localStorage.setItem('timetableUpdates', JSON.stringify(newUpdates));
    
    toast({
      title: "📢 Announcement Sent",
      description: `Message sent to ${targetUsers.join(', ')}`,
    });
  };

  // Student/Faculty function: Mark update as read
  const markUpdateAsRead = (updateId: string) => {
    const readUpdates = JSON.parse(localStorage.getItem('readUpdates') || '[]');
    if (!readUpdates.includes(updateId)) {
      readUpdates.push(updateId);
      localStorage.setItem('readUpdates', JSON.stringify(readUpdates));
    }
  };

  // Student/Faculty function: Join live class
  const joinLiveClass = (classId: string) => {
    const liveClass = liveClasses.find(cls => cls.id === classId);
    if (liveClass && liveClass.meetingLink) {
      window.open(liveClass.meetingLink, '_blank');
      toast({
        title: "🚀 Joining Live Class",
        description: `Opening ${liveClass.subjectName} class`,
      });
    } else {
      toast({
        title: "📍 Live Class Location",
        description: `Please go to ${liveClass?.room || 'assigned room'}`,
      });
    }
  };

  const value: RealtimeContextType = {
    updates,
    liveClasses,
    currentTimetable,
    isConnected,
    publishTimetableUpdate,
    startLiveClass,
    endLiveClass,
    sendAnnouncement,
    markUpdateAsRead,
    joinLiveClass
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}
