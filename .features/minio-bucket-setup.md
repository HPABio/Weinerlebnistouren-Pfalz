# MinIO Bucket Configuration Guide

This guide explains how to configure your MinIO bucket for tour images.

## Prerequisites

- MinIO instance running and accessible
- MinIO console access (https://console-z80gkok4g44kok4sw804w04o.31.97.39.187.sslip.io)
- MinIO API access (https://minio-z80gkok4g44kok4sw804w04o.31.97.39.187.sslip.io)

## Step 1: Create the Bucket

1. Log into the MinIO Console
2. Navigate to "Buckets" in the left sidebar
3. Click "Create Bucket"
4. Enter bucket name: `tour-images` (or match your `MINIO_BUCKET_NAME` env var)
5. Click "Create Bucket"

## Step 2: Configure Bucket Policy for Public Read Access

1. Select the `tour-images` bucket
2. Go to "Access Policy" tab
3. Set the policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::tour-images/*"]
    }
  ]
}
```

Alternatively, you can use the MinIO console's "Public" access policy option if available.

## Step 3: Configure CORS Policy

1. In the bucket settings, navigate to "CORS Configuration"
2. Add the following CORS configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://www.weinerlebnistouren-pfalz.de",
      "http://localhost:4321",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length"],
    "MaxAgeSeconds": 3000
  }
]
```

**Important:** Replace the origins with your actual production domain and any development domains you use.

## Step 4: Verify Configuration

1. Upload a test image to the bucket
2. Get the public URL (should be: `https://minio-z80gkok4g44kok4sw804w04o.31.97.39.187.sslip.io/tour-images/your-test-image.jpg`)
3. Try accessing the URL in a browser - it should load without authentication
4. Check browser console for CORS errors when loading from your website

## Step 5: Organize Images by Tour

Create the following folder structure in your bucket (or upload images with these prefixes):

```
tour-images/
  ├── mandelbluete/
  │   ├── image1.jpg
  │   ├── image2.jpg
  │   └── ...
  ├── mussbach/
  │   ├── image1.jpg
  │   └── ...
  ├── bacchus/
  │   ├── image1.jpg
  │   └── ...
  └── gluehwein/
      ├── image1.jpg
      └── ...
```

**Note:** The sync script (`bun run sync:images`) will automatically organize images this way when you upload from local folders.

## Troubleshooting

### Images not loading (403 Forbidden)
- Check bucket policy allows public read access
- Verify the bucket name matches your `MINIO_BUCKET_NAME` env var

### CORS errors in browser console
- Verify CORS configuration includes your domain
- Check that `AllowedMethods` includes "GET" and "HEAD"
- Ensure `ExposeHeaders` includes "ETag" if needed

### Images not appearing in gallery
- Verify images are uploaded to the correct tour folder
- Check that image file extensions are supported (.jpg, .jpeg, .png, .webp)
- Verify MinIO endpoint URL is correct in environment variables
- Check browser network tab for failed requests

## Security Notes

- The bucket policy allows public read access to all objects in the bucket
- Only image files should be stored in this bucket
- Consider implementing object lifecycle policies to manage old images
- Regularly review and clean up unused images

