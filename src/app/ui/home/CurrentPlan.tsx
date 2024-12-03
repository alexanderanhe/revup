import { getUserCurrentPlan } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

import { Plan } from "@/lib/definitions";
import NextWorkout from "@/app/ui/exercises/NextWorkout";
import CurrentPlanWorkingDays from "@/app/ui/home/CurrentPlanWorkingDays";
import PlanItem from "@/app/ui/home/PlanItem";
import { User } from "@clerk/nextjs/server";

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

  return (
    <>
      <PlanItem plan={plan} />
      <div className="w-full space-y-1 py-2">
        <div className="font-semibold">{ t("nextTraining") }</div>
        <ul id="currentPlanWorkingDays" data-scrollable="true" className="grid grid-cols-1 gap-2 w-full max-h-80 overflow-y-auto">
          { plan.workingDays?.map((workingDay) => (
            <NextWorkout
              key={`day${workingDay.day}`}
              body_zones={plan.body_zones}
              workingDay={workingDay}
              t={t}
              className={cn(
                "indicator w-full",
                workingDay.day === plan.current_day && 'border-2 border-primary/50 shadow-lg',
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