import { listImages } from '@/lib/services/cloudflare';
import CopyText from '@/app/ui/utils/CopyText';
import DeleteImage from './DeleteImage';

export default async function ListImages() {
  const images = await listImages();
  return (
    <div className='w-full space-y-2'>
      <h2>List Images</h2>
      <label className='flex items-center justify-end gap-2'>
        <span className='font-semibold text-xs text-base-content-secondary grow'>Total: {images?.length}</span>
        Buscar:
        <input type="text" className="input input-bordered" placeholder="Search images" />
      </label>
      <div className="grid grid-cols-3 gap-4">
      {images?.map((image: any) => (
        <div key={image.id} className="relative bg-base-200 p-4 rounded-md">
          <img src={image.variants.at(0)} alt={image.filename} className="w-32 h-32 object-cover rounded-md" />
          <p className='text-xs font-medium bg-base-300/60 rounded absolute bottom-3 left-3 right-3 p-2'>{image.filename}</p>
          <CopyText className='btn btn-sm absolute top-3 right-3' text={image.variants.at(0)} />
          <DeleteImage className='btn btn-sm absolute top-3 left-3' imageId={image.id} />
        </div>
      ))}
      </div>
    </div>
  )
}