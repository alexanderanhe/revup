'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MenuNavLinks } from "@/lib/definitions";
import { menuNavLinks } from "@/lib/nav";

const Header = () => {
  const pathname = usePathname();
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <header className="content-grid sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/75">
      <nav className="grid grid-cols-[1fr_auto] px-0 py-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost grid grid-cols-[auto_1fr] px-0">
            <div className="w-10 mask mask-squircle avatar">
              <Image
                width={40}
                height={40}
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Brayan Angulo"
              />
            </div>
            <div className="grid grid-rows-2 gap-[0.2rem] place-items-start">
              <span className="text-xs text-primary-content">Welcome Back</span>
              Brayan Angulo! 🤘
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            { menuNavLinks.filter(({current}: MenuNavLinks) => current.includes('nav'))
              .map(({name, href}: MenuNavLinks) => (
              <li key={`navLink${href}`} onClick={handleClick}>
                <Link
                  href={href}
                  className={`${pathname === href ? "text-primary" : ''}`}
                >{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    
  )
}

export default Header