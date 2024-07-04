'use client'

import { BookmarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Drawer } from 'vaul'

export default function Menu() {
  return (
    <div className="flex gap-2">
      <button type="button" className="btn btn-sm btn-square btn-ghost bg-[#F7F8F8] rounded-lg btn-ghost">
        <BookmarkIcon className="size-3 text-[#1D1617]" />
      </button>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Trigger className="btn btn-sm btn-square btn-ghost bg-[#F7F8F8] rounded-lg btn-ghost">
          <FunnelIcon className="size-3 text-[#1D1617]" />
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