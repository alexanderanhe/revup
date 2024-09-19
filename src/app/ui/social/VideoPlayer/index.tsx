'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
import VideoPlayerActions from './VideoPlayerActions'
import VideoDescription from './VideoDescription/index'
import useIntersectionVideoPlayer from '@/lib/hooks/useIntersectionVideoPlayer'
import { Video } from '@/lib/definitions'

type VideoPlayerProps = Video & {
  muted: [boolean, (value: boolean) => void]
}

export default function VideoPlayer (props: VideoPlayerProps) {
  const video = useRef(null)
  const { playing, handlePlay } = useIntersectionVideoPlayer({ video, muted: props.muted })

  const playerClassName = clsx(styles.player, {
    [styles.hidden]: playing
  })

  const { src, muted: [muted] } = props

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        controls={false}
        playsInline
        autoPlay
        loop
        muted={muted}
        onClick={handlePlay}
        ref={video}
        src={src}
      />
      <i className={playerClassName} onClick={handlePlay} />
      <VideoPlayerActions {...props} />
      <VideoDescription {...props} />
    </div>

  )
}