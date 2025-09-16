import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/app-layout';
import { AuthProvider } from '@/context/auth-context';
import { RealtimeProvider } from '@/context/realtime-context';

export const metadata: Metadata = {
  title: 'Smart Timetable Management',
  description: 'AI-Powered Academic Scheduling System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('h-full font-body antialiased')}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global error handler for extension interference
              window.addEventListener('error', function(event) {
                if (event.error?.message?.includes('invalid uint 32: NaN') || 
                    event.filename?.includes('chrome-extension://')) {
                  event.preventDefault();
                  console.log('🛡️ Blocked extension interference error');
                  return false;
                }
              });
              
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason?.message?.includes('invalid uint 32: NaN')) {
                  event.preventDefault();
                  console.log('🛡️ Blocked extension promise rejection');
                  return false;
                }
              });
            `,
          }}
        />
        <AuthProvider>
          <RealtimeProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </RealtimeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
