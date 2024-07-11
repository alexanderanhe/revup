import { getUserCurrentPlan, getUserPlanDays } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { HomeModernIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "@/navigation";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import RatingStar from "../utils/RatingStar";

import { User } from "next-auth";
import { Plan } from "@/lib/definitions";

const START_DAY = 0;

export default async function CurrentPlan({ user, locale }: { user?: User, locale: string}) {
  if (!user) {
    return null;
  }
  const t = await getTranslations("Workout");
  const plan = await getUserCurrentPlan(user, locale) as Plan;

  if (!plan) {
    return <div>NO HAY NADA</div>;
  }
  const days = await getUserPlanDays(user, plan, locale);
  const [ difficulty, _, difficultyValue ] = plan.tags?.find(([_, type]) => type === 'difficulty') ?? ['-', '', '0'];
  const [ place ] = plan.tags?.find(([_, type]) => type === 'place') ?? ['-'];

  return (
    <>
      <Card className="collapse-title">
        <section className="grid grid-cols-[1fr_auto] place-items-center w-full">
          <div className="grid grid-rows-auto gap-1 place-items-start w-full">
            <strong>{ plan.name }</strong>
            <div className="flex flex-wrap gap-4 text-xs max-sm:gap-1 uppercase">
              <div className="flex gap-2">
                <HomeModernIcon className="size-3 text-primary" />
                <span>{ place }</span>
              </div>
              <div className="flex gap-2">
                <RatingStar
                  name={plan.id}
                  stars={~~difficultyValue}
                  size="xs"
                  // disabled
                />
                <span>{ difficulty}</span>
              </div>
            </div>
            <span className="text-xs">
              { t("planDetailsDays", { days: plan.days }) }
              { " " }
              ({ t("planDetailsSets", { sets: plan.sets_per_week }) })</span>
          </div>
          <ProgressCircle type="success" progress={Math.round(Math.random() * 100)} />
        </section>
      </Card>
      <div className="w-full h-[50svh] overflow-y-auto space-y-1 py-2">
        <div className="font-semibold">{ t("nextTraining") }</div>
        <ul className="grid grid-cols-1 gap-2 w-full">
          { days?.map(({ day, ...workingDay}, index) => (
            <Card key={`day${day}`} className="w-full">
              { typeof workingDay.completed !== 'undefined' ? (
                <Link
                  href={`/workout`}
                  className="flex gap-3 w-full"
                >
                  <Day
                    title={t("planDetailsDay", { day })}
                    body_zone={plan.body_zones?.[index % plan.body_zones.length]}
                    progress={0}
                  />
                </Link>
              ) : (
                <div className="flex gap-3 opacity-40 cursor-not-allowed">
                   <Day
                    title={t("planDetailsDay", { day })}
                    type={0 > 80 ? 'success' : 'error'}
                    body_zone={plan.body_zones?.[index % plan.body_zones.length]}
                    progress={0}
                    icon={<LockClosedIcon className="size-5" />}
                  />
                </div>
              )}
            </Card>
          ))}
        </ul>
      </div>
    </>
  )
}

type DayProps = {
  title: string;
  body_zone?: string;
  progress: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
}
const Day = ({ title, body_zone, ...rest}: DayProps) => {

  return (
    <>
      <div className="flex flex-col justify-center font-medium w-full">
        <span className="text-xs">{ title }</span>
        <span className="font-semibold [&::first-letter]:uppercase">
          { body_zone ?? '-'}
        </span>
      </div>
      <ProgressCircle {...rest} />
    </>
  )
}