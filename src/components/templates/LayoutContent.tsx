'use client'

import { ReactNode, useEffect } from "react";
import Header from "./menus/Header";

type Props = {
  title: string,
  children: ReactNode,
  bg?: string,
  className?: string,
}

export default function LayoutContent({ title, bg, children, className }: Props) {
  useEffect(() => {
    document.title = title ?? "React App";
  }, []);
  return (
    <div className={'min-h-screen'}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center`} />}
      <Header />
      <main className={`content-grid grid-rows-[auto_1fr] place-items-start min-h-[80vh] space-y-6 mb-24 ${className}`}>
        { title && <h1 className="text-xl font-bold">{ title }</h1> }
        { children }
      </main>
    </div>
  )
}
