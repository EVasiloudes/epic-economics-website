import { config } from 'dotenv';
import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function uploadVideos() {
  // Check for BLOB_READ_WRITE_TOKEN
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is not set');
    console.log('\nTo get your token:');
    console.log('1. Go to https://vercel.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to Storage > Create Database > Blob');
    console.log('4. Copy the BLOB_READ_WRITE_TOKEN');
    console.log('5. Run: export BLOB_READ_WRITE_TOKEN=your_token_here');
    console.log('6. Or add it to your .env.local file\n');
    process.exit(1);
  }

  const videos = [
    {
      filename: 'epic-economics-teaser-optimized.mp4',
      path: 'public/videos/epic-economics-teaser-optimized.mp4',
      contentType: 'video/mp4'
    },
    {
      filename: 'ee-slogans-photomix-1-optimized.mp4',
      path: 'public/videos/ee-slogans-photomix-1-optimized.mp4',
      contentType: 'video/mp4'
    },
    {
      filename: 'ee-slogans-photomix-2-optimized.mp4',
      path: 'public/videos/ee-slogans-photomix-2-optimized.mp4',
      contentType: 'video/mp4'
    }
  ];

  const uploadedUrls = {};

  console.log('📤 Starting video upload to Vercel Blob...\n');

  for (const video of videos) {
    try {
      console.log(`⏳ Uploading ${video.filename}...`);

      const filePath = resolve(video.path);
      const fileBuffer = await readFile(filePath);

      const blob = await put(video.filename, fileBuffer, {
        access: 'public',
        contentType: video.contentType,
        addRandomSuffix: false, // Keep the same filename
      });

      uploadedUrls[video.filename] = blob.url;
      console.log(`✅ Uploaded: ${blob.url}\n`);
    } catch (error) {
      console.error(`❌ Error uploading ${video.filename}:`, error.message);
      process.exit(1);
    }
  }

  console.log('🎉 All videos uploaded successfully!\n');
  console.log('📋 URLs to use in your code:');
  console.log(JSON.stringify(uploadedUrls, null, 2));
  console.log('\n💡 Save these URLs - you\'ll need them to update Press.jsx');
}

uploadVideos().catch(console.error);
