import logo from '@/app/logo.svg';
import Image from 'next/image';

export default function Loader() {
  return (
    <div className='fixed inset-0 grid place-content-center bg-black z-[100]'>
      <Image width={512} height={288} className='animate-l10 w-1/2 text-white stroke-white mx-auto' alt='bray.fit' src={ logo } />
    </div>
  )
}