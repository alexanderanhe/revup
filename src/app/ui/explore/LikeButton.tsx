'use client'

import { BookmarkIcon } from "@heroicons/react/24/outline"

export default function LikeButton() {
  return (
    <button type="button" className="btn btn-sm btn-square btn-ghost bg-[#F7F8F8] rounded-lg btn-ghost">
      <BookmarkIcon className="size-3 text-[#1D1617]" />
    </button>
  )
}