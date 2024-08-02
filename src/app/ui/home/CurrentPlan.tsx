import { getUserCurrentPlan } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import RatingStar from "../utils/RatingStar";

import { User } from "next-auth";
import { Plan, WorkoutImage } from "@/lib/definitions";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import NextWorkout from "@/app/ui/exercises/NextWorkout";
import CurrentPlanWorkingDays from "@/app/ui/home/CurrentPlanWorkingDays";

export default async function CurrentPlan({ user, locale }: { user?: User, locale: string}) {
  if (!user) {
    return null;
  }
  const t = await getTranslations("Workout");
  const plan = await getUserCurrentPlan(locale) as Plan;

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }

  if (plan.body_zones?.length === 0) {
    return <div>LOS WORKOUTS NO ESTAN CATEGORIZADOS</div>;
  }

  const [ difficulty, _, difficultyValue ] = plan.tags?.find(([_, type]) => type === 'difficulty') ?? ['-', '', '0'];
  const [ place ] = plan.tags?.find(([_, type]) => type === 'place') ?? ['-'];
  const progress = plan?.progress ?? 0;
  const workout_days_done = plan?.workout_days_done ?? 0;

  return (
    <>
      <Card className="collapse-title text-neutral-content bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary z-[1] opacity-40"></div>
        <section className="grid grid-cols-[1fr_auto] place-items-center w-full z-[1]">
          <div className="grid grid-rows-auto gap-1 place-items-start w-full [&>strong]:uppercase">
            <strong>{ plan.name }</strong>
            <div className="flex flex-col gap-1 text-xs max-sm:gap-1">
              <div className="flex flex-wrap gap-2 uppercase">
                <div className="flex gap-2">
                  <HomeModernIcon className="size-3" />
                  <span>{ t("forPlace", { place }) }</span>
                </div>
                <div className="flex gap-2">
                  <RatingStar
                    name={plan.id}
                    stars={~~difficultyValue}
                    size="xs"
                    color="neutral-content"
                    // disabled
                  />
                  <span>{ difficulty}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-primary font-medium text-xs">
                  { t("planDetailsDays", { days: plan.days }) }
                </span>
                <span className="text-primary font-medium text-xs">
                  ({ t("planDetailsSets", { sets: plan.sets_per_week }) })
                </span>
              </div>
              {/* <span className="text-xs">{ t("workoutsDone", { workout_days_done }) }</span> */}
            </div>
          </div>
          <ProgressCircle
            type="success"
            progress={progress}
            icon={`${workout_days_done}/${plan.days}`}
          />
        </section>
        <ImageWorkout
          image={{
            name: plan.name,
            type: "external",
            external: {
              url: "/images/plan.webp"
            }
          } as WorkoutImage}
          width={600}
          height={150}
          className="absolute inset-0 w-full h-full object-cover object-right rounded-lg z-[0]"
          style={{ maskImage: "linear-gradient(to left, black 200%, transparent)"}}
        />
      </Card>
      <div className="w-full space-y-1 py-2">
        <div className="font-semibold">{ t("nextTraining") }</div>
        <ul id="currentPlanWorkingDays" data-scrollable="true" className="grid grid-cols-1 gap-2 w-full max-h-72 overflow-y-auto">
          { plan.workingDays?.map((workingDay) => (
            <NextWorkout
              key={`day${workingDay.day}`}
              body_zones={plan.body_zones}
              workingDay={workingDay}
              t={t}
              className={cn(
                "indicator w-full",
                typeof workingDay.completed !== 'undefined' && 'border-2 border-primary/50',
                typeof workingDay.completed === 'undefined' && 'opacity-40 cursor-not-allowed scale-95',
              )}
            />
          ))}
          <CurrentPlanWorkingDays />
        </ul>
      </div>
    </>
  )
}