'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {useRouter, usePathname} from '@/navigation';
import { locales } from '@/i18n';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as (typeof locales)[number];
    startTransition(() => {
      router.replace(pathname,
        {locale: nextLocale}
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative font-semibold',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-1 pr-5"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}