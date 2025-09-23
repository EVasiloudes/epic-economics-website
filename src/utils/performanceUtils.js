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
  } catch (e) {
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
  } catch (e) {
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

// Default export with easy-to-use API
export default {
  PerformanceMonitor,
  detectBrowserCapabilities,
  getOptimizationSuggestions,
  debounce,
  throttle,
  trackMemoryUsage
};