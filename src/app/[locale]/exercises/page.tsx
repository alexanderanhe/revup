import { getTranslations } from "next-intl/server";
import { RocketLaunchIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { getUserCurrentPlan, getUserCurrentPlanWorkouts } from "@/lib/data";
import { cn } from "@/lib/utils";

import Card from "@/app/ui/Card";
import NextWorkout from "@/app/ui/exercises/NextWorkout";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import CheckIcon from "@/components/utils/icons/CheckIcon";
import ExerciseButton from "@/app/ui/exercises/ExerciseButton";

import { Plan, PlanDay, WorkoutImage } from "@/lib/definitions";
import StartButton from "@/app/ui/exercises/StartButton";
import { DumbbellIcon } from "lucide-react";

const stretchingTags = ['stretching', 'estiramiento'];

export default async function ExercisesPage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations("Workout");
  const tExercises = await getTranslations("Exercises");
  const plan = await getUserCurrentPlan(locale) as Plan;

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }

  const workingDayData= plan.workingDays?.find(({ current_day }) => current_day) as PlanDay;
  const workingDaySelected = plan.current_day ?? 1;

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
        { exercises?.map(({ id, name, image_banner, tags, sets, reps, weight, weight_unit, time, time_unit, completed, completed_at }, i, exercises) => {
          const isStretchtingTag = tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          const isPrevStretchtingTag = exercises?.[i - 1]?.tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          const isPrevCompleted = exercises?.[i - 1]?.completed;
          const isNextStretchtingTag = exercises?.[i + 1]?.tags.some(([name, type]) => stretchingTags.includes(name) && type === 'muscle');
          return (
            <li key={`exercise${id}`} style={{'--timeline-row-start': 'calc(50% - 1.25rem / 2)'} as React.CSSProperties }>
              <hr className={cn(
                exercises?.[i - 1] && isStretchtingTag && 'bg-secondary',
                (!isPrevStretchtingTag || !isStretchtingTag) && !isPrevCompleted && 'bg-base-300',
                (!isPrevStretchtingTag || !isStretchtingTag) && isPrevCompleted && 'bg-success',
                !i && "hidden"
              )} />
              <div className="timeline-middle">
                {completed ? (
                  <div className="tooltip tooltip-right z-[2]" data-tip={completed_at}>
                    <CheckCircleIcon className="size-7 text-success" />
                  </div>
                ) : (
                  <div className={cn(
                    "grid place-items-center rounded-full size-7",
                    !isStretchtingTag && 'bg-base-300 text-base-300-content',
                    isStretchtingTag && 'bg-secondary text-secondary-content',
                  )}>
                    <DumbbellIcon className="size-3" />
                  </div>
                )}
              </div>
              <Card className="relative w-full min-h-24 timeline-end mb-3 overflow-hidden">
                <ExerciseButton
                  name={name}
                  sets={sets}
                  reps={reps}
                  weight={weight}
                  weight_unit={weight_unit}
                  time={time}
                  time_unit={time_unit}
                  id={id}
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
                exercises?.[i + 1] && isStretchtingTag && 'bg-secondary',
                (!isNextStretchtingTag || !isStretchtingTag) && !completed && 'bg-base-300',
                (!isNextStretchtingTag || !isStretchtingTag) && completed && 'bg-success',
                exercises.length - 1 === i && "hidden"
              )} />
            </li>
          )
        })}
      </ul>
      <StartButton exercises={exercises} translate={{
        start: tExercises("startBtn")
      }} />
      <div />
    </>
  )
}