import LayoutContent from "@/components/templates/LayoutContent";
import Calendar from "@/components/calendar/Calendar";

export default function CalendarPage() {

  return (
    <LayoutContent className="grid-rows-[auto_1fr] w-full h-auto bg-black">
      <Calendar />
    </LayoutContent>
  )
}