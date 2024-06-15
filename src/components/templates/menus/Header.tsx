import { auth } from "@/auth";

import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

// import { User, selectUser, set_user } from "@/lib/features/auth";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Nav from "./Nav";
import clsx from "clsx";
import Link from "next/link";
import LogOutButton from "@/components/utils/LogOutButton";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="content-grid sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-base-100/75">
      <nav className="grid grid-cols-[1fr_auto] px-0 py-4">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="btn btn-ghost px-0">
              <div className="w-10 mask mask-squircle avatar">
                <Image
                  width={40}
                  height={40}
                  src={session
                    ? `${user?.image ?? `https://ui-avatars.com/api/?name=${user?.name}&background=51FF6D&color=ffa80f&rounded=true`}`
                    : `https://avatar.iran.liara.run/public`
                  }
                  alt={`${user?.name ?? ''}`}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52">
              <Nav filter='nav' />
              {session && <LogOutButton type="li" className="text-left px-1"><a>Cerrar sesión</a></LogOutButton>}
            </ul>
          </div>
          <div className="grid grid-rows-2 gap-[0.2rem] place-items-start h-10 text-sm font-semibold">
            <span className={clsx(
              "text-xs text-gray-600",
              !session && "row-span-2"
            )}>Bienvenido</span>
            <span className="truncate overflow-hidden w-full">{session ? `${user?.name ?? ''}! 🤘` : ''}</span>
          </div>
        </div>
        <div>
          {!session && <div className="dropdown dropdown-end">
            <Link href="/login" className="btn btn-primary rounded-2xl">Log In</Link>
          </div>}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-sm badge-primary indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] dropdown-content w-96 max-w-screen bg-base-100 shadow">

              <div className="flex justify-between px-3 py-1 bg-base-200 items-center gap-1 rounded-lg my-3">
                <div className="relative size-14 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-12 bg-gray-200 rounded-full border-2 border-white">
                    <Image width={788} height={788} className="w-full h-full object-cover rounded-full" src="/images/trainer_pngegg.webp" alt=""/>
                  </div>
                </div>
                <div>
                  <span className="font-mono">Jhon le gustaría conectar contigo</span>
                </div>
                <div className="flex gap-2">
                  <button>
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </header>
    
  )
}