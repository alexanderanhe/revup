'use client'

import { PAGES } from "@/lib/routes"
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation"
import { useEffect, useRef } from "react";

const routes = [
  { name: 'Notification', path: `${PAGES.ADMIN}/notification` },
  { name: 'Notion Sync', path: `${PAGES.ADMIN}/notion` },
  { name: 'Cloudflare Images', path: `${PAGES.ADMIN}/images` },
];

export default function MenuAdmin() {
  const divRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = (path: string) => pathname.startsWith(path) && 'btn-primary';

  useEffect(() => {
    if (divRef.current) {
      const div = divRef.current;
      const currentPageId = pathname.replaceAll('/', '');
      const target = document.querySelector<HTMLElement>(`#${currentPageId}`)!;
      const left = target?.offsetLeft ?? 0;
      div.scrollTo({ left: left, behavior: 'instant' });
    }
  }, [divRef.current]);
  return (
    <div ref={divRef} className="relative overflow-auto w-full">
      <ul className="flex flex-nowrap gap-2" style={{ margin: 0}}>
        {routes.map(({ name, path }) => (
          <li key={path} id={path.replaceAll('/', '')}>
            <Link className={cn("btn btn-sm text-nowrap", active(path))} href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}