'use client'

import { usePathname, useRouter } from '@/navigation';
import { BookmarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Drawer } from 'vaul'

export default function Menu() {
  const [ liked, setLiked ] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLikedClick = () => {
    const params = new URLSearchParams(searchParams);
    if (!liked) {
      params.set('liked', '1');
    } else {
      params.delete('liked');
    }

    setLiked(!liked);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <button type="button" onClick={handleLikedClick} className="btn btn-square rounded-lg">
        <BookmarkIcon className={clsx("size-4", liked && "text-primary")} />
      </button>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Trigger className="btn btn-square rounded-lg">
          <FunnelIcon className="size-4" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-30">
            <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
            <div className="flex flex-col max-w-md mx-auto w-full p-4 pt-5 space-y-2">
              Hola Mundo
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}