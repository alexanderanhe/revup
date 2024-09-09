import { MusicIcon } from 'lucide-react'
import styles from './styles.module.css'
import Marquee from 'react-fast-marquee'

type SongTickerProps = {
  songTitle: string
}
export default function SongTicker ({ songTitle }: SongTickerProps) {
  return (
    <div className={styles.song}>
      <MusicIcon />
      <Marquee gradient={false} speed={100}>
        {songTitle}
      </Marquee>
    </div>
  )
}