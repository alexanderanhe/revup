'use client'

import { usePathname } from "@/navigation";
import BackButton from '@/app/ui/utils/BackButton';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type LayoutContentTitleProps = {
  title?: string;
  pageMenu?: React.ReactNode;
  hasMenu?: boolean;
}

export default function LayoutContentTitle({ title, pageMenu, hasMenu }: LayoutContentTitleProps) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const isChild = paths.length > 1;

  return title && (
    <div className="sticky top-0 full-width bg-base-100 w-full z-30 py-4">
      <div className="grid grid-cols-[auto_1fr_auto] place-items-center w-full">
        {isChild || !hasMenu ? (
          <BackButton className="btn btn-sm btn-square btn-ghost bg-[#F7F8F8] rounded-lg btn-ghost">
            <ChevronLeftIcon className="size-2.5 text-[#1D1617]" />
          </BackButton>
        ) : <div className="w-8"></div>}
        <h1 className="text-base font-bold text-center">{ title }</h1>
        { pageMenu ?? <div className="w-8"></div> }
      </div>
    </div>
  )
}