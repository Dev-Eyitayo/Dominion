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

  // Fallback to local storage if Cloudinary credentials are not set
  if (!isCloudinaryConfigured) {
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
  }

  // Production Cloudinary stream upload
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        quality: "auto",
        fetch_format: "auto",
      },
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
