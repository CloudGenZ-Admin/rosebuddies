import { promises as fs } from 'fs';
import path from 'path';


export async function saveUploadedFile(file, folderName, maxSizeMB = 5) {
  if (!file || typeof file !== 'object' || !file.name) {
    return { error: "Invalid file provided." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Size limit check
    const MAX_FILE_SIZE = maxSizeMB * 1024 * 1024;
    if (buffer.length > MAX_FILE_SIZE) {
      return { error: `File size exceeds the ${maxSizeMB}MB limit.` };
    }

    // Create target directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", String(folderName));
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the file
    await fs.writeFile(filePath, buffer);

    return { fileName };
  } catch (err) {
    console.error("File upload error:", err);
    return { error: "Failed to save file to disk." };
  }
}
