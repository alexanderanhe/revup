import { CloudUploadIcon } from "lucide-react";

export default function UploadImages() {
  async function uploadImages(formData: FormData) {
    'use server'
    // Mutate data
    const images = formData.getAll('images');
    console.log('uploading images', images[0]);
  }
  return (
    <form action={uploadImages} className="form-control w-full space-y-2">
      <h2>Upload Images</h2>
      <label className="input flex items-center gap-2 border-2 border-base-200 w-full min-h-20">
        Upload Images
        <input
          type="file"
          accept="image/*"
          className="hidden"
          name="images"
          multiple
        />
      </label>
      <button type="submit" className="btn w-full">
        Upload <CloudUploadIcon className="size-4" />
      </button>
    </form>
  )
}