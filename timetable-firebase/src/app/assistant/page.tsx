'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminOnly } from '@/components/role-guard';

// Lazy load the assistant component
const Assistant = dynamic(() => import('@/components/assistant/assistant').then(mod => ({ default: mod.Assistant })), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
  ssr: false
});

export default function AssistantPage() {
  return (
    <AdminOnly>
      <div className="space-y-6">
         <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Assistant</h2>
          <p className="text-muted-foreground">
            Ask the AI assistant anything.
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <Assistant />
        </Suspense>
      </div>
    </AdminOnly>
  );
}
