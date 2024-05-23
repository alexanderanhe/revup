'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
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
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"

import { CalendarDrawer } from './Drawer';
import { CalendarContent, CalendarDayContent } from '@/lib/definitions';

export default function Calendar() {
  const [ events, setEvents ] = useState<CalendarContent[]>([]);
  const [ days, setDays ] = useState<CalendarDayContent[]>([]);

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState<CalendarDayContent | null>({day: today, content: []})
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  // let days = eachDayOfInterval({
  //   start: firstDayCurrentMonth,
  //   end: endOfMonth(firstDayCurrentMonth),
  // });

  let fromISODay = getISODay(today);
  const targetISODaySun = 7; // follow the getISODay format (7 for Sunday, 1 for Monday)
  let offsetDays =
    targetISODaySun >= fromISODay
      ? -7 + (targetISODaySun - fromISODay)
      : targetISODaySun - fromISODay;
  let firstDayOfWeek = add(today, { days: offsetDays });
  let weekDays = eachDayOfInterval({
    start: firstDayOfWeek,
    end: add(firstDayOfWeek, { days: 6 }),
  });


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
      <div className="flex items-center bg-black/90 w-full py-4">
        <Link
          href="/"
          className='btn btn-ghost btn-square text-gray-400 flex-none'
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </Link>
        <h2 className="flex-auto font-semibold text-white [&>span]:text-gray-600">
          {format(firstDayCurrentMonth, 'MMMM')} <span>{format(firstDayCurrentMonth, 'yyyy')}</span>
        </h2>
        <button
          type="button"
          // onClick={getMeetings}
          className="mr-2 text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
        >
          <span className="sr-only">Refresh</span>
          <ArrowPathIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      { !selectedDay && (
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
                className={clsx(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  'grid grid-rows-[32px_58px_58px_58px] gap-2 border-2 border-base-200 [counter-increment:number_1]', 
                  'before:flex before:items-center before:justify-center',
                  'before:w-full before:mt-3 before:text-sm before:font-bold before:rounded-md',
                  'before:content-[counter(number)]',
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
      )}
      {selectedDay && <SmallCalendar selectedDay={selectedDay} />}
      <CalendarDrawer
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </>
  )
}

function SmallCalendar({ selectedDay }: { selectedDay: CalendarDayContent | null }) {
  const { day } = selectedDay || { day: new Date() };
  const [ days, setDays ] = useState<CalendarDayContent[]>([]);

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
    const dayslast7 = eachDayOfInterval({
      start: add(day, { days: -6 }),
      end: day,
    });
    setDays(dayslast7.map((day) => {
      let content = result.filter((event) =>
        isSameDay(parseISO(event.startDatetime), day)
        || isSameDay(parseISO(event.endDatetime), day)
      )
      return { day, content }
    }));
  }, [selectedDay]);

  return (
    <div className="full-width w-full h-full grid grid-flow-row auto-rows-max bg-base-100 rounded-t-2xl">
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
                selectedDay && isEqual(day, selectedDay.day) && 'border-t-2 border-t-primary bg-success/20',
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
      </div>
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