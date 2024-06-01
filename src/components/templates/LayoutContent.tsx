import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from "react";
import clsx from 'clsx';

import Header from "@/components/templates/menus/Header";
import Footer from "@/components/templates/menus/Footer";

type Props = {
  title?: string,
  children?: ReactNode,
  bg?: string,
  className?: string,
  head?: boolean | string,
  footer?: boolean | string,
}

export default function LayoutContent({ title, bg, children, className, head, footer }: Props) {
  return (
    <div className={clsx('min-h-[calc(100svh_-_6rem)]', footer && 'mb-24')}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center z-[-1]`} />}
      { head && <Header />}
      <main className={`content-grid grid-flow-row auto-rows-max hover:auto-rows-min place-items-start space-y-6 ${className}`}>
        { title && 
          <h1 className={clsx(
            'text-xl font-bold',
            !head && 'mt-6'
          )}>{ title }</h1>
        }
        { children }
      </main>
      { footer && <Footer />}
    </div>
  )
}
