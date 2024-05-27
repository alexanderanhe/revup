import Link from "next/link";
import { CalendarDaysIcon, ArrowLongLeftIcon } from "@heroicons/react/24/outline"

import { fetchEvents } from "@/lib/data";
import LayoutContent from "@/components/templates/LayoutContent";
import Section from "@/components/templates/Section";
import SmallCalendar from "@/components/calendar/SmallCalendar";

export default async function WorkoutPage() {
  const headerButton = <Link href='/workout/calendar' className="btn btn-ghost btn-circle p-0"><CalendarDaysIcon className="size-6" /></Link>
  const data = await fetchEvents(new Date());

  return (
    <LayoutContent>
      {/* <Section
        title="Mi entrenamiento"
        horizonalHeader
        CloseIcon={<ArrowLongLeftIcon className="size-8" />}
        headerButton={headerButton}
        buttons={[]}
      > */}
        <div className="flex items-center justify-center w-full">
          <SmallCalendar data={data} />
        </div>
        {/* <p>Para poder recomendarte un programa de entrenamiento personalizado, necesitamos saber un poco más sobre ti.</p> */}
      {/* </Section> */}
    </LayoutContent>
  )
}