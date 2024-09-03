'use client';

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleUploadImages } from "@/lib/actions";

import SubmitButton from "@/app/ui/utils/SubmitButton";
import { toast } from "sonner";

export default function UploadImages() {
  const dropAreaRef = useRef<HTMLLabelElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ name: string; type: string; size: number; lastModified: number; url: string; }[]>([]);
  const [ formState, formAction ] = useFormState(handleUploadImages, {status: 'idle'});

  const handleFiles = (files: FileList | null) => {
    const filesArray = files ? Array.from(files): [];
    setFiles(filesArray.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file)
    })));
  }

  const handleChange = (e: any) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      handleFiles(files);
    }
  };

  useEffect(() => {
    if (dropAreaRef.current) {
      const dropArea = dropAreaRef.current;
      const preventDefaults = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
      }
      const handleDragOver = (e: any) => {
        preventDefaults(e);
        dropArea.classList.add('bg-base-200', 'min-h-40');
      }
      const handleDragLeave = (e: any) => {
        preventDefaults(e);
        dropArea.classList.remove('bg-base-200', 'min-h-40');
      }
      const handleDrop = (e: any) => {
        e.preventDefault();

        // Getting the list of dragged files
        const files = e.dataTransfer.files;

        // Checking if there are any files
        if (files.length && fileInputRef.current) {
          // Assigning the files to the hidden input from the first step
          fileInputRef.current.files = files;

          // Processing the files for previews (next step)
          handleFiles(files);
        }
      }
      
      // Preventing default browser behavior when dragging a file over the container
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('dragenter', preventDefaults);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('drop', handleDrop);

      return () => {
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('dragenter', preventDefaults);
        dropArea.removeEventListener('dragleave', handleDragLeave);
        dropArea.removeEventListener('drop', handleDrop);
      }
    }
  }, []);

  useEffect(() => {
    if (formState.status === 'success') {
      // Reset the form
      setFiles([]);
      toast.success('Images uploaded');
    } else if (formState.status === 'error') {
      toast.error(formState.message);
    }
  }, [formState.status]);

  return (
    <form action={formAction} className="form-control w-full space-y-2">
      <h2>Upload Images</h2>
      <label ref={dropAreaRef} className={cn(
        "input flex flex-wrap items-center gap-2 border-2 border-dashed border-base-200 w-full h-auto p-4",
        files.length > 0 && 'bg-base-200 min-h-40'
      )}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          name="images"
          onChange={handleChange}
          multiple
          ref={fileInputRef}
        />
        {!files.length ? (
          <div className="flex gap-2 items-center min-h-20">
            <ImageIcon className="size-8" />
            Drag images here or click to upload
          </div>
        ) : files.map((file, index) => (
          <img
            key={index}
            src={file.url}
            alt={file.name}
            className="w-20 h-20 object-cover"
          />
        ))}
      </label>
      { formState.status === 'error' && (
        <div className="alert alert-error">
          {formState.message}
        </div>
      )}
      <SubmitButton className="btn w-full">
        Upload <CloudUploadIcon className="size-4" />
      </SubmitButton>
    </form>
  )
}