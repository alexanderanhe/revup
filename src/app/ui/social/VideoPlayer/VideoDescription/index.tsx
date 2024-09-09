'use client'

import SongTicker from '../SongTicker/index'
import AlbumDisk from './AlbumDisk'
import styles from './styles.module.css'

type VideoDescriptionProps = {
  albumCover: string
  username: string
  description: string
  songTitle: string
}

export default function VideoDescription ({ albumCover, username, description, songTitle }: VideoDescriptionProps) {
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
        <AlbumDisk albumCover={albumCover} />
      </div>

    </footer>
  )
}