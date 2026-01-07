import React from 'react';
import './SimpleVideo.css';

/**
 * SimpleVideo - A straightforward video component optimized for Vercel Blob
 * No lazy loading, no complex state management - just works
 */
const SimpleVideo = ({
  src,
  poster,
  title,
  controls = true,
  muted = false,
  className = ''
}) => {
  return (
    <div className={`simple-video-container ${className}`}>
      <video
        className="simple-video"
        src={src}
        poster={poster}
        title={title}
        controls={controls}
        muted={muted}
        preload="metadata"
        playsInline
        aria-label={title || 'Video player'}
      >
        <p>
          Your browser doesn't support HTML5 video.{' '}
          <a href={src} target="_blank" rel="noopener noreferrer">
            Download the video
          </a>
        </p>
      </video>
    </div>
  );
};

export default SimpleVideo;
