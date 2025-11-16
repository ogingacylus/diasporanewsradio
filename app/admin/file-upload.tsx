"use client";

import React, { useRef, useState } from "react";
import { useFileUpload } from "@/app/admin/useFileUpload";

interface FileUploadProps {
  itemId: string;
  type: string;
  userId: string;
  onUploadComplete?: (result: any) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  itemId,
  type,
  userId,
  onUploadComplete,
  acceptedTypes = ["audio/*", "image/*", ".pdf"],
  maxFileSize = 20 * 1024 * 1024, // 20MB
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const { uploadFile, resetUpload, isUploading, uploadProgress, uploadResult } =
    useFileUpload();

  const handleFileSelect = (file: File) => {
    // Validate file size
    if (file.size > maxFileSize) {
      alert(
        `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds ${
          maxFileSize / 1024 / 1024
        }MB limit`
      );
      return;
    }

    setSelectedFile(file);
    resetUpload();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadFile(selectedFile, userId, type, itemId);

    if (result.success && onUploadComplete) {
      onUploadComplete(result);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Upload Picture</h3>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          accept={acceptedTypes.join(",")}
          className="hidden"
        />

        {selectedFile ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">
              Drag and drop image here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-400">
              Max size: {maxFileSize / 1024 / 1024}MB
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Upload Result */}
      {uploadResult && (
        <div
          className={`mt-4 p-3 rounded ${
            uploadResult.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {uploadResult.success ? (
            <div>
              <p className="font-medium">Upload successful!</p>
              <p className="text-sm">File ID: {uploadResult.fileId}</p>
            </div>
          ) : (
            <p>Error: {uploadResult.error}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        {selectedFile && !isUploading && !uploadResult?.success && (
          <button
            onClick={handleUpload}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Upload File
          </button>
        )}

        {(selectedFile || uploadResult) && (
          <button
            onClick={handleReset}
            disabled={isUploading}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
