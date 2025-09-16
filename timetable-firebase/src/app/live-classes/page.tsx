import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Download, Video } from "lucide-react";
import { memo } from 'react';
import { AdminOnly } from '@/components/role-guard';

const liveClassesData = [
  { id: 'LC01', subject: 'Advanced Algorithms', faculty: 'Dr. Alan Turing', room: 'CR101', time: 'Ongoing' },
  { id: 'LC02', subject: 'Computer Architecture', faculty: 'Dr. John von Neumann', room: 'CR201', time: 'Ongoing' },
];

const recordingsData = [
  { id: 'REC01', subject: 'Compiler Design', date: '2023-10-25', duration: '1:28:34' },
  { id: 'REC02', subject: 'Programming Languages', date: '2023-10-24', duration: '1:32:10' },
];

const LiveClassesPage = memo(function LiveClassesPage() {
  return (
    <AdminOnly>
      <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Classes & Recordings</h2>
        <p className="text-muted-foreground">
          Join live sessions and access past recordings.
        </p>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Ongoing Classes</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {liveClassesData.map((cls) => (
            <Card key={cls.id} className="glassmorphism">
              <CardHeader>
                <CardTitle>{cls.subject}</CardTitle>
                <CardDescription>{cls.faculty} in {cls.room}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-destructive">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                  </span>
                  <p className="ml-2 font-semibold">LIVE</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  Join Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Past Recordings</h3>
        <div className="space-y-4">
          {recordingsData.map((rec) => (
             <Card key={rec.id} className="glassmorphism flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                        <Image 
                            src="https://picsum.photos/seed/rec01/200/100"
                            alt="Recording thumbnail" 
                            width={160}
                            height={90}
                            className="rounded-md aspect-video object-cover"
                            data-ai-hint="lecture hall"
                            priority={false}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold">{rec.subject}</h4>
                        <p className="text-sm text-muted-foreground">Recorded on {rec.date} &bull; {rec.duration}</p>
                    </div>
                </div>
                <Button variant="outline" className="mt-4 sm:mt-0 w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
             </Card>
          ))}
        </div>
      </section>

      </div>
    </AdminOnly>
  );
});

export default LiveClassesPage;
