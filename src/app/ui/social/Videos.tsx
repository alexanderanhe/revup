'use client'

import VideoPlayer from '@/app/ui/social/VideoPlayer';
import { useState } from 'react';

type VideosProps = {
  videos: {
    src: string
    username: string
    avatar: string
    likes?: number
    comments?: number
    shares?: number
    hearted?: boolean
    albumCover: string
    description: string
    songTitle: string
  }[]
}
export default function Videos({ videos }: VideosProps) {
  const [muted, setMuted] = useState<boolean>(true);
  const mainStyle = {
    gridColumn: 'full-width',
    marginBlock: 0,
    scrollSnapPointsY: 'repeat(100vh)',
    scrollSnapType: 'y mandatory'
  } as React.CSSProperties;

  return (
    <div
      className="max-w-md w-full mx-auto h-svh overflow-auto no-scrollbar"
      style={mainStyle}
    >
      {videos.map((video, index) => (
        <VideoPlayer key={index} muted={[muted, setMuted]} {...video} />
      ))}
    </div>
  )
}