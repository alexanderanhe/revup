import Card from "@/app/ui/Card";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getUserCurrentPlan, getUserCurrentPlanWorkouts } from "@/lib/data";
import { Plan, WorkoutImage } from "@/lib/definitions";
import { Link } from "@/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

export default async function ExercisesPage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations("Workout");
  const plan = await getUserCurrentPlan(locale) as Plan;
  const excercises = await getUserCurrentPlanWorkouts(locale);

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }
  
  if (!excercises) {
    return null;
  }

  return (
    <LayoutContent title="Exercises">
      <Card className="indicator w-full">
        <div className="flex gap-3">
          <ProgressCircle type={0 > 80 ? 'success' : 'error'} progress={0} />
          <div className="flex flex-col justify-center font-medium w-full">
            <span className="text-xs">{ t("planDetailsDay", { day: plan.current_day }) }</span>
            <span className="font-semibold [&::first-letter]:uppercase">
              { plan.body_zones?.[((plan.current_day ?? 1) - 1) % plan.body_zones.length] ?? '-'}
            </span>
          </div>
        </div>
      </Card>
      <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
        { excercises?.map(({ id, name, image_banner, sets, reps, weight, weight_unit, time, time_unit }, i, excercises) => (
          <li key={`exercise${id}`}>
            <div className="timeline-middle text-primary">
              <ArrowRightCircleIcon className="size-5" />
            </div>
            <Card className="relative h-24 timeline-end mb-3">
              <Link href={`/exercises/run#${id}`} className="grid items-end justify-start w-full h-full z-[1] font-semibold">
                { name }
                <span className="text-xs text-primary font-medium">
                  { sets && reps && `${ sets }x${ reps }x${ weight } ${ weight_unit }`}
                  { time && time_unit && `${ time } ${ time_unit }`}
                </span>
              </Link>
              <ImageWorkout
                image={image_banner?.[0] as WorkoutImage}
                width={100}
                height={100}
                className="absolute inset-0 w-full h-full object-cover object-right rounded-lg"
                style={{ maskImage: "linear-gradient(to right, black -100%, transparent)"}}
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