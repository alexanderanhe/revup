import { fetchEvents } from "@/lib/data";
import LayoutContent from "@/components/templates/LayoutContent";
import SmallCalendar from "@/components/calendar/SmallCalendar";

export default async function WorkoutPage() {
  const data = await fetchEvents(new Date());

  return (
    <LayoutContent>
      <div className="flex items-center justify-center w-full">
        <SmallCalendar data={data} />
      </div>
      {/* <p>Para poder recomendarte un programa de entrenamiento personalizado, necesitamos saber un poco más sobre ti.</p> */}
    </LayoutContent>
  )
}