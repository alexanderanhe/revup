'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuNavLinks } from "@/lib/definitions"
import { menuNavLinks } from "@/lib/nav";

export default function Nav({ filter }: { filter: string }) {
  const pathname = usePathname();
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    menuNavLinks.filter(({current}: MenuNavLinks) => current.includes(filter))
      .map(({name, href}: MenuNavLinks) => (
      <li key={`navLink${href}`} onClick={handleClick}>
        <Link
          href={href}
          className={`${pathname === href ? "text-primary" : ''}`}
        >{name}</Link>
      </li>
    ))
  )
}