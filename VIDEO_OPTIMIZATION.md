# Video Optimization Guide for Production

## Current Issue

Videos work in development but fail to load in production due to file size constraints and CDN limitations.

## File Analysis

Current video files:
- `ee-slogans-photomix-1.mp4`: 23MB
- `ee-slogans-photomix-2.mp4`: 23MB  
- `epic-economics-teaser.mp4`: 3.2MB

## Problem Identification

1. **Vercel File Size Limits**: Files over 25MB can cause deployment issues
2. **CDN Performance**: Large files cause slow loading and timeouts
3. **Mobile Network Issues**: 23MB files are too large for mobile users
4. **Browser Memory**: Large video files can cause memory issues

## Immediate Solutions

### Option 1: Compress Existing Videos (Recommended)

Use FFmpeg to compress videos while maintaining quality:

```bash
# For the large 23MB files - reduce to ~5-8MB
ffmpeg -i ee-slogans-photomix-1.mp4 -vcodec h264 -acodec aac -crf 28 -preset slow -movflags +faststart ee-slogans-photomix-1-compressed.mp4

ffmpeg -i ee-slogans-photomix-2.mp4 -vcodec h264 -acodec aac -crf 28 -preset slow -movflags +faststart ee-slogans-photomix-2-compressed.mp4

# For web optimization with multiple formats
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -crf 26 -preset slow -movflags +faststart output.mp4
ffmpeg -i input.mp4 -c:v libvpx-vp9 -c:a libopus -crf 30 -b:v 0 output.webm
```

**Compression Settings Explained:**
- `crf 28`: Constant Rate Factor (18-32, lower = better quality, larger file)
- `preset slow`: Better compression at cost of encoding time
- `movflags +faststart`: Optimizes for web streaming

### Option 2: Host Videos Externally

Upload videos to:
- **YouTube** (free, reliable, global CDN)
- **Vimeo** (better customization, pro features)
- **AWS S3 + CloudFront** (full control)
- **Cloudinary** (automatic optimization)

### Option 3: Progressive Loading

Split large videos into smaller chunks:

```bash
# Split video into 30-second segments
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 30 -f segment output%03d.mp4
```

## Implementation Guide

### Step 1: Compress Videos

```bash
# Create compressed versions
mkdir public/videos/compressed

# Compress large files
ffmpeg -i public/videos/ee-slogans-photomix-1.mp4 \
  -vcodec h264 -acodec aac -crf 26 -preset slow \
  -vf "scale=1280:720" -movflags +faststart \
  public/videos/compressed/ee-slogans-photomix-1.mp4

ffmpeg -i public/videos/ee-slogans-photomix-2.mp4 \
  -vcodec h264 -acodec aac -crf 26 -preset slow \
  -vf "scale=1280:720" -movflags +faststart \
  public/videos/compressed/ee-slogans-photomix-2.mp4
```

### Step 2: Update Video Sources

In `Press.jsx`, update video sources:

```jsx
// Before
<LazyVideo
  src="/videos/ee-slogans-photomix-1.mp4"
  poster="/videos/ee-slogans-photomix-1-poster.jpg"
  title="EE Slogans Photomix 1"
/>

// After
<LazyVideo
  src="/videos/compressed/ee-slogans-photomix-1.mp4"
  poster="/videos/ee-slogans-photomix-1-poster.jpg"
  title="EE Slogans Photomix 1"
/>
```

### Step 3: Add Multiple Video Formats

Create WebM versions for better compression:

```bash
ffmpeg -i public/videos/compressed/ee-slogans-photomix-1.mp4 \
  -c:v libvpx-vp9 -c:a libopus -crf 30 -b:v 0 \
  public/videos/compressed/ee-slogans-photomix-1.webm
```

Update LazyVideo component to support multiple sources:

```jsx
<LazyVideo
  sources={[
    { src: "/videos/compressed/ee-slogans-photomix-1.webm", type: "video/webm" },
    { src: "/videos/compressed/ee-slogans-photomix-1.mp4", type: "video/mp4" }
  ]}
  poster="/videos/ee-slogans-photomix-1-poster.jpg"
  title="EE Slogans Photomix 1"
/>
```

## Target File Sizes

| Video Type | Original | Target | Compression Ratio |
|------------|----------|---------|-------------------|
| Portrait Mobile (9:16) | 23MB | 5-8MB | 70-80% reduction |
| Landscape Teaser (16:9) | 3.2MB | 2-3MB | 20-30% reduction |

## Quality Guidelines

- **CRF 18-23**: Near lossless (large files)
- **CRF 24-28**: High quality (recommended)
- **CRF 29-32**: Good quality (smaller files)
- **CRF 33+**: Lower quality (very small files)

## CDN Optimization

Update `vercel.json` for better video delivery:

```json
{
  "headers": [
    {
      "source": "/videos/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "Accept-Ranges",
          "value": "bytes"
        }
      ]
    }
  ]
}
```

## Testing Checklist

### Before Deployment
- [ ] Video files under 10MB each
- [ ] Total video folder under 50MB
- [ ] Videos load in under 5 seconds on 3G
- [ ] Progressive loading works
- [ ] Poster images display immediately

### After Deployment
- [ ] Videos load on production
- [ ] No 404 errors in browser console
- [ ] Acceptable loading times
- [ ] Works on mobile networks
- [ ] Cross-browser compatibility

## Alternative: YouTube Integration

If file size remains an issue, embed YouTube videos:

```jsx
const YouTubeEmbed = ({ videoId, title }) => (
  <div className="youtube-embed">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allowFullScreen
    />
  </div>
);

// Usage
<YouTubeEmbed 
  videoId="your-video-id" 
  title="Epic Economics Teaser" 
/>
```

## Performance Monitoring

Add video performance tracking:

```jsx
const trackVideoPerformance = (videoElement) => {
  const startTime = performance.now();
  
  videoElement.addEventListener('loadeddata', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Video loaded in ${loadTime}ms`);
  });
};
```

## Quick Fix Command

Run this to quickly compress all large videos:

```bash
# Compress all videos over 10MB
find public/videos -name "*.mp4" -size +10M -exec ffmpeg -i {} -vcodec h264 -acodec aac -crf 28 -preset slow -movflags +faststart {}_compressed.mp4 \;
```

## Next Steps

1. **Immediate**: Compress the 23MB files to under 8MB
2. **Short-term**: Implement progressive loading
3. **Long-term**: Consider external hosting for large media files

The compressed videos should resolve the production loading issues while maintaining acceptable quality for web playback.