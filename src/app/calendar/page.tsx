'use client'

import { useState, useEffect } from 'react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import LayoutContent from "@/components/templates/LayoutContent";
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid"

function classNames(...classes: (string| boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarPage() {
  const [ meetings, setMeetings ] = useState([
    {
      "_id": "629924078f28b719d95f61af",
      "name": "Reyno Show",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
  ]);

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
    || isSameDay(parseISO(meeting.endDatetime), selectedDay)
  )

  return (
    <LayoutContent className="grid-rows-[auto_1fr] w-full bg-black">
      <div className="flex items-center py-4">
        <h2 className="flex-auto font-semibold text-white [&>span]:text-gray-600">
          {format(firstDayCurrentMonth, 'MMMM')}<span>{format(firstDayCurrentMonth, 'yyyy')}</span>
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
      <div className="full-width grid grid-rows-[auto_1fr] bg-base-100 rounded-t-2xl">
        <div className="grid grid-cols-7 text-sm font-bold text-center p-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'grid grid-rows-4 border-4 border-base-200 [counter-increment:number_1]', 
                'before:flex before:items-center before:justify-center',
                'before:w-full before:mx-auto before:mt-3 before:text-sm before:font-bold before:rounded-md',
                'before:content-[counter(number)]',
                isToday(day) && 'before:bg-primary',
                isEqual(day, selectedDay) && 'border-t-4 border-t-primary bg-success/20',
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
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  'btn btn-xs size-full grid grid-rows-subgrid',
                  true ? 'btn-ghost text-base-300 row-span-2' : 'btn-accent rounded-lg',
                )}
              >
                {/* <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time> */}
                <PlusIcon className="size-6 row-span-3 text-base-300" />
              </button>

              <div className="w-1 h-1 mx-auto mt-1">
                {meetings.some((meeting) =>
                  isSameDay(parseISO(meeting.startDatetime), day)
                  || isSameDay(parseISO(meeting.endDatetime), day)
                ) && (
                  <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContent>
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