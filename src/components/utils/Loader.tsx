import logo from '@/app/logo.webp';
import Image from 'next/image';

export default function Loader() {
  return (
    <div className='fixed inset-0 grid place-content-center bg-base-100 z-[100]'>
      <Image width={512} height={288} className='animate-l10 w-3/4 mx-auto' alt='bray.fit' src={ logo } />
    </div>
  )
}