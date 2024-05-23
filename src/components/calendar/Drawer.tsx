"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { clsx } from "clsx";
import { format } from 'date-fns';

import { CalendarDayContent } from "@/lib/definitions";
import { ArrowLongRightIcon, ArrowLongUpIcon, ArrowPathIcon, BoltIcon, CalendarIcon, DocumentTextIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

type CalendarDrawerProps = {
  selectedDay: CalendarDayContent | null;
  setSelectedDay: (date: CalendarDayContent | null) => void;
};
const DEFAULT_SNAP = `${innerHeight/2 + 50}px`;
const SNAP_HEIGHTS = [
  "118px",
  DEFAULT_SNAP,
  1,
];
export function CalendarDrawer({selectedDay, setSelectedDay}: CalendarDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(DEFAULT_SNAP);
  const [open, setOpen] = useState<boolean>(!!selectedDay);

  const handleOpenChange = (state: boolean) => {
    setSelectedDay(state ? selectedDay : null);
    setOpen(state);
  };

  useEffect(() => {
    setOpen(!!selectedDay);
    setSnap(DEFAULT_SNAP)
  }, [selectedDay]);

  return (
    <Drawer.Root
      snapPoints={SNAP_HEIGHTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      open={open}
      onOpenChange={handleOpenChange}
      // dismissible={false}
      shouldScaleBackground
    >
      <Drawer.Overlay className="fixed inset-0 bg-black/80" />
      <Drawer.Portal>
        <Drawer.Content className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]">
          {/* <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" /> */}
          <div
            className={clsx("flex flex-col max-w-md mx-auto w-full p-4 pt-5 space-y-2", {
              "overflow-y-auto": snap === 1,
              "overflow-hidden": snap !== 1,
            })}
          >
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 font-semibold p-4">
              <CalendarIcon className="w-6 h-6" />
              {selectedDay && format(selectedDay.day, 'iiii, EEEE do')}
              { snap === SNAP_HEIGHTS.at(0) ? (
                <button type="button" onClick={() => setSnap(1)}>
                  <ArrowLongUpIcon className="w-6 h-6" />
                </button>
              ) : (
                <button type="button" onClick={() => setOpen(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0" />

            <div className="grid grid-cols-[auto_1fr] gap-2 font-semibold p-4">
              <ArrowPathIcon className="w-6 h-6" />
              Recent workouts
            </div>

            <div className="grid place-items-center font-semibold bg-base-200 text-base-300 rounded-lg p-4 flex-1">
              No workouts
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0" />

            <CalendarDrawerNested className="grid grid-cols-[auto_1fr_auto] place-items-start gap-2 font-semibold p-4">
              <BoltIcon className="w-6 h-6" />
              New workout
              <ArrowLongRightIcon className="w-6 h-6" />
            </CalendarDrawerNested>

            <hr className="h-px my-8 bg-gray-200 border-0" />

            <button type="button" className="grid grid-cols-[auto_1fr_auto] place-items-start gap-2 font-semibold p-4">
              <DocumentTextIcon className="w-6 h-6" />
              Notes
              <PlusIcon className="w-6 h-6" />
            </button>

            {/* <h1 className="text-2xl mt-2 font-medium">The Hidden Details</h1>
            <p className="text-sm mt-1 text-gray-600 mb-6">
              2 modules, 27 hours of video
            </p>
            <p className="text-gray-600">
              The world of user interface design is an intricate landscape
              filled with hidden details and nuance. In this course, you will
              learn something cool. To the untrained eye, a beautifully designed
              UI.
            </p> */}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

type CalendarDrawerNestedProps = {
  className?: string;
  children: React.ReactNode;
};

function CalendarDrawerNested({ children, ...props }: CalendarDrawerNestedProps) {

  return (
    <Drawer.NestedRoot>
      <Drawer.Trigger {...props}>
        { children }
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                This drawer is nested.
              </Drawer.Title>
              <p className="text-gray-600 mb-2">
                Place a{" "}
                <span className="font-mono text-[15px] font-semibold">
                  `Drawer.NestedRoot`
                </span>{" "}
                inside another drawer and it will be nested
                automatically for you.
              </p>
              <p className="text-gray-600 mb-2">
                You can view more examples{" "}
                <a
                  href="https://github.com/emilkowalski/vaul#examples"
                  className="underline"
                  target="_blank"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="https://github.com/emilkowalski/vaul"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="https://twitter.com/emilkowalski_"
                target="_blank"
              >
                Twitter
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
            
  );
}