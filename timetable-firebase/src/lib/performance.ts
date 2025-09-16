
// Performance monitoring configuration
export const performanceConfig = {
  // Enable performance monitoring
  enableMonitoring: process.env.NODE_ENV === 'production',
  
  // Bundle analyzer
  analyzeBundle: process.env.ANALYZE === 'true',
  
  // Performance metrics
  metrics: {
    // Core Web Vitals
    LCP: 2.5, // Largest Contentful Paint
    FID: 100, // First Input Delay
    CLS: 0.1, // Cumulative Layout Shift
    
    // Additional metrics
    FCP: 1.8, // First Contentful Paint
    TTFB: 600, // Time to First Byte
  },
  
  // Optimization settings
  optimization: {
    // Image optimization
    imageFormats: ['webp', 'avif'],
    imageQuality: 80,
    
    // Code splitting
    chunkSizeLimit: 250000, // 250KB
    
    // Caching
    cacheTTL: 31536000, // 1 year
    
    // Compression
    compressionLevel: 6,
  },
};

export default performanceConfig;
