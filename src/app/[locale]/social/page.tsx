import { jersey10 } from '@/app/ui/fonts';
import Videos from '@/app/ui/social/Videos';
import LayoutContent from '@/app/ui/utils/templates/LayoutContent';

const videos = [
  {
    src: 'https://krkpraegwzrqcmgbgzce.supabase.co/storage/v1/object/public/videos/video.mp4',
    username: 'bray.fit',
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
    src: 'https://krkpraegwzrqcmgbgzce.supabase.co/storage/v1/object/public/videos/video2.mp4?t=2024-09-10T17%3A35%3A56.678Z',
    username: 'bray.fit',
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
    src: 'https://krkpraegwzrqcmgbgzce.supabase.co/storage/v1/object/public/videos/video4.mp4',
    username: 'bray.fit',
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
    src: 'https://krkpraegwzrqcmgbgzce.supabase.co/storage/v1/object/public/videos/video3.mp4',
    username: 'bray.fit',
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
  const title = <span className={`text-5xl ${jersey10.className}`}>bray.fit</span>;
  

  return (
    <LayoutContent title={title} titleFixed titleTransparent>
      <Videos videos={videos} />
    </LayoutContent>
  )
}