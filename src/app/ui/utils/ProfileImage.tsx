import { User } from '@clerk/nextjs/server';
import Image from 'next/image';

type ImageProps = {
  user?: User;
}

export default function ProfileImage({ user }: ImageProps) {
  const gender = 'female'; // user?.info?.gender ?? 'male';
  return (
    <Image
      width={40}
      height={40}
      src={user?.hasImage
        ? `${user.imageUrl ?? `https://ui-avatars.com/api/?name=${user?.firstName}&background=51FF6D&color=ffa80f&rounded=true`}`
        : `https://avatar.iran.liara.run/public${gender === 'female' ? '/girl' : '/boy'}`
      }
      alt={`${user?.firstName ?? ''}`}
    />
  )
}