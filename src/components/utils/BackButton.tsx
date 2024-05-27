'use client'

import { useRouter } from 'next/navigation'

type BackButtonProps = {
  className?: string;
  children: React.ReactNode;
}
function BackButton({children, ...props}: BackButtonProps) {
  const router = useRouter();

  const handleNavigationBack = () => {
    router.back();
  }

  return (
    <button type='button' onClick={handleNavigationBack} {...props}>{ children }</button>
  )
}

export default BackButton