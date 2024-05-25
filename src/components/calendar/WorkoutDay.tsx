import { ArrowLongRightIcon, ArrowPathIcon, BoltIcon, DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";
import CalendarDrawerNested from "./CalendarDrawerNested";

export default function WorkoutDay() {
  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="grid grid-cols-[auto_1fr] gap-2 font-semibold p-4">
        <ArrowPathIcon className="w-6 h-6" />
        Recent workouts
      </div>

      <div className="grid place-items-center font-semibold bg-base-200 text-base-300 rounded-lg p-4 flex-1">
        No workouts
      </div>

      <hr className="h-px bg-gray-200 border-0" />

      <CalendarDrawerNested className="grid grid-cols-[auto_1fr_auto] place-items-start gap-2 font-semibold p-4">
        <BoltIcon className="w-6 h-6" />
        New workout
        <ArrowLongRightIcon className="w-6 h-6" />
      </CalendarDrawerNested>

      <hr className="h-px bg-gray-200 border-0" />

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
  )
}