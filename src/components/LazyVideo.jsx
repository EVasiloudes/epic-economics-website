import React, { useState, useRef, useEffect, useCallback } from 'react';
import './LazyVideo.css';

// Production video optimization
const isProduction = import.meta.env.PROD;
const VIDEO_CHUNK_SIZE = 1024 * 1024; // 1MB chunks for streaming

const LazyVideo = ({ 
  src, 
  poster, 
  title, 
  className = '', 
  autoplay = false, 
  muted = true, 
  controls = true, 
  loop = false,
  preload = 'metadata',
  width,
  height,
  style = {},
  onLoadStart,
  onLoadedData,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('unknown');
  const [loadProgress, setLoadProgress] = useState(0);
  const [useStreamingLoad, setUseStreamingLoad] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const maxRetries = isProduction ? 3 : 2;

  // Check network status
  useEffect(() => {
    if (navigator.onLine !== undefined) {
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
      
      const handleOnline = () => setNetworkStatus('online');
      const handleOffline = () => setNetworkStatus('offline');
      
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Simplified intersection observer setup
  useEffect(() => {
    // Don't initialize if already intersecting
    if (isIntersecting) return;

    // Shorter fallback timeout to reduce wait time
    timeoutRef.current = setTimeout(() => {
      setIsIntersecting(true);
    }, 1000);

    // Simplified intersection observer with less frequent checks
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    } else {
      setIsIntersecting(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      observerRef.current?.disconnect();
    };
  }, []);

  // Video event handlers
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    setRetryCount(0);
    onLoadedData?.();
  }, [onLoadedData]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setRetryCount(0);
  }, []);

  const handleError = useCallback((error) => {
    console.error('Video loading error:', {
      error,
      src,
      title,
      retryCount,
      networkStatus,
      userAgent: navigator.userAgent,
      isProduction
    });

    if (retryCount < maxRetries && networkStatus === 'online') {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
      
      // Simplified retry logic
      if (isProduction && retryCount === 0) {
        setUseStreamingLoad(true);
      }
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (videoRef.current) {
          const currentSrc = videoRef.current.src;
          videoRef.current.src = '';
          videoRef.current.load();
          // Enhanced cache busting for production
          const cacheBuster = isProduction ? 
            `retry=${retryCount}&t=${Date.now()}&stream=${useStreamingLoad ? '1' : '0'}` :
            `t=${Date.now()}`;
          videoRef.current.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + cacheBuster;
          videoRef.current.load();
        }
      }, delay);
    } else {
      setHasError(true);
      setIsLoading(false);
      onError?.(error);
    }
  }, [src, title, retryCount, networkStatus, maxRetries, onError, useStreamingLoad]);

  const handleRetry = useCallback(() => {
    if (networkStatus === 'offline') {
      alert('You appear to be offline. Please check your internet connection and try again.');
      return;
    }

    setHasError(false);
    setRetryCount(0);
    setIsLoading(true);
    setIsLoaded(false);
    setLoadProgress(0);
    
    // Enable streaming load for manual retries in production
    if (isProduction) {
      setUseStreamingLoad(true);
    }
    
    if (videoRef.current) {
      const currentSrc = videoRef.current.src;
      videoRef.current.src = '';
      videoRef.current.load();
      const cacheBuster = isProduction ? 
        `manual=1&stream=1&t=${Date.now()}` :
        `retry=${Date.now()}`;
      videoRef.current.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + cacheBuster;
      videoRef.current.load();
    }
  }, [networkStatus]);

  // Handle poster image errors
  const handlePosterError = useCallback((e) => {
    console.warn('Poster image failed to load:', poster);
    // Hide the broken poster image
    e.target.style.display = 'none';
  }, [poster]);

  // Determine video sources with fallbacks
  const getVideoSources = useCallback(() => {
    const sources = [];
    
    if (src) {
      // In production, add cache-busting and compression hints
      let videoSrc = src;
      if (isProduction) {
        const urlParams = new URLSearchParams();
        urlParams.append('v', '1');
        if (useStreamingLoad) {
          urlParams.append('stream', '1');
        }
        videoSrc = `${src}${src.includes('?') ? '&' : '?'}${urlParams.toString()}`;
      }
      
      sources.push({
        src: videoSrc,
        type: src.endsWith('.mp4') ? 'video/mp4' : 
              src.endsWith('.webm') ? 'video/webm' :
              src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'
      });
    }

    return sources;
  }, [src, useStreamingLoad]);

  const sources = getVideoSources();



  return (
    <div 
      ref={containerRef}
      className={`lazy-video-container ${className} ${hasError ? 'has-error' : ''} ${isLoading ? 'is-loading' : ''}`}
      style={style}
      data-network-status={networkStatus}
    >
      {hasError ? (
        <div className="lazy-video-error">
          <div className="error-icon">⚠️</div>
          <p>Unable to load video</p>
          <p className="error-subtitle">
            {networkStatus === 'offline' 
              ? 'You appear to be offline. Please check your connection.'
              : 'Please check your connection and try again'
            }
          </p>
          {retryCount > 0 && (
            <p className="retry-info">Attempted {retryCount} time{retryCount !== 1 ? 's' : ''}</p>
          )}
          <button 
            className="retry-button"
            onClick={handleRetry}
            disabled={networkStatus === 'offline'}
            aria-label="Retry loading video"
          >
            {networkStatus === 'offline' ? 'Offline' : 'Retry'}
          </button>
        </div>
      ) : (
        <>
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
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {isIntersecting && (
            <>
              {isLoading && (
                <div className="lazy-video-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading video{retryCount > 0 ? ` (attempt ${retryCount + 1})` : ''}...</p>
                  {loadProgress > 0 && (
                    <div className="loading-progress">
                      <div className="progress-bar" style={{ width: `${loadProgress}%` }}></div>
                      <span className="progress-text">{Math.round(loadProgress)}%</span>
                    </div>
                  )}
                  {isProduction && useStreamingLoad && (
                    <p className="streaming-notice">Using optimized streaming...</p>
                  )}
                  {networkStatus === 'offline' && (
                    <p className="offline-notice">Waiting for connection...</p>
                  )}
                </div>
              )}
              
              <video
                ref={videoRef}
                poster={poster}
                title={title}
                autoPlay={autoplay}
                muted={muted}
                controls={controls}
                loop={loop}
                preload="metadata"
                width={width}
                height={height}
                playsInline={true}
                crossOrigin="anonymous"
                className={`lazy-video ${isLoaded ? 'loaded' : ''}`}
                onLoadStart={handleLoadStart}
                onLoadedData={handleLoadedData}
                onCanPlay={handleCanPlay}
                onError={handleError}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                aria-label={title || 'Video player'}
              >
                {sources.map((source, index) => (
                  <source 
                    key={index}
                    src={source.src} 
                    type={source.type}
                  />
                ))}
                <p>
                  Your browser doesn't support HTML5 video. 
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    Download the video file
                  </a>.
                </p>
              </video>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LazyVideo;