'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuNavLinks } from "@/lib/definitions"
import { menuNavLinks } from "@/lib/nav"
import { clsx } from "clsx"

const Footer = () => {
  const pathname = usePathname();
  const gridCols = menuNavLinks.length + 1;

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full pt-4 pb-4">
        <div className={clsx(
            'grid place-items-center w-full h-full max-w-lg mx-auto font-medium',
            'backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/95 p-4',
            'rounded-2xl',
            'grid-cols-5',
            gridCols && colStartClasses[gridCols + 1],
          )
        }>
          { menuNavLinks.filter(({current}: MenuNavLinks) => current.includes('footer')).map(({name, href, Icon}: MenuNavLinks) => (
            <Link
              href={href}
              key={`navLinkFooter${href}`}
              className={`btn ${pathname === href ? "grid grid-cols-[auto_1fr] place-items-center col-span-2" : 'btn-ghost btn-square [&>span]:hidden'}`}
            >
              <Icon className="size-5" />
              <span className="text-xs whitespace-nowrap">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Footer

let colStartClasses = [
  '',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
]