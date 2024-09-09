'use client'

import { useEffect, useRef, useState } from 'react'

type UseIntersectionVideoPlayerProps = {
  video: any;
  options?: {
    root: HTMLElement | null;
    rootMargin: string;
    threshold: number;
  };
}

export default function useIntersectionVideoPlayer ({ video }: UseIntersectionVideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null);


  const callbackFunction: IntersectionObserverCallback = (entries) => {
    entries
      ?.forEach(entry => {
        const { target, isIntersecting } = entry as { target: any, isIntersecting: boolean }
        target._handleIntersect(isIntersecting)
      })
  }

  const handlePlay = () => {
    const { current: videoEl } = video
    playing
      ? videoEl.pause()
      : videoEl.play()

    setPlaying(!playing)
  }

  useEffect(() => {
    const options = {
      root: typeof document !== "undefined" ? document?.querySelector('main')! : null,
      rootMargin: '0px',
      threshold: 0.9
    }
    const observer = new window.IntersectionObserver(callbackFunction, options)
    
    if (video.current) {
      const { current: videoEl } = video
      observer.observe(videoEl);
      videoEl._handleIntersect = (isIntersecting: boolean) => {
        console.log('isIntersecting', isIntersecting)
        isIntersecting
          ? videoEl?.play()
          : videoEl?.pause()
  
        setPlaying(!videoEl.paused)
      }
    }
    return () => {
      if (video.current) observer.unobserve(video.current);
    }
  }, [video.current])

  return {
    handlePlay,
    playing
  }
}