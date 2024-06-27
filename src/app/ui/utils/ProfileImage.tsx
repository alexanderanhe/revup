import Image from 'next/image';

import { User } from '@/lib/definitions'

type ImageProps = {
  user?: User;
}

export default function ProfileImage({ user }: ImageProps) {
  const gender = user?.info?.gender ?? 'male';
  return (
    <Image
      width={40}
      height={40}
      src={user
        ? `${user?.image ?? `https://ui-avatars.com/api/?name=${user?.name}&background=51FF6D&color=ffa80f&rounded=true`}`
        : `https://avatar.iran.liara.run/public${gender === 'female' ? '/girl' : '/boy'}`
      }
      alt={`${user?.name ?? ''}`}
    />
  )
}