import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getWorkouts } from "@/lib/data";

export default async function WorkoutItemPage({
  params: { locale, workoutId }
}: {
  params: {
    locale: string;
    workoutId: string;
  }
}) {
  const workouts = await getWorkouts(locale, {
    match: {
      id: workoutId
    }
  });
  
  return (
    <LayoutContent title="Explore" footer>
      <section className="w-full p-0">
        <h1>Workout Item</h1>
      </section>
    </LayoutContent>
  )
}