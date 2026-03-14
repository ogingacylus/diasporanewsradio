import { useState } from "react";
import { FileUpload } from "./file-upload";
import { isPagesAPIRouteMatch } from "next/dist/server/route-matches/pages-api-route-match";

interface UploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  gcsUri?: string;
  message?: string;
  error?: string;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  const uploadFile = async (
    file: File,
    userId: string,
    type: string,
    itemId: string,
    isPara: string,
    paraIndex: string,
    paragraphItems: any,
    fileName?: string,
  ): Promise<UploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const paraItems = JSON.stringify(paragraphItems);
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("type", type);
      formData.append("itemId", itemId);
      formData.append("isPara", isPara);
      formData.append("paraIndex", paraIndex);
      formData.append("paragraphItems", paraItems);

      if (fileName) {
        formData.append("fileName", fileName);
      }

      // Upload with progress tracking
      const result = await uploadWithProgress(formData);
      setUploadResult(result);
      return result;
    } catch (error: any) {
      const errorResult: UploadResult = {
        success: false,
        error: error.message,
      };
      setUploadResult(errorResult);
      return errorResult;
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const uploadWithProgress = (formData: FormData): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(progress));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(
              new Error(
                errorResponse.error ||
                  `Upload failed with status ${xhr.status}`,
              ),
            );
          } catch (parseError) {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.ontimeout = () => reject(new Error("Upload timeout"));

      xhr.open("POST", "/api/upload");
      xhr.timeout = 120000; // 2 minute timeout
      xhr.send(formData);
    });
  };

  const resetUpload = () => {
    setUploadResult(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return {
    uploadFile,
    resetUpload,
    isUploading,
    uploadProgress,
    uploadResult,
  };
};
