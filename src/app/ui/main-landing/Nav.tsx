'use client'

import { Link } from "@/navigation";

export default function Nav({ hash, children }: { hash: string, children: React.ReactNode }) {
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <li className="mr-3" onClick={handleClick}>
      <Link
        href={`/#${hash}`}
        scroll={false}
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >{ children }</Link>
    </li>
  )
}