import { getTranslations } from "next-intl/server";
import { RocketLaunchIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { getUserCurrentPlan, getUserCurrentPlanWorkouts } from "@/lib/data";
import { cn } from "@/lib/utils";

import Card from "@/app/ui/Card";
import NextWorkout from "@/app/ui/exercises/NextWorkout";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import CheckIcon from "@/components/utils/icons/CheckIcon";
import HistoryButton from "@/app/ui/exercises/HistoryButton";

import { Plan, PlanDay, WorkoutImage, WorkoutImageLink } from "@/lib/definitions";
import StartButton from "@/app/ui/exercises/StartButton";
import HistoryTable from "@/app/ui/exercises/HistoryTable";

const stretchingTags = ['stretching', 'estiramiento'];

export default async function ExercisesPage({
  params: { locale, historyDay }
}: {
  params: {
    locale: string;
    historyDay: string;
  };
}) {
  const t = await getTranslations("Workout");
  const tExercises = await getTranslations("Exercises");
  const plan = await getUserCurrentPlan(locale) as Plan;

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }

  const workingDayData= plan.workingDays?.find(({ day }) => day === parseInt(historyDay)) as PlanDay;
  if (!workingDayData) {
    return <div>NO HAY NADA</div>;
  }
  const workingDaySelected = workingDayData.day;
  const exercises = await getUserCurrentPlanWorkouts(locale, workingDaySelected);
  
  if (!exercises) {
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
        { exercises?.map(({ id, workout_id, plan_id, day, name, description, images, tags, image_banner, completed, completed_at, ...workout_complex }, i, exercises) => {
          const isStretchtingTag = tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          const isPrevStretchtingTag = exercises?.[i - 1]?.tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          const isNextStretchtingTag = exercises?.[i + 1]?.tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          return (
            <li key={`exercise${id}`} style={{'--timeline-row-start': 'calc(50% - 1.25rem / 2)'} as React.CSSProperties }>
              <hr className={cn(
                exercises?.[i - 1] && isStretchtingTag && 'bg-primary',
                (!i || !isPrevStretchtingTag || !isStretchtingTag) && 'hidden',
              )} />
              <div className="timeline-middle">
                {completed ? (
                  <div className="tooltip tooltip-right z-[2]" data-tip={completed_at}>
                    <CheckCircleIcon className="size-5 text-success" />
                  </div>
                ) : <RocketLaunchIcon className="size-5 text-neutral" />}
              </div>
              <Card className="relative w-full min-h-24 timeline-end mb-3 overflow-hidden">
                <HistoryButton
                  name={name}
                  {...workout_complex}
                  completed={completed}
                  id={id}
                  workout_id={workout_id}
                  workout_complex={workout_complex}
                  history={<HistoryTable workout_id={workout_id} />}
                  image={{
                    src: ((images?.[0] as { external: WorkoutImageLink }).external?.url
                      ?? (images?.[0] as { file: WorkoutImageLink }).file?.url),
                    alt: name,
                    style: { maskImage: "linear-gradient(to bottom, black 60%, transparent)"},
                    className: "w-full h-[40svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg",
                  }}
                />
                <ImageWorkout
                  image={image_banner?.[0] as WorkoutImage}
                  width={100}
                  height={100}
                  className="absolute inset-0 w-full h-full object-cover object-right"
                  style={{ maskImage: "linear-gradient(to left, black -100%, transparent)"}}
                />
                { completed && <CheckIcon className="size-10 text-success absolute top-1/2 -translate-y-1/2 right-4" />}
              </Card>
              <hr className={cn(
                exercises?.[i + 1] && isStretchtingTag && 'bg-primary',
                (exercises.length - 1 === i || !isNextStretchtingTag || !isStretchtingTag) && 'hidden'
              )} />
            </li>
          )
        })}
      </ul>
      { plan.current_day === workingDaySelected && (
        <StartButton exercises={exercises} translate={{
          start: tExercises("startBtn")
        }} />
      )}
      <div />
    </>
  )
}