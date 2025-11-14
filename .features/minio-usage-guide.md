# MinIO Image Storage - Usage Guide

## Quick Start

### 1. Configure Environment Variables

Copy the MinIO configuration from `env-template.txt` to your `.env` file and fill in your credentials:

```bash
MINIO_ENDPOINT=https://minio-z80gkok4g44kok4sw804w04o.31.97.39.187.sslip.io
MINIO_ROOT_USER=your-root-user
MINIO_ROOT_PASSWORD=your-root-password
MINIO_BUCKET_NAME=tour-images
MINIO_USE_SSL=true
MINIO_REGION=us-east-1
```

### 2. Set Up MinIO Bucket

Follow the instructions in `.features/minio-bucket-setup.md` to:
- Create the bucket
- Configure public read access
- Set up CORS policy

### 3. Add Images to Local Folders

Place your tour images in the appropriate folders:

```
images/tours/
  ├── mandelbluete/
  │   └── (add .jpg, .jpeg, .png, or .webp files here)
  ├── mussbach/
  │   └── (add images here)
  ├── bacchus/
  │   └── (add images here)
  └── gluehwein/
      └── (add images here)
```

### 4. Sync Images to MinIO

Run the sync script to upload images:

```bash
# Dry run (preview what will be uploaded)
bun run sync:images:dry

# Actually upload images
bun run sync:images
```

The script will:
- Only upload changed/new files (based on MD5 hash)
- Skip files that haven't changed
- Maintain sync state in `.features/sync-state.json`

### 5. Build and Deploy

Build your site as usual:

```bash
bun run build
```

The build process will:
- Fetch image URLs from MinIO at build time (for Astro components)
- Create API endpoints for runtime image fetching (for React components)

## How It Works

### Image Storage Flow

1. **Local Storage**: Images are stored in `images/tours/{tour-id}/` (gitignored)
2. **Sync to MinIO**: Run `bun run sync:images` to upload to MinIO
3. **Build Time**: Astro components fetch image URLs from MinIO during build
4. **Runtime**: React components fetch image URLs via API endpoint

### Components

- **ImageGalleryToursAstro.astro**: Astro component that fetches images at build time
  - Used in: `src/pages/tours.astro`
  - Requires: `tourId` prop

- **TourImageGallery.tsx**: React component that fetches images at runtime
  - Used in: `InteractiveToursIV.tsx`
  - Fetches images via `/api/tour-images` endpoint

### API Endpoint

- **GET /api/tour-images?tourId={tourId}**: Returns list of image URLs for a tour
  - Cached for 1 hour
  - Returns JSON: `{ images: string[] }`

## Troubleshooting

### Sync Script Issues

**Error: Missing environment variables**
- Ensure `.env` file exists with all MinIO variables
- Check that variables are loaded correctly

**Error: Connection refused**
- Verify `MINIO_ENDPOINT` is correct
- Check MinIO server is running and accessible
- Verify SSL settings match your MinIO configuration

**Images not uploading**
- Check file permissions
- Verify bucket exists and is accessible
- Check MinIO credentials are correct

### Build Issues

**Error: Failed to fetch images from MinIO**
- Verify MinIO credentials in `.env`
- Check bucket exists and has images
- Ensure bucket policy allows read access
- Check network connectivity to MinIO server

**No images showing in gallery**
- Verify images were uploaded to MinIO
- Check tour ID matches folder name in MinIO
- Verify image file extensions are supported (.jpg, .jpeg, .png, .webp)
- Check browser console for errors

### Runtime Issues

**CORS errors in browser**
- Verify CORS policy in MinIO bucket includes your domain
- Check that `AllowedMethods` includes "GET" and "HEAD"

**API endpoint returns 500**
- Check server logs for MinIO connection errors
- Verify environment variables are available at runtime
- Ensure MinIO credentials are correct

## Best Practices

1. **Image Organization**: Keep images organized by tour in local folders
2. **Sync Before Build**: Always run `bun run sync:images` before building
3. **Version Control**: Don't commit images to Git (they're gitignored)
4. **Backup**: Keep local images as backup even after MinIO migration
5. **Optimization**: Pre-optimize images before uploading (compression, sizing)
6. **Naming**: Use descriptive filenames for easier management

## File Structure

```
HeylWebsite/
├── .features/
│   ├── minIO_implementation_plan.md
│   ├── minio-bucket-setup.md
│   ├── minio-usage-guide.md (this file)
│   └── sync-state.json (gitignored, auto-generated)
├── images/
│   └── tours/ (gitignored)
│       ├── mandelbluete/
│       ├── mussbach/
│       ├── bacchus/
│       └── gluehwein/
├── scripts/
│   └── sync-images-to-minio.ts
└── src/
    ├── components/
    │   ├── ImageGalleryToursAstro.astro
    │   └── ToursPageComponents/
    │       └── TourImageGallery.tsx
    ├── pages/
    │   └── api/
    │       └── tour-images.ts
    └── utils/
        └── minio-images.ts
```

## Next Steps

1. Configure your MinIO bucket (see `minio-bucket-setup.md`)
2. Add your MinIO credentials to `.env`
3. Add some test images to `images/tours/{tour-id}/`
4. Run `bun run sync:images:dry` to test
5. Run `bun run sync:images` to upload
6. Build and test your site

