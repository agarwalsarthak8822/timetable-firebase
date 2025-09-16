import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { memo } from 'react';
import { FacultyOnly } from '@/components/role-guard';

const facultyData = [
  { id: 'F001', name: 'Dr. Alan Turing', subject: 'Advanced Algorithms', availability: 'Available', leaves: 2 },
  { id: 'F002', name: 'Dr. Grace Hopper', subject: 'Compiler Design', availability: 'On Leave', leaves: 5 },
  { id: 'F003', name: 'Dr. John von Neumann', subject: 'Computer Architecture', availability: 'Available', leaves: 1 },
  { id: 'F004', name: 'Dr. Ada Lovelace', subject: 'Programming Languages', availability: 'Available', leaves: 0 },
];

const FacultyPage = memo(function FacultyPage() {
  return (
    <FacultyOnly>
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Faculty Management</h2>
        <p className="text-muted-foreground">
          View and manage faculty members and their schedules.
        </p>
      </div>
       <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Faculty List</CardTitle>
          <CardDescription>A list of all faculty members in the institution.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Assigned Subject</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Avg. Monthly Leaves</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultyData.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell className="font-medium">{faculty.name}</TableCell>
                  <TableCell>{faculty.subject}</TableCell>
                  <TableCell>
                    <Badge variant={faculty.availability === 'Available' ? 'secondary' : 'destructive'}>
                      {faculty.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{faculty.leaves}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </FacultyOnly>
  );
});

export default FacultyPage;
