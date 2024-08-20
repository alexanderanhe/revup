'use client'

import { usePathname, useRouter } from '@/navigation';
import { BookmarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Drawer } from 'vaul'

import { GroupsWorkout, UUID } from '@/lib/definitions';
import { cn } from '@/lib/utils';
type MenuProps = {
  tags?: GroupsWorkout[] | null;
}

export default function Menu({ tags }: MenuProps) {
  const [ liked, setLiked ] = useState<boolean>(false);
  const [ selectedTags, setSelectedTags ] = useState<string[]>();
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

  const handleTagClick = (tagId: UUID) => () => {
    const params = new URLSearchParams(searchParams);
    const tags = params.getAll('tags');
    if (tags.includes(tagId)) {
      params.delete('tags');
    } else {
      params.append('tags', tagId);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setSelectedTags(params.getAll('tags'));
  }, [searchParams]);

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
          <Drawer.Content className="fixed flex flex-col bg-base-100 border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-50">
            <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
            <div className="flex flex-wrap gap-2 max-w-md mx-auto w-full p-4 pt-5 space-y-2 overflow-y-auto pb-10">
              { tags?.map(({ id, name, type }) => (
                <button
                  key={id}
                  type="button"
                  onClick={handleTagClick(id)}
                  className={cn(
                    "btn btn-sm",
                    typesClass[type as keyof typeof typesClass],
                    !selectedTags?.includes(id) && "btn-ghost btn-outline",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

const typesClass = {
  muscle: 'btn-primary',
  equipment: 'btn-secondary',
  difficulty: 'btn-accent',
  place: 'btn-success',
  gender: 'btn-warning',
  other: 'btn-info',
}