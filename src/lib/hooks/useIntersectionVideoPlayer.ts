'use client'

import { useEffect, useState } from 'react'

let observer: IntersectionObserver | null = null
const isClient = typeof window !== "undefined";

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9
}
if (isClient) {
  observer = new window.IntersectionObserver((entries) => {
    entries
      ?.forEach(entry => {
        const { target, isIntersecting } = entry as { target: any, isIntersecting: boolean }
        target._handleIntersect(isIntersecting)
      })
  }, options);
}

type UseIntersectionVideoPlayerProps = {
  video: any;
  muted: [boolean, () => void];
}

export default function useIntersectionVideoPlayer ({ video, muted: [, handleChangeMute] }: UseIntersectionVideoPlayerProps) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!video.current) return
    const videoRef = video.current;

    observer?.observe(videoRef)
    videoRef._handleIntersect = (isIntersecting: boolean) => {
      const { current: videoEl } = video

      isIntersecting
        ? videoEl?.play()
        : videoEl?.pause()

      setPlaying(!videoEl?.paused)
    }

    const handleVolumeChanged = () => {
      handleChangeMute();
    }

    videoRef.addEventListener("volumechange", handleVolumeChanged);

    return () => {
      observer?.unobserve(videoRef)
      videoRef.removeEventListener("volumechange", handleVolumeChanged);
    }
  }, [video.current])

  const handlePlay = () => {
    const { current: videoEl } = video
    playing
      ? videoEl.pause()
      : videoEl.play()

    setPlaying(!playing)
  }

  return {
    handlePlay,
    playing
  }
}