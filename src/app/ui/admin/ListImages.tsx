'use client'

import CopyText from '@/app/ui/utils/CopyText';
import DeleteImage from './DeleteImage';

export default function ListImages({ images }: { images: any }) {
  return (
    <div className='w-full space-y-2'>
      <h2>List Images</h2>
      <label className='flex items-center justify-end gap-2'>
        <span className='font-semibold text-xs text-base-content-secondary grow'>Total: {images?.length}</span>
        Buscar:
        <input type="text" className="input input-bordered" placeholder="Search images" />
      </label>
      <div className="grid gap-4">
        {images?.map((image: any) => (
          <div key={image.id} className="overflow-hidden relative shadow-md shadow-base-200 ring-1 ring-black/5 rounded-xl grid sm:grid-cols-[1fr_auto] items-center gap-6 w-full py-5">
            <img className="absolute -left-6 w-24 h-24 object-cover rounded-full shadow-lg shadow-base-200" src={image.variants.at(0)} />
            <div className="flex flex-col pl-24">
              <strong className="text-sm font-medium">{image.filename}</strong>
              <span className="text-neutral text-sm font-medium">{image.id}</span>
            </div>
            <div className="flex gap-2 sm:justify-end pl-24 sm:pl-0 pr-4">
              <CopyText className='btn btn-sm' text={image.variants.at(0)} />
              <DeleteImage className='btn btn-sm' imageId={image.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 
  <div key={image.id} className="relative bg-base-200 p-4 rounded-md">
    <img src={image.variants.at(0)} alt={image.filename} className="w-32 h-32 object-cover rounded-md" />
    <p className='text-xs font-medium bg-base-300/60 rounded absolute bottom-3 left-3 right-3 p-2'>{image.filename}</p>
    <CopyText className='btn btn-sm absolute top-3 right-3' text={image.variants.at(0)} />
    <DeleteImage className='btn btn-sm absolute top-3 left-3' imageId={image.id} />
  </div>
 */