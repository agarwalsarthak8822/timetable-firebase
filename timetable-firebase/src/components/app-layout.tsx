
'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { MainNav } from '@/components/main-nav';
import { School } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);


  if (pathname === '/login') {
    return <>{children}</>;
  }
  
  if (loading || !user) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
      <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r border-primary/10 bg-gradient-to-b from-sidebar/95 to-sidebar/90 backdrop-blur-sm">
          <SidebarHeader className="border-b border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
            <Button variant="ghost" size="icon" className="size-9 hover:bg-primary/10 transition-all duration-300 hover:scale-105" asChild>
              <a href="/">
                <School className="size-5 text-primary animate-pulse" />
                <span className="sr-only">Smart Timetable</span>
              </a>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter>
            {/* This UserNav is for collapsed sidebar view */}
            <div className="hidden group-data-[collapsible=icon]:block">
              <UserNav />
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-primary/10 bg-gradient-to-r from-background/90 to-primary/5 px-4 backdrop-blur-md sm:px-6 shadow-sm">
            <SidebarTrigger className="md:hidden" />
            <div/>
            <UserNav />
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gradient-to-br from-background via-primary/2 to-accent/2 min-h-screen">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
  );
}
