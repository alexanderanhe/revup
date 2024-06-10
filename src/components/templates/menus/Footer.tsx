'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuNavLinks } from "@/lib/definitions"
import { menuNavLinks } from "@/lib/nav"
import { clsx } from "clsx"

export default function Footer() {
  const pathname = usePathname();
  const navLinks = menuNavLinks.filter(({current}: MenuNavLinks) => current.includes('footer'));
  const gridCols = navLinks.length + 1;
  const menuSize = gridCols * 70;

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mx-auto z-50 pt-4 pb-4">
        <div className={clsx(
            'grid place-items-center gap-4 mx-auto font-medium',
            `md:w-[${menuSize}px] min-w-80 ${colStartClasses[gridCols - 1]}`,
            'backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/95 p-4',
            'rounded-2xl',
          )
        }>
          { navLinks.map(({name, href, Icon}: MenuNavLinks) => (
            <Link
              href={href}
              key={`navLinkFooter${href}`}
              className={`btn ${pathname === href ? "w-full grid grid-cols-[auto_1fr] place-items-center col-span-2" : 'btn-ghost btn-square [&>span]:hidden'}`}
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

const colStartClasses = [
  '',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
]