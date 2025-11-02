// Performance Tracker Utility for Core Web Vitals Monitoring
// Tracks FCP, LCP, CLS, FID, and TTFB with detailed reporting

class PerformanceTracker {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isTracking = false;
    this.reportCallbacks = [];
  }

  // Initialize performance tracking
  init() {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.trackTTFB();
    this.trackFCP();
    this.trackLCP();
    this.trackCLS();
    this.trackFID();
    this.trackINP();
    
    // Start continuous monitoring
    this.startPerformanceMonitoring();
  }

  // Track Time to First Byte (TTFB)
  trackTTFB() {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        this.metrics.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
        this.reportMetric('TTFB', this.metrics.TTFB);
      }
    } catch (error) {
      console.warn('TTFB tracking failed:', error);
    }
  }

  // Track First Contentful Paint (FCP)
  trackFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = entry.startTime;
            this.reportMetric('FCP', this.metrics.FCP);
            observer.disconnect();
          }
        }
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP tracking failed:', error);
    }
  }

  // Track Largest Contentful Paint (LCP)
  trackLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.LCP = lastEntry.startTime;
        this.reportMetric('LCP', this.metrics.LCP);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP tracking failed:', error);
    }
  }

  // Track Cumulative Layout Shift (CLS)
  trackCLS() {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // If the entry occurred less than 1 second after the previous entry
            if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && 
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.CLS = clsValue;
              this.reportMetric('CLS', this.metrics.CLS);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS tracking failed:', error);
    }
  }

  // Track First Input Delay (FID)
  trackFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.FID = entry.processingStart - entry.startTime;
          this.reportMetric('FID', this.metrics.FID);
          observer.disconnect();
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID tracking failed:', error);
    }
  }

  // Track Interaction to Next Paint (INP)
  trackINP() {
    try {
      let interactions = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          interactions.push(entry.processingStart - entry.startTime);
          
          // Keep only the worst 10 interactions
          interactions.sort((a, b) => b - a);
          if (interactions.length > 10) {
            interactions = interactions.slice(0, 10);
          }
          
          // INP is the 98th percentile of all interactions
          const inp = interactions.length >= 50 ? 
            interactions[Math.floor(interactions.length * 0.02)] : 
            Math.max(...interactions);
            
          this.metrics.INP = inp;
          this.reportMetric('INP', this.metrics.INP);
        }
      });
      
      observer.observe({ entryTypes: ['event'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('INP tracking failed:', error);
    }
  }

  // Start continuous performance monitoring
  startPerformanceMonitoring() {
    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        };
      }, 5000);
    }

    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        this.metrics.FPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  // Report individual metric
  reportMetric(name, value) {
    const timestamp = Date.now();
    const grade = this.getMetricGrade(name, value);
    
    if (typeof window !== 'undefined' && window.console) {
      console.log(`📊 ${name}: ${this.formatMetricValue(name, value)} (${grade})`);
    }

    // Call registered callbacks
    this.reportCallbacks.forEach(callback => {
      try {
        callback({ name, value, grade, timestamp });
      } catch (error) {
        console.warn('Performance callback error:', error);
      }
    });
  }

  // Format metric values for display
  formatMetricValue(name, value) {
    switch (name) {
      case 'FCP':
      case 'LCP':
      case 'FID':
      case 'INP':
      case 'TTFB':
        return `${Math.round(value)}ms`;
      case 'CLS':
        return value.toFixed(4);
      case 'FPS':
        return `${value} fps`;
      default:
        return value;
    }
  }

  // Get performance grade for metrics
  getMetricGrade(name, value) {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      INP: { good: 200, poor: 500 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      FPS: { good: 55, poor: 30 }
    };

    const threshold = thresholds[name];
    if (!threshold) return 'Unknown';

    if (name === 'FPS') {
      // Higher is better for FPS
      if (value >= threshold.good) return 'Good';
      if (value >= threshold.poor) return 'Needs Improvement';
      return 'Poor';
    } else {
      // Lower is better for other metrics
      if (value <= threshold.good) return 'Good';
      if (value <= threshold.poor) return 'Needs Improvement';
      return 'Poor';
    }
  }

  // Get overall performance score
  getOverallScore() {
    const weights = {
      FCP: 0.15,
      LCP: 0.25,
      FID: 0.15,
      INP: 0.15,
      CLS: 0.15,
      TTFB: 0.15
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([metric, weight]) => {
      if (this.metrics[metric] !== undefined) {
        const grade = this.getMetricGrade(metric, this.metrics[metric]);
        const score = grade === 'Good' ? 100 : grade === 'Needs Improvement' ? 50 : 0;
        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  // Get overall letter grade
  getOverallGrade() {
    const score = this.getOverallScore();
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  // Generate comprehensive performance report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      metrics: { ...this.metrics },
      grades: {},
      overallScore: this.getOverallScore(),
      overallGrade: this.getOverallGrade(),
      recommendations: []
    };

    // Add grades for each metric
    Object.entries(this.metrics).forEach(([name, value]) => {
      if (typeof value === 'number') {
        report.grades[name] = this.getMetricGrade(name, value);
      }
    });

    // Add performance recommendations
    report.recommendations = this.getRecommendations(report);

    return report;
  }

  // Get performance recommendations
  getRecommendations(report) {
    const recommendations = [];

    if (report.metrics.FCP > 1800) {
      recommendations.push('Improve First Contentful Paint by optimizing critical CSS and reducing render-blocking resources');
    }

    if (report.metrics.LCP > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by compressing images, using a CDN, and implementing lazy loading');
    }

    if (report.metrics.FID > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time and using web workers');
    }

    if (report.metrics.CLS > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift by setting dimensions on images and avoiding dynamic content insertion');
    }

    if (report.metrics.TTFB > 800) {
      recommendations.push('Improve server response time and consider using a CDN or caching strategy');
    }

    if (report.metrics.FPS && report.metrics.FPS < 55) {
      recommendations.push('Optimize animations and reduce JavaScript complexity to improve frame rate');
    }

    return recommendations;
  }

  // Register callback for metric updates
  onMetricUpdate(callback) {
    this.reportCallbacks.push(callback);
  }

  // Print formatted report to console
  printReport() {
    const report = this.generateReport();
    
    console.group('🚀 Performance Report');
    console.log(`Overall Grade: ${report.overallGrade} (${report.overallScore}/100)`);
    console.log(`URL: ${report.url}`);
    console.log(`Timestamp: ${report.timestamp}`);
    
    console.group('📊 Core Web Vitals');
    Object.entries(report.metrics).forEach(([name, value]) => {
      if (typeof value === 'number' && report.grades[name]) {
        console.log(`${name}: ${this.formatMetricValue(name, value)} (${report.grades[name]})`);
      }
    });
    console.groupEnd();
    
    if (report.recommendations.length > 0) {
      console.group('💡 Recommendations');
      report.recommendations.forEach(rec => console.log(`• ${rec}`));
      console.groupEnd();
    }
    
    console.groupEnd();
    
    return report;
  }

  // Clean up observers and stop tracking
  destroy() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    
    this.observers = [];
    this.isTracking = false;
    this.reportCallbacks = [];
  }
}

// Create singleton instance
const performanceTracker = new PerformanceTracker();

// Auto-initialize in browser environment
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceTracker.init();
  });
} else if (typeof window !== 'undefined') {
  performanceTracker.init();
}

export default performanceTracker;
export { PerformanceTracker };