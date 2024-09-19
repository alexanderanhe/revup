'use client'

import { Video } from '@/lib/definitions'
import SongTicker from '../SongTicker/index'
import AlbumDisk from './AlbumDisk'
import styles from './styles.module.css'

type VideoDescriptionProps = Video & {
  muted: [boolean, () => void]
}

export default function VideoDescription ({ albumCover, username, description, songTitle, muted }: VideoDescriptionProps) {
  return (
    <footer className={styles.description}>
      <div className={styles.textWrapper}>
        <section>
          <strong>
            <a className={styles.author} href={`/user/${username}`}>
              @{username}
            </a>
          </strong>
          <p className={styles.text}>
            {description}
          </p>
        </section>
        <SongTicker songTitle={songTitle} />
      </div>

      <div>
        <AlbumDisk albumCover={albumCover} muted={muted} />
      </div>

    </footer>
  )
}