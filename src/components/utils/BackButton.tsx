'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation'

type BackButtonProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
}
function BackButton({href, children, ...props}: BackButtonProps) {
  if (href) {
    return <Link href={href} {...props}>{ children }</Link>
  }
  const router = useRouter();

  const handleNavigationBack = () => {
    router.back();
  }

  return (
    <button type='button' onClick={handleNavigationBack} {...props}>{ children }</button>
  )
}

export default BackButton