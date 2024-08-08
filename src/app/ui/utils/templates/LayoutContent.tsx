import { ReactNode } from "react";
import clsx from 'clsx';

import Header from "@/app/ui/utils/menus/Header";
import Footer from "@/app/ui/utils/menus/Footer";
import LayoutContentTitle from '@/app/ui/utils/templates/LayoutContentTitle';

type Props = {
  title?: React.ReactNode | string;
  titleFixed?: boolean;
  pageMenu?: ReactNode;
  children?: ReactNode;
  bg?: string;
  className?: string;
  head?: boolean | string;
  footer?: boolean | string;
  showBackButton?: boolean | string;
  pullToRefresh?:boolean | string;
  headerButton?: ReactNode;
}

export default function LayoutContent({ title, titleFixed, pageMenu, bg, children, className, head, footer, showBackButton, pullToRefresh, headerButton }: Props) {
  return (
    <main className={clsx('min-h-[calc(100svh_-_6rem)]', footer && 'mb-24')}>
      {bg && <div className={`absolute inset-0 ${ bg } bg-cover bg-center z-[-1]`} />}
      { head && <Header headerButton={headerButton} pullToRefresh={!title && pullToRefresh} />}
      <div className={clsx(
        "content-grid grid-flow-row auto-rows-max place-items-start space-y-6",
        className
      )}>
        <LayoutContentTitle
          title={title}
          titleFixed={Boolean(titleFixed)}
          pageMenu={pageMenu}
          hasMenu={Boolean(head || footer)}
          showBackButton={Boolean(showBackButton)}
          pullToRefresh={pullToRefresh}
        />
        { children }
      </div>
      { footer && <Footer />}
    </main>
  )
}