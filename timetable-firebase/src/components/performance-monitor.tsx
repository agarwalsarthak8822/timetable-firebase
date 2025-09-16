
'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log('Performance Metric:', {
          name: entry.name,
          value: entry.value,
          startTime: entry.startTime,
          duration: entry.duration,
        });
      }
    });

    // Observe different types of performance entries
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });

    // Monitor bundle size
    const bundleSize = performance.getEntriesByType('resource')
      .filter(entry => entry.name.includes('.js'))
      .reduce((total, entry) => total + entry.transferSize, 0);

    console.log('Bundle Size:', bundleSize, 'bytes');

    return () => observer.disconnect();
  }, []);

  return null;
}

export default PerformanceMonitor;
