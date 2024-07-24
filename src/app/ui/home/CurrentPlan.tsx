import { getUserCurrentPlan } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { HomeModernIcon } from "@heroicons/react/24/outline";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import RatingStar from "../utils/RatingStar";

import { User } from "next-auth";
import { Plan, WorkoutImage } from "@/lib/definitions";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";
import NextWorkout from "../exercises/NextWorkout";
import clsx from "clsx";

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
  const workouts_done = plan?.workouts_done ?? 0;

  return (
    <>
      <Card className="collapse-title text-neutral-content bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary z-[1] opacity-40"></div>
        <section className="grid grid-cols-[1fr_auto] place-items-center w-full z-[1]">
          <div className="grid grid-rows-auto gap-1 place-items-start w-full [&>strong]:uppercase">
            <strong>{ plan.name }</strong>
            <div className="flex flex-wrap gap-4 text-xs max-sm:gap-1 uppercase">
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
            <span className="text-primary font-medium text-xs">
              { t("planDetailsDays", { days: plan.days }) }
              { " " }
              ({ t("planDetailsSets", { sets: plan.sets_per_week }) })
            </span>
            <span className="text-xs">{ t("workoutsDone", { workouts_done }) }</span>
          </div>
          <ProgressCircle
            type="success"
            progress={progress}
            icon={`${workouts_done}/${plan.days}`}
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
      <div className="w-full overflow-y-auto space-y-1 py-2">
        <div className="font-semibold">{ t("nextTraining") }</div>
        <ul className="grid grid-cols-1 gap-2 w-full">
          { plan.workingDays?.map((workingDay) => (
            <NextWorkout
              key={`day${workingDay.day}`}
              body_zones={plan.body_zones}
              workingDay={workingDay}
              t={t}
              className={clsx(
                "indicator w-full",
                typeof workingDay.completed !== 'undefined' && 'border-2 border-primary/50',
                typeof workingDay.completed === 'undefined' && 'opacity-40 cursor-not-allowed scale-95',
              )}
            />
          ))}
        </ul>
      </div>
    </>
  )
}