'use client'

import Image from 'next/image'
import { LogoIcon } from "@/components/utils/icons";

export default function NavLogo() {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const hash = event.currentTarget.hash;
    const goToElement = document.querySelector(hash);
    goToElement && goToElement.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <a href="#hero" onClick={handleClick} className="flex items-end toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
      <Image
        width={37}
        height={37}
        src='/images/icons/icon-72x72.png'
        alt={ "bray.fit logo" }
        className="w-auto border-2 rounded-xl h-12"></Image>
      <LogoIcon className="w-auto h-12 fill-current inline max-sm:hidden" />
    </a>
  )
}