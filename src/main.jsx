import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import performanceTracker from './utils/performanceTracker.js'

// Initialize performance tracking
if (import.meta.env.DEV) {
  performanceTracker.init();
  
  // Log performance report after 10 seconds
  setTimeout(() => {
    performanceTracker.printReport();
  }, 10000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
