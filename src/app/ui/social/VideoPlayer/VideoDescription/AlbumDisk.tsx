'use client'

import { VolumeXIcon } from 'lucide-react'
import styles from './styles.module.css'

type AlbumDiskProps = {
  albumCover: string,
  muted: [boolean, () => void]
}
export default function AlbumDisk ({ albumCover, muted: [muted, handleChangeMute] }: AlbumDiskProps) {

  return (
    muted ? (
      <button className="btn btn-ghost btn-circle" onClick={handleChangeMute} >
        <VolumeXIcon className="size-6" />
      </button>
    ): (
      <div className={styles.album}>
        <img className={styles.albumImage} src={albumCover} />
      </div>
    )
  )
}