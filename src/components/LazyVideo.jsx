import React, { useState, useRef, useEffect, useCallback } from 'react';
import './LazyVideo.css';

/**
 * LazyVideo - An optimized video component with lazy loading and error handling
 *
 * Features:
 * - Intersection Observer for viewport-based loading
 * - Automatic retry with exponential backoff
 * - Network status detection
 * - Accessible and performant
 */
const LazyVideo = ({
  src,
  poster,
  title,
  className = '',
  autoplay = false,
  muted = true,
  controls = true,
  loop = false,
  preload = 'none',
  priority = false,
  width,
  height,
  style = {},
  onLoadStart,
  onLoadedData,
  onError
}) => {
  // Core state
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine ?? true);

  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  const MAX_RETRIES = 3;

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRef.current = observer;
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, isIntersecting]);

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Video event handlers
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setRetryCount(0);
  }, []);

  const handleLoadedData = useCallback(() => {
    setIsLoading(false);
    setRetryCount(0);
    onLoadedData?.();
  }, [onLoadedData]);

  const handleVideoError = useCallback((event) => {
    const error = event.target.error;
    console.error('Video load error:', {
      src,
      code: error?.code,
      message: error?.message,
      retryCount,
      isOnline
    });

    // Clear any pending retry
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    // Retry logic with exponential backoff
    if (retryCount < MAX_RETRIES && isOnline) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);

      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (videoRef.current && src) {
          // Force reload with cache-busting parameter
          const separator = src.includes('?') ? '&' : '?';
          videoRef.current.src = `${src}${separator}retry=${Date.now()}`;
          videoRef.current.load();
        }
      }, delay);
    } else {
      setHasError(true);
      setIsLoading(false);
      onError?.(error);
    }
  }, [src, retryCount, isOnline, onError]);

  const handleManualRetry = useCallback(() => {
    if (!isOnline) {
      alert('You appear to be offline. Please check your internet connection.');
      return;
    }

    setHasError(false);
    setRetryCount(0);
    setIsLoading(true);

    if (videoRef.current && src) {
      const separator = src.includes('?') ? '&' : '?';
      videoRef.current.src = `${src}${separator}manual=${Date.now()}`;
      videoRef.current.load();
    }
  }, [isOnline, src]);

  const handlePosterError = useCallback((e) => {
    console.warn('Poster image failed to load:', poster);
    e.target.style.display = 'none';
  }, [poster]);

  // Determine video MIME type
  const getVideoType = (url) => {
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.mov')) return 'video/quicktime';
    return 'video/mp4';
  };

  return (
    <div
      ref={containerRef}
      className={`lazy-video-container ${className} ${hasError ? 'has-error' : ''} ${isLoading ? 'is-loading' : ''}`}
      style={style}
      data-network-status={isOnline ? 'online' : 'offline'}
    >
      {hasError ? (
        // Error state
        <div className="lazy-video-error">
          <div className="error-icon">⚠️</div>
          <p>Unable to load video</p>
          <p className="error-subtitle">
            {!isOnline
              ? 'You appear to be offline. Please check your connection.'
              : 'The video failed to load. Please try again.'}
          </p>
          {retryCount > 0 && (
            <p className="retry-info">
              Attempted {retryCount} time{retryCount !== 1 ? 's' : ''}
            </p>
          )}
          <button
            className="retry-button"
            onClick={handleManualRetry}
            disabled={!isOnline}
            aria-label="Retry loading video"
          >
            {isOnline ? 'Retry' : 'Offline'}
          </button>
        </div>
      ) : (
        <>
          {/* Placeholder with poster */}
          {!isIntersecting && (
            <div className="lazy-video-placeholder">
              {poster && (
                <img
                  src={poster}
                  alt={title || 'Video thumbnail'}
                  className="video-poster"
                  onError={handlePosterError}
                  loading="lazy"
                />
              )}
              <div className="play-button-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Loading spinner */}
          {isIntersecting && isLoading && (
            <div className="lazy-video-loading">
              <div className="loading-spinner"></div>
              <p>
                Loading video
                {retryCount > 0 ? ` (attempt ${retryCount + 1})` : ''}...
              </p>
              {!isOnline && (
                <p className="offline-notice">Waiting for connection...</p>
              )}
            </div>
          )}

          {/* Video element */}
          {isIntersecting && (
            <video
              ref={videoRef}
              poster={poster}
              title={title}
              autoPlay={autoplay}
              muted={muted}
              controls={controls}
              loop={loop}
              preload={preload}
              width={width}
              height={height}
              playsInline
              crossOrigin="anonymous"
              className="lazy-video"
              onLoadStart={handleLoadStart}
              onLoadedData={handleLoadedData}
              onCanPlay={handleCanPlay}
              onError={handleVideoError}
              style={{
                opacity: isLoading ? 0 : 1
              }}
              aria-label={title || 'Video player'}
            >
              <source src={src} type={getVideoType(src)} />
              <p>
                Your browser doesn't support HTML5 video.{' '}
                <a href={src} target="_blank" rel="noopener noreferrer">
                  Download the video
                </a>
                .
              </p>
            </video>
          )}
        </>
      )}
    </div>
  );
};

export default LazyVideo;
