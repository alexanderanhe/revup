import styles from './styles.module.css'

type AlbumDiskProps = {
  albumCover: string
}
export default function AlbumDisk ({ albumCover }: AlbumDiskProps) {
  return (
    <div className={styles.album}>
      <img className={styles.albumImage} src={albumCover} />
    </div>
  )
}