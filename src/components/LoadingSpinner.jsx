import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
