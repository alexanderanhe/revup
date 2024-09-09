import { jersey10 } from '@/app/ui/fonts';
import VideoPlayer from '@/app/ui/social/VideoPlayer';
import LayoutContent from '@/app/ui/utils/templates/LayoutContent';

const videos = [
  {
    src: '/assets/video.mp4',
    username: 'username',
    avatar: 'https://placehold.co/150',
    likes: 2041,
    comments: 333,
    shares: 520,
    hearted: false,
    albumCover: 'https://placehold.co/150',
    description: 'description',
    songTitle: 'songTitle'
  },
  {
    src: '/assets/video2.mp4',
    username: 'username',
    avatar: 'https://placehold.co/150',
    likes: 2041,
    comments: 333,
    shares: 520,
    hearted: false,
    albumCover: 'https://placehold.co/150',
    description: 'description',
    songTitle: 'songTitle'
  },
]
export default function SocialPage() {
  return (
    <LayoutContent title={<span className={`text-5xl ${jersey10.className}`}>bray.fit</span>} titleFixed titleTransparent>
      <div className="max-w-md w-full h-full mx-auto" style={{ gridColumn: 'full-width', marginBlock: 0}}>
        {videos.map((video, index) => (
          <VideoPlayer key={index} {...video} />
        ))}
      </div>
    </LayoutContent>
  )
}