
'use client';

import { BookOpen, School, Users } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy chart components
const ClassHeatmap = dynamic(() => import('@/components/dashboard/class-heatmap').then(mod => ({ default: mod.ClassHeatmap })), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
  ssr: false
});

const WeeklyOverviewChart = dynamic(() => import('@/components/dashboard/weekly-overview-chart').then(mod => ({ default: mod.WeeklyOverviewChart })), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
  ssr: false
});

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your timetable and resources.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Total Classes This Week"
          value="124"
          icon={BookOpen}
          description="+20.1% from last week"
        />
        <StatsCard 
          title="Active Live Classes"
          value="8"
          icon={Users}
          description="Currently ongoing"
        />
        <StatsCard 
          title="Classroom Utilization"
          value="72%"
          icon={School}
          description="Average across all rooms"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <WeeklyOverviewChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ClassHeatmap />
        </Suspense>
      </div>
    </div>
  );
}
