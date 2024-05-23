import LayoutContent from "@/components/templates/LayoutContent";
import Calendar from "@/components/calendar/Calendar";

export default function CalendarPage() {

  return (
    <LayoutContent className="grid-rows-[auto_1fr] w-full h-auto bg-black">
      <Calendar />
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