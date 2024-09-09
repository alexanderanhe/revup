'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
import VideoPlayerActions from './VideoPlayerActions'
import VideoDescription from './VideoDescription/index'
import useIntersectionVideoPlayer from '@/lib/hooks/useIntersectionVideoPlayer'

type VideoPlayerProps = {
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
}

export default function VideoPlayer (props: VideoPlayerProps) {
  const video = useRef(null)
  const { playing, handlePlay } = useIntersectionVideoPlayer({ video })

  const playerClassName = clsx(styles.player, {
    [styles.hidden]: playing
  })

  const { src } = props

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        controls={false}
        playsInline
        autoPlay
        loop
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