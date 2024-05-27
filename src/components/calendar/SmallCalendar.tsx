import clsx from 'clsx';
import {
  add,
  eachDayOfInterval,
  format,
  isEqual,
  isSameDay,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { ArrowLongLeftIcon, CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"

import { CalendarContent, CalendarDayContent } from '@/lib/definitions';
import WorkoutDay from '@/components/calendar/WorkoutDay';
import Link from 'next/link';
import BackButton from '@/components/utils/BackButton';

export default function SmallCalendar({ data }: { data: CalendarContent[] }) {
  let today = startOfToday()
  const dayslast7 = eachDayOfInterval({
    start: add(today, { days: -6 }),
    end: today,
  });
  const days = dayslast7.map((day) => {
    let content = data.filter((event) =>
      isSameDay(parseISO(event.startDatetime), day)
      || isSameDay(parseISO(event.endDatetime), day)
    )
    return { day, content }
  });

  return (
    <div className="grid w-full h-full grid grid-flow-row auto-rows-max bg-base-100 rounded-t-2xl">
      <header className='flex gap-2 place-items-start flex-row items-center justify-start w-full [&>h1]:text-gray-600 gap-2'>
        <BackButton className='btn btn-ghost btn-circle text-base-300 p-0'>
          <ArrowLongLeftIcon className="size-8" />
        </BackButton>
        <h1 className="text-sm font-bold flex-1 uppercase text-center">Mi calendario</h1>
        <Link href='/workout/calendar' className="btn btn-ghost btn-circle p-0">
          <CalendarDaysIcon className="size-6" />
        </Link>
      </header>
      <div className="grid grid-cols-7 text-sm font-bold text-center p-2">
        {days.map(({day}: CalendarDayContent, dayIdx) => (
          <div key={`scalendarWeekName${day.toString()}`}>{ format(day, 'EEE')}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-sm">
        {days.map(({day, content}: CalendarDayContent, dayIdx) => (
          <div
            key={`scalendarDay${day.toString()}`}
            data-day={format(day, 'd')}
            className={clsx(
              'grid grid-rows-[32px_58px_58px_58px] gap-2 border-2 border-base-200', 
              'before:flex before:items-center before:justify-center',
              'before:w-full before:mt-3 before:text-sm before:font-bold before:rounded-md',
              'before:content-[attr(data-day)]',
              isToday(day) && 'before:bg-primary',
              isEqual(day, today) && 'border-t-2 border-t-primary bg-success/20',
            )}
          >
            { content?.length ? content?.slice(0, 3).map(
              (event, i) =>
                <div
                  key={`event${event.id}`}
                  className={clsx(
                    'grid grid-rows-[auto_1fr] place-items-center w-full h-[58px] rounded-md p-1', 
                    (i < 2 || content.length <= 3) && 'bg-accent text-[0.6rem]/3 font-semibold text-ellipsis overflow-hidden',
                    (i === 2 && content.length > 3) && 'bg-accent/40 text-base font-bold text-ellipsis',
                  )}
                >
                  { (i < 2 || content.length <= 3) ? (
                    <>
                      <HeartIcon className="size-3" />
                      {event.name}
                    </>
                  ) : (
                    <>
                      <HeartIcon className="size-3" />
                      {content.length - 2}
                    </>
                  )}
                </div>
            ) : (
              <div
                className={clsx(
                  'size-full grid grid-rows-subgrid place-items-center',
                  'text-base-300 row-span-2',
                )}
              >
                <PlusIcon className="size-6 row-span-3 text-base-300" />
              </div>
            )}
          </div>
        ))}
      </div>
      <WorkoutDay />
    </div>
  )
}