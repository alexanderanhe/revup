import { Link } from "@/navigation";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { RocketLaunchIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { getUserCurrentPlan, getUserCurrentPlanWorkouts } from "@/lib/data";

import Card from "@/app/ui/Card";
import NextWorkout from "@/app/ui/exercises/NextWorkout";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";

import { Plan, PlanDay, WorkoutImage } from "@/lib/definitions";
import CheckIcon from "@/components/utils/icons/CheckIcon";

export default async function ExercisesPage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations("Workout");
  const plan = await getUserCurrentPlan(locale) as Plan;

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }

  const workingDayData= plan.workingDays?.find(({ current_day }) => current_day) as PlanDay;
  const workingDaySelected = plan.current_day ?? 1;

  const excercises = await getUserCurrentPlanWorkouts(locale, workingDaySelected);
  
  if (!excercises) {
    return null;
  }

  return (
    <>
      <NextWorkout
        body_zones={plan.body_zones}
        workingDay={workingDayData}
        t={t}
        className="w-full"
        style={{marginTop: '5rem'}}
        noLink
      />
      <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical w-full">
        { excercises?.map(({ id, name, image_banner, tags, sets, reps, weight, weight_unit, time, time_unit, completed, completed_at }, i, excercises) => (
          <li key={`exercise${id}`} style={{'--timeline-row-start': 'calc(50% - 1.25rem / 2)'} as React.CSSProperties }>
            <hr className={clsx(
              excercises?.[i - 1] && tags.some(([name, type]) => name === 'stretching' && type === 'muscle') && 'bg-primary',
              (!i || excercises?.[i - 1] && !tags.some(([name, type]) => name === 'stretching' && type === 'muscle')) && 'hidden',
            )} />
            <div className="timeline-middle">
              {completed ? (
                <div className="tooltip tooltip-right z-[2]" data-tip={completed_at}>
                  <CheckCircleIcon className="size-5 text-success" />
                </div>
              ) : <RocketLaunchIcon className="size-5 text-neutral" />}
            </div>
            <Card className="relative min-h-24 timeline-end mb-3 overflow-hidden">
              <Link href={`/exercises/run#slide${id}`} className="grid items-end justify-start w-full h-full z-[1] font-semibold">
                { name }
                <span className="text-xs font-medium">
                  { sets && reps && `${ sets }x${ reps }x${ weight } ${ weight_unit }`}
                  { time && time_unit && `${ time } ${ time_unit }`}
                </span>
              </Link>
              <ImageWorkout
                image={image_banner?.[0] as WorkoutImage}
                width={100}
                height={100}
                className="absolute inset-0 w-full h-full object-cover object-right"
                style={{ maskImage: "linear-gradient(to left, black -100%, transparent)"}}
              />
              { completed && (
                <div className="grid items-center justify-end absolute inset-0 w-full h-full bg-success/60 z-[1] p-4">
                  <CheckIcon className="size-10" />
                </div>
              )}
            </Card>
            <hr className={clsx(
              excercises?.[i + 1] && tags.some(([name, type]) => name === 'stretching' && type === 'muscle') && 'bg-primary',
              (excercises.length - 1 === i || excercises?.[i + 1] && !tags.some(([name, type]) => name === 'stretching' && type === 'muscle')) && 'hidden'
            )} />
          </li>
        ))}
      </ul>
      <Link
        href={`/exercises/run`}
        className="btn btn-primary w-full"
      >Start</Link>
    </>
  )
}