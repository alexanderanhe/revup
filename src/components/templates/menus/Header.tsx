import Link from "next/link";
import { Squares2X2Icon, FilmIcon, ClockIcon, CalendarDaysIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export type MenuNavLinks = {
  name: string,
  href: string,
  current: string[],
  Icon?: any
}

const menuNavLinks: MenuNavLinks[] = [
  { name: 'Assessment', href: '/assessment', current: ['nav'] },
  { name: 'Ejercicios', href: '/workout', current: ['nav'] },
  { name: 'On-demand', href: '/on-demand', current: ['footer'], Icon: FilmIcon },
  { name: 'Calendario', href: '/calendar', current: ['nav', 'footer'], Icon: CalendarDaysIcon },
  { name: 'Hoy', href: '/', current: ['nav', 'footer'], Icon: Squares2X2Icon },
  { name: 'Logs', href: '/logs', current: ['nav', 'footer'], Icon: ClockIcon },
  { name: 'Ajuste', href: '/profile', current: ['footer'], Icon: Cog6ToothIcon },
];

const Header = () => {
  const pathname = usePathname();
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/75">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <button tabIndex={0} role="button" className="btn btn-base-100 btn-circle">
                <Bars3Icon className="size-6" />
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-52">
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
          </div>
          {/* <div className="navbar-center">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div> */}
          <div className="navbar-end">
            {/* <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button> */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 mask mask-squircle">
                  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Footer menuNavLinks={menuNavLinks.filter(({current}: MenuNavLinks) => current.includes('footer'))} />
    </>
    
  )
}

export default Header