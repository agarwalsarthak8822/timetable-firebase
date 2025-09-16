'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, School, Video, Sparkles, BookOpen, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types';

const getNavItems = (userRole: UserRole) => {
  const baseItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'faculty', 'admin'] },
    { href: '/timetable', label: 'Timetable', icon: Calendar, roles: ['student', 'faculty', 'admin'] },
  ];

  const roleSpecificItems = {
    student: [
      { href: '/my-classes', label: 'My Classes', icon: BookOpen, roles: ['student'] },
    ],
    faculty: [
      { href: '/faculty', label: 'Faculty', icon: Users, roles: ['faculty', 'admin'] },
      { href: '/my-schedule', label: 'My Schedule', icon: Calendar, roles: ['faculty'] },
    ],
    admin: [
      { href: '/faculty', label: 'Faculty', icon: Users, roles: ['faculty', 'admin'] },
      { href: '/classrooms', label: 'Classrooms', icon: School, roles: ['admin'] },
      { href: '/live-classes', label: 'Live Classes', icon: Video, roles: ['admin'] },
      { href: '/assistant', label: 'AI Assistant', icon: Sparkles, roles: ['admin'] },
      { href: '/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
    ]
  };

  return [
    ...baseItems,
    ...roleSpecificItems[userRole]
  ].filter(item => item.roles.includes(userRole));
};

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (!user) return null;
  
  const navItems = getNavItems(user.role);

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{
              children: item.label,
              side: "right",
              align: "center",
            }}
            className={cn(
              "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
              pathname === item.href 
                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-md" 
                : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
            )}
          >
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <item.icon className={cn(
                "transition-all duration-300 group-hover:scale-110",
                pathname === item.href ? "text-primary" : ""
              )} />
              <span className={cn(
                "transition-all duration-300",
                pathname === item.href ? "font-semibold" : ""
              )}>{item.label}</span>
              {pathname === item.href && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse" />
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
