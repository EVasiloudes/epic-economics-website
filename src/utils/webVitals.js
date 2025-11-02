// Lightweight Core Web Vitals measurement
// This implementation won't block the main thread and only runs in development

let webVitalsData = {
  CLS: null,
  FID: null,
  FCP: null,
  LCP: null,
  TTFB: null,
  INP: null
};

// Simple performance observer for Core Web Vitals
const initWebVitals = () => {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return;
  }

  // Measure TTFB (Time to First Byte)
  if ('performance' in window && 'getEntriesByType' in performance) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
      webVitalsData.TTFB = `${ttfb.toFixed(2)}ms`;
    }
  }

  // Use PerformanceObserver for other metrics if available
  if ('PerformanceObserver' in window) {
    try {
      // Observe paint metrics (FCP)
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            webVitalsData.FCP = `${entry.startTime.toFixed(2)}ms`;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe layout shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        if (clsValue > 0) {
          webVitalsData.CLS = clsValue.toFixed(4);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Observe largest contentful paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        webVitalsData.LCP = `${lastEntry.startTime.toFixed(2)}ms`;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe first input delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          webVitalsData.FID = `${entry.processingStart - entry.startTime.toFixed(2)}ms`;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

    } catch (error) {
      console.warn('Web Vitals observation failed:', error.message);
    }
  }

  // Report vitals after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      reportWebVitals();
    }, 1000);
  });
};

// Report collected vitals
const reportWebVitals = () => {
  if (!import.meta.env.DEV) return;

  const vitals = { ...webVitalsData };
  
  // Add default values for unmeasured metrics
  Object.keys(vitals).forEach(key => {
    if (vitals[key] === null) {
      vitals[key] = 'Not measured';
    }
  });

  console.group('📊 Core Web Vitals Report');
  console.table(vitals);
  console.groupEnd();

  // Grade the performance
  const grade = getPerformanceGrade(vitals);
  console.log(`🎯 Core Web Vitals Grade: ${grade}`);
};

// Simple performance grading
const getPerformanceGrade = (vitals) => {
  let score = 0;
  let measurements = 0;

  // FCP scoring (good < 1800ms, needs improvement < 3000ms)
  if (vitals.FCP !== 'Not measured') {
    const fcp = parseFloat(vitals.FCP);
    if (fcp < 1800) score += 20;
    else if (fcp < 3000) score += 10;
    measurements++;
  }

  // LCP scoring (good < 2500ms, needs improvement < 4000ms)
  if (vitals.LCP !== 'Not measured') {
    const lcp = parseFloat(vitals.LCP);
    if (lcp < 2500) score += 20;
    else if (lcp < 4000) score += 10;
    measurements++;
  }

  // CLS scoring (good < 0.1, needs improvement < 0.25)
  if (vitals.CLS !== 'Not measured') {
    const cls = parseFloat(vitals.CLS);
    if (cls < 0.1) score += 20;
    else if (cls < 0.25) score += 10;
    measurements++;
  }

  // FID scoring (good < 100ms, needs improvement < 300ms)
  if (vitals.FID !== 'Not measured') {
    const fid = parseFloat(vitals.FID);
    if (fid < 100) score += 20;
    else if (fid < 300) score += 10;
    measurements++;
  }

  // TTFB scoring (good < 200ms, needs improvement < 500ms)
  if (vitals.TTFB !== 'Not measured') {
    const ttfb = parseFloat(vitals.TTFB);
    if (ttfb < 200) score += 20;
    else if (ttfb < 500) score += 10;
    measurements++;
  }

  if (measurements === 0) return 'No measurements available';

  const percentage = (score / (measurements * 20)) * 100;
  
  if (percentage >= 90) return 'Excellent (A+)';
  if (percentage >= 80) return 'Good (A)';
  if (percentage >= 70) return 'Fair (B)';
  if (percentage >= 60) return 'Poor (C)';
  return 'Critical (F)';
};

// Get current vitals data
const getWebVitals = () => {
  return { ...webVitalsData };
};

// Export functions
export { initWebVitals, reportWebVitals, getWebVitals };