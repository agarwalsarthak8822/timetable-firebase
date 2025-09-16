import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { memo } from 'react';
import { AdminOnly } from '@/components/role-guard';

const classroomData = [
  { id: 'CR101', capacity: 60, occupancy: 45, status: 'Occupied' },
  { id: 'CR102', capacity: 60, occupancy: 0, status: 'Available' },
  { id: 'CR201', capacity: 75, occupancy: 70, status: 'Occupied' },
  { id: 'CR202', capacity: 75, occupancy: 0, status: 'Available' },
  { id: 'LAB01', capacity: 40, occupancy: 35, status: 'Occupied' },
  { id: 'LAB02', capacity: 40, occupancy: 0, status: 'Available' },
];

const ClassroomsPage = memo(function ClassroomsPage() {
  return (
    <AdminOnly>
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Classroom Status</h2>
        <p className="text-muted-foreground">
          Monitor classroom capacity and occupancy in real-time.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classroomData.map((room) => (
          <Card key={room.id} className="glassmorphism">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{room.id}</CardTitle>
              <Badge variant={room.status === 'Available' ? 'secondary' : 'default'}>{room.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Capacity: {room.capacity}</span>
              </div>
              <div className="text-2xl font-bold mt-2">{room.occupancy} / {room.capacity}</div>
              <p className="text-xs text-muted-foreground">students currently inside</p>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </AdminOnly>
  );
});

export default ClassroomsPage;
