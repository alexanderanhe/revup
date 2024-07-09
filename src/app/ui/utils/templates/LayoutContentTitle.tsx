'use client'

import { usePathname } from "@/navigation";
import BackButton from '@/app/ui/utils/BackButton';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type LayoutContentTitleProps = {
  title?: string;
  LeftPageMenu?: React.ReactNode;
  pageMenu?: React.ReactNode;
  hasMenu?: boolean;
  showBackButton?: boolean;
}

export default function LayoutContentTitle({
  title,
  LeftPageMenu,
  pageMenu,
  hasMenu,
  showBackButton
}: LayoutContentTitleProps) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const isChild = paths.length > 1;

  return title && (
    <div className="sticky top-0 full-width bg-base-100 w-full z-30 py-4">
      <div className="grid grid-cols-[104px_1fr_104px] place-items-center w-full">
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