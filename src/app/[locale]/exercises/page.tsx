import Card from "@/app/ui/Card";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getUserCurrentPlanWorkouts } from "@/lib/data";
import { WorkoutImage } from "@/lib/definitions";
import { Link } from "@/navigation";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default async function ExercisesPage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const excercises = await getUserCurrentPlanWorkouts(locale);
  
  if (!excercises) {
    return null;
  }

  return (
    <LayoutContent title="Exercises">
      <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
        { excercises?.map(({ id, name, image_banner }, i, excercises) => (
          <li key={`exercise${id}`}>
            <div className="timeline-middle text-secondary">
              <RocketLaunchIcon className="size-5" />
            </div>
            <Card className="relative h-24 timeline-end mb-3">
              <Link href={`/workout/run#${id}`} className="grid items-end justify-start w-full h-full z-[1] font-semibold">
                { name }
              </Link>
              <ImageWorkout
                image={image_banner?.[0] as WorkoutImage}
                width={100}
                height={100}
                className="absolute inset-0 w-full h-full object-cover object-right rounded-lg"
                style={{ maskImage: "linear-gradient(to left, black -100%, transparent)"}}
              />
            </Card>
            <hr className={clsx(excercises.length - 1 === i && 'hidden')} />
          </li>
        ))}
      </ul>
      <Link
        href={`/exercises/run`}
        className="btn btn-primary w-full"
      >Start</Link>
    </LayoutContent>
  )
}