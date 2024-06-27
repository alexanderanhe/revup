import type { Metadata, ResolvingMetadata } from 'next'
import { ReactNode } from "react";
import clsx from 'clsx';

import Header from "@/app/ui/utils/menus/Header";
import Footer from "@/app/ui/utils/menus/Footer";
import BackButton from '@/app/ui/utils/BackButton';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  title?: string,
  pageMenu?: ReactNode,
  children?: ReactNode,
  bg?: string,
  className?: string,
  head?: boolean | string,
  footer?: boolean | string,
}

export default function LayoutContent({ title, pageMenu, bg, children, className, head, footer }: Props) {
  return (
    <div className={clsx('min-h-[calc(100svh_-_6rem)]', footer && 'mb-24')}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center z-[-1]`} />}
      { head && <Header />}
      <main className={`content-grid grid-flow-row auto-rows-max hover:auto-rows-min place-items-start space-y-6 ${className}`}>
        { title && 
          <div className="sticky top-0 bg-base-100 grid grid-cols-[auto_1fr] place-items-center w-full z-30 p-4">
            <BackButton className="btn btn-sm btn-ghost btn-square">
              <ChevronLeftIcon className="w-6 h-6" />
            </BackButton>
            <h1 className="text-base font-bold text-center">{ title }</h1>
            { pageMenu }
          </div>
        }
        { children }
      </main>
      { footer && <Footer />}
    </div>
  )
}
