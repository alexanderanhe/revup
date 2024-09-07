'use client'

import { usePathname } from "@/navigation";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import BackButton from '@/app/ui/utils/BackButton';
import PullToRefresh from "@/app/ui/utils//PullToRefresh";
import { cn } from "@/lib/utils";

type LayoutContentTitleProps = {
  title?: React.ReactNode | string;
  titleFixed?: boolean;
  titleTransparent?: boolean | string;
  LeftPageMenu?: React.ReactNode;
  pageMenu?: React.ReactNode;
  hasMenu?: boolean;
  showBackButton?: boolean;
  pullToRefresh?: boolean | string;
}

export default function LayoutContentTitle({
  title,
  titleFixed,
  titleTransparent,
  LeftPageMenu,
  pageMenu,
  hasMenu,
  showBackButton,
  pullToRefresh
}: LayoutContentTitleProps) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const isChild = paths.length > 1;

  return title && (
    <div className={cn(
      titleFixed ? 'fixed' : 'sticky',
      "top-0 full-width w-full z-30",
      !titleTransparent && 'backdrop-blur bg-base-100/0'
    )}>
      { pullToRefresh && <PullToRefresh />}
      <div className="grid grid-cols-[104px_1fr_104px] place-items-center w-full min-h-20 py-4">
        <div className="flex gap-2 w-full">
          {(isChild || !hasMenu || showBackButton) && (
            <BackButton className="btn btn-square rounded-lg">
              <ChevronLeftIcon className="size-4" />
            </BackButton>
          )}
          { LeftPageMenu }
        </div>
        <h1 className="text-base font-bold text-center [&::first-letter]:capitalize">{ title }</h1>
        <div className="flex justify-end gap-2 w-full">
          { pageMenu }
        </div>
      </div>
    </div>
  )
}