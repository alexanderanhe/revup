'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getISODay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { ArrowLongLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid"
// import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline"

import { CalendarDrawer } from './CalendarDrawer';
import { CalendarContent, CalendarDayContent } from '@/lib/definitions';
import BackButton from '../utils/BackButton';

export default function Calendar() {
  const [ events, setEvents ] = useState<CalendarContent[]>([]);
  const [ days, setDays ] = useState<CalendarDayContent[]>([]);

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState<CalendarDayContent | null>(null)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  // let days = eachDayOfInterval({
  //   start: firstDayCurrentMonth,
  //   end: endOfMonth(firstDayCurrentMonth),
  // });


  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = useMemo(() => selectedDay ? events.filter((event) =>
    isSameDay(parseISO(event.startDatetime), selectedDay.day)
    || isSameDay(parseISO(event.endDatetime), selectedDay.day)
  ) : null, [selectedDay, events])

  const checkDayMeetings = (day: Date) => {
    return events.some((event) =>
      isSameDay(parseISO(event.startDatetime), day)
      || isSameDay(parseISO(event.endDatetime), day)
    )
  }

  useEffect(() => {
    const result = [
      {
        "id": "629924078f28b719d95f61af",
        "name": "Hand exercise",
        "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
        "description": "",
        "startDatetime": "2024-05-11T20:00",
        "endDatetime": "2024-05-11T23:00",
        "active": true
      },
      {
        "id": "629924078f28b719d95f61ad",
        "name": "Arm day workout",
        "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
        "description": "",
        "startDatetime": "2024-05-11T20:00",
        "endDatetime": "2024-05-11T23:00",
        "active": true
      },
      {
        "id": "629924078f28b719d95f61ah",
        "name": "Reyno Show",
        "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
        "description": "",
        "startDatetime": "2024-05-11T20:00",
        "endDatetime": "2024-05-11T23:00",
        "active": true
      },
      {
        "id": "629924078f28b719d95f61al",
        "name": "Gym workout",
        "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
        "description": "",
        "startDatetime": "2024-05-11T20:00",
        "endDatetime": "2024-05-11T23:00",
        "active": true
      },
    ];
    const daysOfMonth = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    });
    setDays(daysOfMonth.map((day) => {
      let content = result.filter((event) =>
        isSameDay(parseISO(event.startDatetime), day)
        || isSameDay(parseISO(event.endDatetime), day)
      )
      return { day, content }
    }));
    setEvents(result);
  }, [currentMonth])

  return (
    <>
      <header className='flex gap-2 place-items-start flex-row items-center justify-start w-full [&>h1]:text-gray-600 gap-2'>
        <BackButton className='btn btn-ghost btn-circle text-base-300 p-0'>
          <ArrowLongLeftIcon className="size-8" />
        </BackButton>
        <h1 className="text-sm font-bold flex-1 uppercase text-center pr-12">Calendario</h1>
      </header>
      <div className="flex items-center justify-center w-full" style={{ marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={previousMonth}
          className="btn btn-sm btn-circle"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <h2 className="flex items-center justify-center flex-auto font-semibold text-white [&>span]:text-gray-600 [&>span]:ml-1">
          {format(firstDayCurrentMonth, 'MMMM')}<span>{format(firstDayCurrentMonth, 'yyyy')}</span>
        </h2>
        <button
          onClick={nextMonth}
          type="button"
          className="btn btn-sm btn-circle"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="full-width w-full h-full grid grid-rows-[auto_1fr] bg-base-100 rounded-t-2xl">
        <div className="sticky top-0 grid grid-cols-7 text-sm font-bold text-center bg-base-100 p-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 text-sm">
          {days.map(({day, content}, dayIdx) => (
            <button
              key={`calendarDay${day.toString()}`}
              type="button"
              onClick={() => setSelectedDay({day, content})}
              data-day={format(day, 'd')}
              className={clsx(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'grid grid-rows-[32px_auto_auto_auto] gap-2 border-2 border-base-200 [counter-increment:number_1]', 
                'before:flex before:items-center before:justify-center',
                'before:w-full before:mt-3 before:text-sm before:font-bold before:rounded-md',
                'before:content-[attr(data-day)]',
                dayIdx === 0 && 'before:[counter-set:number_1]',
                isToday(day) && 'before:bg-primary',
                selectedDay && isEqual(day, (selectedDay as { day: Date }).day) && 'border-t-2 border-t-primary bg-success/20',
                // selectedDay && weekDays.some((d) => isSameDay(d, day)) && `before:[counter-set:number_${dayIdx + 1}]`,
                // selectedDay && !weekDays.some((d) => isSameDay(d, day)) && 'hidden',
                // !isEqual(day, selectedDay) &&
                //   isToday(day) &&
                //   'before:text-blue-900',
                // !isEqual(day, selectedDay) &&
                //   !isToday(day) &&
                //   isSameMonth(day, firstDayCurrentMonth) &&
                //   'before:text-gray-900',
                // !isEqual(day, selectedDay) &&
                //   !isToday(day) &&
                //   !isSameMonth(day, firstDayCurrentMonth) &&
                //   'before:text-gray-400',
                // isEqual(day, selectedDay) && isToday(day) && 'before:bg-blue-600',
                // isEqual(day, selectedDay) &&
                //   !isToday(day) &&
                //   'before:bg-gray-900',
                // // !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                // (isEqual(day, selectedDay) || isToday(day)) &&
                //   'before:font-semibold',
              )}
            >
              { checkDayMeetings(day) ? content?.slice(0, 3).map(
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
            </button>
          ))}
        </div>
      </div>
      <CalendarDrawer
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]