import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from "react";
import Header from "./menus/Header";

type Props = {
  title: string,
  children: ReactNode,
  bg?: string,
  className?: string,
}

export function generateMetadata(
  { title }: Props,
  parent: ResolvingMetadata
): Metadata {
 
  return {
    title,
    // openGraph: {
    //   title: 'Acme',
    //   description: 'Acme is a...',
    // },
  }
}

export default function LayoutContent({ title, bg, children, className }: Props) {
  return (
    <div className={'min-h-screen'}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center`} />}
      <Header />
      <main className={`content-grid grid-rows-[auto] place-items-start min-h-[80vh] space-y-6 mb-24 ${className}`}>
        { title && <h1 className="text-xl font-bold">{ title }</h1> }
        { children }
      </main>
    </div>
  )
}
