import { Link } from "@/navigation";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";

import { Plan } from "@/lib/definitions";
import RatingStar from "../utils/RatingStar";
import { HomeModernIcon } from "@heroicons/react/24/outline";
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
        <section className="grid grid-cols-[1fr_auto] max-sm:grid-cols-1 place-items-center w-full pr-4">
          <div className="grid grid-rows-auto gap-1 place-items-start w-full">
            <strong>{ plan.name }</strong>
            <div className="flex gap-2 text-xs max-sm:gap-1 max-sm:text-[0.6rem] uppercase">
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
            <span className="text-xs">
              { t("planDetails", { days: plan.days, sets: plan.sets_per_week }) }
            </span>
          </div>
          <div className="max-sm:hidden">
            <ProgressCircle progress={Math.round(Math.random() * 100)} />
          </div>
        </section>
      </Card>
      <div className="collapse-content max-h-44 space-y-2 py-2">
        <h4>{ t("nextTraining") }</h4>
        <ul className="grid grid-cols-1 w-full">
          { Array.from({ length: plan.days }).map((_, index) => (
            <Link
            key={`day${index}`}
              href={`/workout?day=${index + 1}`}
              className="join join-vertical h-12 border-base-300 border p-3"
            >
              { index + 1 }. Day { plan.body_zones?.[index % plan.body_zones.length] ?? 'PLAN'}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}