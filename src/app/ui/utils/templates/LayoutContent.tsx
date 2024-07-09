import { ReactNode } from "react";
import clsx from 'clsx';

import Header from "@/app/ui/utils/menus/Header";
import Footer from "@/app/ui/utils/menus/Footer";
import LayoutContentTitle from './LayoutContentTitle';

type Props = {
  title?: string;
  pageMenu?: ReactNode;
  children?: ReactNode;
  bg?: string;
  className?: string;
  head?: boolean | string;
  footer?: boolean | string;
  showBackButton?: boolean | string;
}

export default function LayoutContent({ title, pageMenu, bg, children, className, head, footer, showBackButton }: Props) {
  return (
    <div className={clsx('min-h-[calc(100svh_-_6rem)]', footer && 'mb-24')}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center z-[-1]`} />}
      { head && <Header />}
      <main className={clsx(
        "content-grid grid-flow-row auto-rows-max place-items-start space-y-6",
        className
      )}>
        <LayoutContentTitle
          title={title}
          pageMenu={pageMenu}
          hasMenu={Boolean(head || footer)}
          showBackButton={Boolean(showBackButton)}
        />
        { children }
      </main>
      { footer && <Footer />}
    </div>
  )
}