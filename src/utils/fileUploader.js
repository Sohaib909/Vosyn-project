import { MAX_FILE_SIZE } from "@/constants/FILE_UPLOADS/constants";
import axios from "axios";

/**
 * Upload file based on its type and handle routing or additional processing.
 * Optionally supports a callback for additional side effects (e.g., Redux actions).
 * @param {File} file - The file to upload.
 * @param {string} fileType - The MIME type of the file.
 * @param {Function} onFileSelected - Optional callback for handling selected file (e.g., Redux dispatch).
 * @param {Object} metadata - Additional metadata to include in the payload (e.g., user).
 * @returns {Promise<{ route: string }>} - Returns the next route for the user.
 * @throws {Error} - Throws an error with statusText if available, or a default message.
 */
export const handleFileUpload = async (
  file,
  fileType,
  onFileSelected,
  metadata = {},
) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 5GB limit.");
  }

  const category = getFileCategory(fileType);

  if (onFileSelected) {
    onFileSelected(file.name);
  }

  const basePayload = {
    fileName: file.name,
    dateUploaded: new Date(),
    ...metadata,
  };

  try {
    let response;

    if (category === "video") {
      // Video-specific upload logic
      const formData = new FormData();
      formData.append("video", file);
      formData.append("video_name", file.name);

      response = await axios.post("/api/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle `201` status from video API
      if (response.status === 201) {
        return { route: `/user-upload/video/${response.data.id}` };
      }
    } else {
      // General file upload logic
      response = await axios.post("/api/upload", {
        ...basePayload,
        fileType,
      });

      // Handle `200` status from general upload API
      if (response.status === 200) {
        return { route: `/user-upload/${category}/${file.name}` };
      }
    }

    throw new Error("Unexpected response status");
  } catch (error) {
    if (error.response && error.response.statusText) {
      throw new Error(error.response.statusText);
    }
    throw new Error(error.message || "Upload failed");
  }
};

/**
 * Determine the category of the file based on MIME type.
 * @param {string} type - MIME type of the file.
 * @returns {string} - Category of the file.
 */
const getFileCategory = (type) => {
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type.startsWith("text/") || type.startsWith("application/"))
    return "text";
  if (type.startsWith("image/")) return "image";
  return "unknown";
};
