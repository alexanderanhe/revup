import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from "react";

import { MenuNavLinks } from '@/lib/definitions';
import Header from "@/components/templates/menus/Header";
import Footer from "@/components/templates/menus/Footer";

type Props = {
  title?: string,
  children?: ReactNode,
  bg?: string,
  className?: string,
  head?: boolean | string,
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

export default function LayoutContent({ title, bg, children, className, head }: Props) {
  return (
    <div className={'min-h-screen mb-24'}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center`} />}
      {head && <Header />}
      <main className={`content-grid grid-flow-row auto-rows-max hover:auto-rows-min place-items-start min-h-[80vh] space-y-6 mb-24 ${className}`}>
        { title && <h1 className="text-xl font-bold">{ title }</h1> }
        { children }
      </main>
      <Footer />
    </div>
  )
}
