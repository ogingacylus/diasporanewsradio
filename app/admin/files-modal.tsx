"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PictureDialog } from "./picture-dialog";
import { ImageIcon } from "lucide-react";
import { FileUpload } from "./file-upload";

export function FilesModal({
  isFilesDialogOpen,
  setIsFilesDialogOpen,
  item,
  type,
  userId,
  onUploadComplete,
  isDialogOpen,
  setIsDialogOpen,
  imageUrl,
  setImageUrl,
  handleDeleteImage,
  handleUploadComplete,
}: {
  isFilesDialogOpen: any;
  setIsFilesDialogOpen: any;
  item: any;
  type: any;
  userId: any;
  onUploadComplete: any;
  isDialogOpen: any;
  setIsDialogOpen: any;
  imageUrl: any;
  setImageUrl: any;
  handleDeleteImage: any;
  handleUploadComplete: any;
}) {
  const handleModalClose = (modlaState: any) => {
    setIsFilesDialogOpen(modlaState);
  };

  const paraPicsCount = item?.paragraphs?.filter(
    (item: any) => item?.url?.length > 2,
  )?.length;

  return (
    <Dialog open={isFilesDialogOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold">
            {" "}
            Upload Files
          </DialogTitle>
        </DialogHeader>
        <div className="inset-shadow-sm inset-shadow-green-500 rounded-md">
          <h1 className="text-lg font-bold pl-4 pt-4">
            {item.image_url ? "Main Image" : "Upload main image"}
          </h1>
          <PictureDialog
            url={imageUrl}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          {item?.image_url ? (
            <div className="space-y-2 w-full p-4 ">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <ImageIcon className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    Picture uploaded
                  </p>
                  <button
                    onClick={() => {
                      setImageUrl(item?.image_url);
                      setIsDialogOpen(true);
                    }}
                    className="text-xs text-green-600 hover:underline cursor-pointer">
                    View picture
                  </button>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="text-red-600 hover:text-red-700 bg-red-200"
                  onClick={() => {
                    handleDeleteImage(
                      item?.image_url,
                      item?.id,
                      "false",
                      0,
                      [],
                    );
                  }}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <FileUpload
              itemId={String(item?.id)}
              type={type}
              userId="IMG"
              onUploadComplete={handleUploadComplete}
              isPara="false"
              paraIndex=""
              paragraphItems={[]}
              paraPicsCount={paraPicsCount}
            />
          )}
        </div>
        <div className="flex justify-between">
          <h2 className="text-md text-indigo-500 font-bold">Paragraphs</h2>
        </div>
        {item?.paragraphs?.map((para: any, index: number) => (
          <div key={index}>
            {index !== 0 && (
              <div
                className="inset-shadow-sm inset-shadow-green-500 rounded-md"
                key={index}>
                <h1 className="text-lg font-bold pl-4 pt-4">
                  {item?.image_url
                    ? `Paragraph ${index + 1} Image`
                    : `Upload paragraph ${index + 1} image`}
                </h1>
                <PictureDialog
                  url={imageUrl}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
                {para?.url ? (
                  <div className="space-y-2 w-full p-4 ">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">
                          Picture uploaded
                        </p>
                        <button
                          onClick={() => {
                            setImageUrl(para?.url);
                            setIsDialogOpen(true);
                          }}
                          className="text-xs text-green-600 hover:underline cursor-pointer">
                          View picture
                        </button>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-red-200"
                        onClick={() => {
                          handleDeleteImage(
                            para?.url,
                            item?.id,
                            "true",
                            index,
                            item.paragraphs,
                          );
                        }}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <FileUpload
                    itemId={String(item?.id)}
                    type={type}
                    userId="IMG"
                    onUploadComplete={handleUploadComplete}
                    isPara="true"
                    paraIndex={String(index)}
                    paragraphItems={item.paragraphs}
                    paraPicsCount={paraPicsCount}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <Button
          className="cursor-pointer"
          type="button"
          onClick={() => setIsFilesDialogOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
