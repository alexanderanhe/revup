'use client'

import { Link, usePathname } from "@/navigation";
import { MenuNavLinks } from "@/lib/definitions"
import { menuNavLinks } from "@/lib/nav"
import { clsx } from "clsx"

export default function Footer() {
  const pathname = usePathname();
  const navLinks = menuNavLinks.filter(({current}: MenuNavLinks) => current.includes('footer'));
  const gridCols = navLinks.length + 1;

  return (
    <>
      <div className="fixed bottom-0 content-grid backdrop-blur transition-colors duration-500 border-t border-slate-900/10 bg-base-100 w-full pb-4 z-50">
        <div className={clsx(
            "grid place-items-center gap-4 mx-auto font-medium flex-none p-3",
            gridCols > 1 && colStartClasses[gridCols - 1],
          )
        }>
          { navLinks.map(({name, href, Icon}: MenuNavLinks) => (
            <Link
              href={href}
              key={`navLinkFooter${href}`}
              className={clsx(
                "btn p-3",
                pathname.startsWith(href) && "btn-netral shadow-inner w-full grid grid-cols-[auto_1fr] place-items-center col-span-2",
                !pathname.startsWith(href) && "btn-ghost [&>span]:hidden p-3",
              )}
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