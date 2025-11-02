// Performance monitoring utilities for GSAP Hero component
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      frameRate: [],
      scrollEvents: 0,
      animationFrames: 0,
      startTime: performance.now(),
      lastFrameTime: performance.now()
    };
    
    this.isMonitoring = false;
    this.rafId = null;
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.metrics.startTime = performance.now();
    this.monitorFrameRate();
    this.monitorScrollPerformance();
    
    console.log('🚀 Performance monitoring started');
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.generateReport();
  }

  monitorFrameRate() {
    const measureFrame = () => {
      if (!this.isMonitoring) return;
      
      const currentTime = performance.now();
      const deltaTime = currentTime - this.metrics.lastFrameTime;
      const fps = 1000 / deltaTime;
      
      this.metrics.frameRate.push(fps);
      this.metrics.animationFrames++;
      this.metrics.lastFrameTime = currentTime;
      
      // Keep only last 60 frame measurements
      if (this.metrics.frameRate.length > 60) {
        this.metrics.frameRate.shift();
      }
      
      this.rafId = requestAnimationFrame(measureFrame);
    };
    
    this.rafId = requestAnimationFrame(measureFrame);
  }

  monitorScrollPerformance() {
    const scrollHandler = () => {
      this.metrics.scrollEvents++;
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }

  generateReport() {
    const duration = (performance.now() - this.metrics.startTime) / 1000;
    const avgFps = this.metrics.frameRate.reduce((a, b) => a + b, 0) / this.metrics.frameRate.length;
    const minFps = Math.min(...this.metrics.frameRate);
    const maxFps = Math.max(...this.metrics.frameRate);
    
    const report = {
      duration: `${duration.toFixed(2)}s`,
      averageFPS: avgFps.toFixed(2),
      minFPS: minFps.toFixed(2),
      maxFPS: maxFps.toFixed(2),
      totalFrames: this.metrics.animationFrames,
      scrollEvents: this.metrics.scrollEvents,
      scrollEventsPerSecond: (this.metrics.scrollEvents / duration).toFixed(2),
      performance: this.getPerformanceGrade(avgFps, minFps)
    };
    
    console.group('📊 Performance Report');
    console.table(report);
    console.groupEnd();
    
    return report;
  }

  getPerformanceGrade(avgFps, minFps) {
    if (avgFps >= 58 && minFps >= 45) return 'Excellent (A+)';
    if (avgFps >= 50 && minFps >= 35) return 'Good (A)';
    if (avgFps >= 40 && minFps >= 25) return 'Fair (B)';
    if (avgFps >= 30 && minFps >= 20) return 'Poor (C)';
    return 'Critical (F)';
  }

  getCurrentFPS() {
    if (this.metrics.frameRate.length === 0) return 0;
    return this.metrics.frameRate[this.metrics.frameRate.length - 1];
  }
}

// Browser capability detection
export const detectBrowserCapabilities = () => {
  const capabilities = {
    supportsWebGL: !!window.WebGLRenderingContext,
    supportsWebGL2: !!window.WebGL2RenderingContext,
    supportsHardwareAcceleration: false,
    supportsPassiveListeners: false,
    supportsIntersectionObserver: !!window.IntersectionObserver,
    supportsResizeObserver: !!window.ResizeObserver,
    devicePixelRatio: window.devicePixelRatio || 1,
    userAgent: navigator.userAgent,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    isFirefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  };

  // Test for hardware acceleration
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    capabilities.supportsHardwareAcceleration = ctx.willReadFrequently !== undefined;
  } catch {
    capabilities.supportsHardwareAcceleration = false;
  }

  // Test for passive listeners
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        capabilities.supportsPassiveListeners = true;
        return false;
      }
    });
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch {
    capabilities.supportsPassiveListeners = false;
  }

  return capabilities;
};

// Performance optimization suggestions
export const getOptimizationSuggestions = (capabilities) => {
  const suggestions = [];

  if (!capabilities.supportsHardwareAcceleration) {
    suggestions.push('Browser may not support hardware acceleration. Consider fallback animations.');
  }

  if (capabilities.devicePixelRatio > 2) {
    suggestions.push('High DPI display detected. Consider optimizing for retina displays.');
  }

  if (capabilities.isMobile) {
    suggestions.push('Mobile device detected. Consider reducing animation complexity.');
  }

  if (capabilities.isSafari) {
    suggestions.push('Safari detected. Use -webkit- prefixes and test transform3d performance.');
  }

  if (capabilities.isFirefox) {
    suggestions.push('Firefox detected. Test will-change property effectiveness.');
  }

  if (!capabilities.supportsPassiveListeners) {
    suggestions.push('Passive event listeners not supported. Scroll performance may be impacted.');
  }

  return suggestions;
};

// Debounce utility for performance
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle utility for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if (performance.memory) {
    return {
      usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
    };
  }
  return null;
};

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  const vitalsData = {
    CLS: null,
    FID: null,
    FCP: null,
    LCP: null,
    TTFB: null,
    INP: null
  };

  // Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
      vitalsData.CLS = clsValue;
    });

    if ('PerformanceObserver' in window && 'layout-shift' in PerformanceObserver.supportedEntryTypes) {
      observer.observe({ entryTypes: ['layout-shift'] });
    }

    return () => observer.disconnect();
  };

  // First Input Delay (FID) / Interaction to Next Paint (INP)
  const measureFID = () => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          vitalsData.FID = entry.processingStart - entry.startTime;
        }
        if (entry.entryType === 'event') {
          vitalsData.INP = entry.processingStart - entry.startTime;
        }
      }
    });

    const entryTypes = [];
    if ('first-input' in PerformanceObserver.supportedEntryTypes) {
      entryTypes.push('first-input');
    }
    if ('event' in PerformanceObserver.supportedEntryTypes) {
      entryTypes.push('event');
    }

    if (entryTypes.length > 0) {
      observer.observe({ entryTypes });
    }

    return () => observer.disconnect();
  };

  // Largest Contentful Paint (LCP)
  const measureLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      vitalsData.LCP = lastEntry.startTime;
    });

    if ('largest-contentful-paint' in PerformanceObserver.supportedEntryTypes) {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    return () => observer.disconnect();
  };

  // First Contentful Paint (FCP)
  const measureFCP = () => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          vitalsData.FCP = entry.startTime;
        }
      }
    });

    if ('paint' in PerformanceObserver.supportedEntryTypes) {
      observer.observe({ entryTypes: ['paint'] });
    }

    return () => observer.disconnect();
  };

  // Time to First Byte (TTFB)
  const measureTTFB = () => {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      vitalsData.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
    }
  };

  // Initialize measurements
  const cleanupFunctions = [
    measureCLS(),
    measureFID(),
    measureLCP(),
    measureFCP()
  ].filter(Boolean);

  measureTTFB();

  // Return data getter and cleanup function
  return {
    getVitals: () => vitalsData,
    cleanup: () => cleanupFunctions.forEach(cleanup => cleanup()),
    getReport: () => {
      const report = {
        'Core Web Vitals': {
          'CLS (Cumulative Layout Shift)': vitalsData.CLS?.toFixed(4) || 'Not measured',
          'FID (First Input Delay)': vitalsData.FID ? `${vitalsData.FID.toFixed(2)}ms` : 'Not measured',
          'LCP (Largest Contentful Paint)': vitalsData.LCP ? `${vitalsData.LCP.toFixed(2)}ms` : 'Not measured',
          'FCP (First Contentful Paint)': vitalsData.FCP ? `${vitalsData.FCP.toFixed(2)}ms` : 'Not measured',
          'TTFB (Time to First Byte)': vitalsData.TTFB ? `${vitalsData.TTFB.toFixed(2)}ms` : 'Not measured',
          'INP (Interaction to Next Paint)': vitalsData.INP ? `${vitalsData.INP.toFixed(2)}ms` : 'Not measured'
        }
      };

      console.group('📊 Core Web Vitals Report');
      console.table(report['Core Web Vitals']);
      console.groupEnd();

      return report;
    },
    getGrades: () => {
      const grades = {};
      
      // CLS grading (lower is better)
      if (vitalsData.CLS !== null) {
        grades.CLS = vitalsData.CLS <= 0.1 ? 'Good' : vitalsData.CLS <= 0.25 ? 'Needs Improvement' : 'Poor';
      }
      
      // FID grading (lower is better)
      if (vitalsData.FID !== null) {
        grades.FID = vitalsData.FID <= 100 ? 'Good' : vitalsData.FID <= 300 ? 'Needs Improvement' : 'Poor';
      }
      
      // LCP grading (lower is better)
      if (vitalsData.LCP !== null) {
        grades.LCP = vitalsData.LCP <= 2500 ? 'Good' : vitalsData.LCP <= 4000 ? 'Needs Improvement' : 'Poor';
      }
      
      // FCP grading (lower is better)
      if (vitalsData.FCP !== null) {
        grades.FCP = vitalsData.FCP <= 1800 ? 'Good' : vitalsData.FCP <= 3000 ? 'Needs Improvement' : 'Poor';
      }
      
      // TTFB grading (lower is better)
      if (vitalsData.TTFB !== null) {
        grades.TTFB = vitalsData.TTFB <= 800 ? 'Good' : vitalsData.TTFB <= 1800 ? 'Needs Improvement' : 'Poor';
      }

      return grades;
    }
  };
};

// Network quality detection
export const detectNetworkQuality = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) {
    return {
      effectiveType: 'unknown',
      downlink: 'unknown',
      rtt: 'unknown',
      saveData: false
    };
  }

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  };
};

// Enhanced performance monitor that includes Core Web Vitals
export class EnhancedPerformanceMonitor extends PerformanceMonitor {
  constructor() {
    super();
    this.webVitals = null;
    this.networkQuality = detectNetworkQuality();
  }

  startMonitoring() {
    super.startMonitoring();
    this.webVitals = trackCoreWebVitals();
    
    console.log('🚀 Enhanced performance monitoring started with Core Web Vitals');
  }

  stopMonitoring() {
    super.stopMonitoring();
    
    if (this.webVitals) {
      this.webVitals.getReport();
      this.webVitals.cleanup();
    }
  }

  generateEnhancedReport() {
    const baseReport = this.generateReport();
    const webVitalsData = this.webVitals ? this.webVitals.getVitals() : {};
    const webVitalsGrades = this.webVitals ? this.webVitals.getGrades() : {};

    const enhancedReport = {
      ...baseReport,
      coreWebVitals: webVitalsData,
      webVitalsGrades: webVitalsGrades,
      networkQuality: this.networkQuality,
      overallGrade: this.calculateOverallGrade(baseReport, webVitalsGrades)
    };

    console.group('📊 Enhanced Performance Report');
    console.table({
      'Performance': baseReport.performance,
      'Overall Grade': enhancedReport.overallGrade,
      'Network Quality': this.networkQuality.effectiveType
    });
    console.groupEnd();

    return enhancedReport;
  }

  calculateOverallGrade(baseReport, webVitalsGrades) {
    const grades = Object.values(webVitalsGrades);
    const goodCount = grades.filter(grade => grade === 'Good').length;
    const totalCount = grades.length;
    
    if (totalCount === 0) return baseReport.performance;
    
    const goodPercentage = (goodCount / totalCount) * 100;
    
    if (goodPercentage >= 80) return 'Excellent (A+)';
    if (goodPercentage >= 60) return 'Good (A)';
    if (goodPercentage >= 40) return 'Fair (B)';
    if (goodPercentage >= 20) return 'Poor (C)';
    return 'Critical (F)';
  }
}

// Default export with easy-to-use API
export default {
  PerformanceMonitor,
  EnhancedPerformanceMonitor,
  detectBrowserCapabilities,
  getOptimizationSuggestions,
  debounce,
  throttle,
  trackMemoryUsage,
  trackCoreWebVitals,
  detectNetworkQuality
};