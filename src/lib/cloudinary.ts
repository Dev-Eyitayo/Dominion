import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

/**
 * Uploads a file (from FormData). Uses Cloudinary if configured;
 * otherwise gracefully saves to /public/uploads/ for local offline testing.
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "dominion/general"
): Promise<CloudinaryUploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Fallback if Cloudinary credentials are not set
  if (!isCloudinaryConfigured) {
    const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);
    
    // In serverless environments like Vercel, filesystem is read-only; use Data URI
    if (isVercel) {
      const mimeType = file.type || "image/jpeg";
      const base64 = buffer.toString("base64");
      return {
        url: `data:${mimeType};base64,${base64}`,
        publicId: `data_${Date.now()}`,
      };
    }

    try {
      const cleanFolder = folder.replace(/^dominion\/?/, "") || "uploads";
      const uploadDir = path.join(process.cwd(), "public", "uploads", cleanFolder);
      await mkdir(uploadDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `${baseName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${cleanFolder}/${filename}`;
      return {
        url: publicUrl,
        publicId: `local_${cleanFolder}_${filename}`,
      };
    } catch {
      // Graceful fallback to Data URI if disk is not writable
      const mimeType = file.type || "image/jpeg";
      const base64 = buffer.toString("base64");
      return {
        url: `data:${mimeType};base64,${base64}`,
        publicId: `data_${Date.now()}`,
      };
    }
  }

  // Production Cloudinary stream upload with automatic size, format & quality compression
  const isVideo = file.type?.startsWith("video/") || file.name?.match(/\.(mp4|webm|mov|mkv)$/i);

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, any> = {
      folder,
      resource_type: isVideo ? "video" : "auto",
      quality: "auto:good",
      fetch_format: "auto",
    };

    if (!isVideo) {
      // Bounding max resolution for images to 1920x1920 limit without upscaling
      uploadOptions.transformation = [
        { width: 1920, height: 1920, crop: "limit" },
        { quality: "auto:good" },
      ];
    } else {
      // Video optimization: compress bitrate, max width 1920
      uploadOptions.transformation = [
        { width: 1920, crop: "limit" },
        { quality: "auto" },
        { video_codec: "auto" },
      ];
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload returned undefined response"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an asset by public ID (handles both Cloudinary and local uploads).
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return;

  if (publicId.startsWith("local_")) {
    try {
      const parts = publicId.replace(/^local_/, "").split("_");
      const filename = parts.pop();
      const folder = parts.join("_");
      if (filename && folder) {
        const filePath = path.join(process.cwd(), "public", "uploads", folder, filename);
        await unlink(filePath).catch(() => {});
      }
    } catch (e) {
      console.error("Failed to delete local fallback asset:", e);
    }
    return;
  }

  if (isCloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Failed to delete Cloudinary asset:", publicId, error);
    }
  }
}
