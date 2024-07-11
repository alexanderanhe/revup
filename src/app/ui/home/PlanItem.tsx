import { Link } from "@/navigation";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";

import { Plan } from "@/lib/definitions";
import RatingStar from "../utils/RatingStar";
import { HomeModernIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
type PlanItemProps = {
  plan: Plan;
  index: number;
  t: any;
};

export default async function PlanItem({ plan, index, t }: PlanItemProps) {
  const [ difficulty, _, difficultyValue ] = plan.tags?.find(([_, type]) => type === 'difficulty') ?? ['-', '', '0'];
  const [ place ] = plan.tags?.find(([_, type]) => type === 'place') ?? ['-'];
  console.log({difficultyValue, val: ~~difficultyValue})

  return (
    <div className="collapse collapse-arrow join-item">
      <input type="radio" name="my-accordion-4" defaultChecked={!index} />
      <Card className="collapse-title">
        <section className="grid grid-cols-[1fr_auto] place-items-center w-full pr-4">
          <div className="grid grid-rows-auto gap-1 place-items-start w-full">
            <strong>{ plan.name }</strong>
            <div className="flex gap-2 text-xs max-sm:gap-1 uppercase">
              <HomeModernIcon className="size-3 text-primary" />
              <span>{ place }</span>
              <RatingStar
                name={plan.id}
                stars={~~difficultyValue}
                size="xs"
                // disabled
              />
              <span>{ difficulty}</span>
            </div>
            <span className="text-xs">{ t("planDetailsDays", { days: plan.days }) }</span>
            <span className="text-xs">({ t("planDetailsSets", { sets: plan.sets_per_week }) })</span>
          </div>
          <ProgressCircle type="success" progress={Math.round(Math.random() * 100)} />
        </section>
      </Card>
      <div className="collapse-content h-[50svh] overflow-y-auto space-y-1 px-0 py-2">
        <h4>{ t("nextTraining") }</h4>
        <ul className="grid grid-cols-1 gap-2 w-full">
          { Array.from({ length: plan.days }).map((_, index) => (
            <Card key={`day${index}`} className="w-full">
              { !index ? (
                <Link
                  href={`/workout`}
                  className="flex gap-3 w-full"
                >
                  <div className="flex flex-col justify-center font-medium w-full">
                    <span className="text-xs">{ t("planDetailsDay", { day: index + 1 }) }</span>
                    <span className="font-semibold [&::first-letter]:uppercase">
                      { plan.body_zones?.[index % plan.body_zones.length] ?? '-'}
                    </span>
                  </div>
                  <ProgressCircle type={0 > 80 ? 'success' : 'error'} progress={0} />
                </Link>
              ) : (
                <div className="flex gap-3 opacity-40 cursor-not-allowed">
                  <div className="flex flex-col justify-center font-medium w-full">
                    <span className="text-xs">{ t("planDetailsDay", { day: index + 1 }) }</span>
                    <span className="font-semibold [&::first-letter]:uppercase">
                      { plan.body_zones?.[index % plan.body_zones.length] ?? '-'}
                    </span>
                  </div>
                  <ProgressCircle progress={0} icon={<LockClosedIcon className="size-5" />} />
                </div>
              )}
            </Card>
          ))}
        </ul>
      </div>
    </div>
  )
}