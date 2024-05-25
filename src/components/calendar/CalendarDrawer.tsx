"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { clsx } from "clsx";
import { format } from 'date-fns';

import { CalendarDayContent } from "@/lib/definitions";
import { ArrowLongUpIcon, CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import WorkoutDay from "./WorkoutDay";

type CalendarDrawerProps = {
  selectedDay: CalendarDayContent | null;
  setSelectedDay: (date: CalendarDayContent | null) => void;
};

export function CalendarDrawer({selectedDay, setSelectedDay}: CalendarDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(1);
  const [snapHeights, setSnapHeights] = useState<(string | 1)[]>(["118px", 1]);
  const [open, setOpen] = useState<boolean>(!!selectedDay);

  const handleOpenChange = (state: boolean) => {
    setSelectedDay(state ? selectedDay : null);
    setOpen(state);
  };

  useEffect(() => {
    const defaultSnap = `${window.innerHeight/2 + 50}px`;
    const sHeights: (string | 1)[] = [
      "118px",
      defaultSnap,
      1,
    ];
    setSnapHeights(sHeights);
    setOpen(!!selectedDay);
    setSnap(defaultSnap)
  }, [selectedDay]);

  return (
    <Drawer.Root
      snapPoints={snapHeights}
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
              { snap === snapHeights.at(0) ? (
                <button type="button" onClick={() => setSnap(1)}>
                  <ArrowLongUpIcon className="w-6 h-6" />
                </button>
              ) : (
                <button type="button" onClick={() => setOpen(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            <hr className="h-px bg-gray-200 border-0" />

            <WorkoutDay />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

