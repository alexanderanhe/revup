import logo from '@/app/logo.svg';
import Image from 'next/image';

export default function Loader() {
  return (
    <div className='fixed inset-0 grid place-content-center bg-black z-[100]'><Image width={512} height={288} alt='bray.fit' src={ logo } /></div>
  )
}