'use client'

import { useCallback } from 'react'
import { VolumeXIcon } from 'lucide-react'
import styles from './styles.module.css'

type AlbumDiskProps = {
  albumCover: string,
  muted: [boolean, (value: boolean) => void]
}
export default function AlbumDisk ({ albumCover, muted: [muted, useMuted] }: AlbumDiskProps) {
  const handleMuted = useCallback(() => {
    useMuted(!muted);
  }, [muted]);

  return (
    muted ? (
      <button className="btn btn-ghost btn-circle" onClick={handleMuted} >
        <VolumeXIcon className="size-6" />
      </button>
    ): (
      <div className={styles.album} onClick={handleMuted}>
        <img className={styles.albumImage} src={albumCover} />
      </div>
    )
  )
}