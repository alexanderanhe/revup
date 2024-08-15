'use client'

import { useTranslations } from 'next-intl';
import { HouseIcon, DumbbellIcon, TreeDeciduousIcon } from "lucide-react";

import Card from "@/app/ui/Card";
import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import RatingStar from "@/app/ui/utils/RatingStar";
import ImageWorkout from "@/app/ui/utils/ImageWorkout";

import { Plan, WorkoutImage } from "@/lib/definitions";
import { cn } from '@/lib/utils';

type PlanItemProps = {
  plan: Plan;
};

const Icons = {
  home: HouseIcon,
  gym: DumbbellIcon,
  outdoor: TreeDeciduousIcon
};

export default function PlanItem({ plan }: PlanItemProps) {
  const t = useTranslations('Workout');
  const [ difficulty, _, difficultyValue ] = plan.tags?.find(([_, type]) => type === 'difficulty') ?? ['-', '', '0'];
  const [ place ] = plan.tags?.find(([_, type]) => type === 'place') ?? ['-'];
  const progress = plan?.progress ?? 0;
  const workout_days_done = plan?.workout_days_done ?? 0;

  return (
    <Card className="collapse-title text-neutral-content bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary z-[1] opacity-40"></div>
      <section className="grid grid-cols-[1fr_auto] grid-rows-auto items-center justify-start gap-1 [&>strong]:uppercase [&>strong]:line-clamp-2 w-full z-[1]">
        <strong className={cn(
          "col-span-2 text-base text-left",
          !!plan.days && "sml:col-span-1"
        )}>{ plan.name }</strong>
        { !!plan.days && <ProgressCircle
          type="success"
          progress={progress}
          icon={`${workout_days_done}/${plan.days}`}
          className="hidden sml:block sm:row-span-2"
        />}
        <div className="grid col-span-2 sm:col-span-1 grid-rows-auto gap-1 place-items-start text-xs font-medium w-full">
          <div className="flex flex-col gap-1 max-sml:gap-1">
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1">
                <Icons.home className="size-3" />
                <span className="hidden sml:block [&::first-letter]:capitalize">{ t("forPlace", { place }) }</span>
                <span className="sml:hidden [&::first-letter]:capitalize">{ place }</span>
              </div>
              <div className="flex gap-1">
                <RatingStar
                  name={plan.id}
                  stars={~~difficultyValue}
                  size="xs"
                  color="neutral-content"
                />
                <span className="[&::first-letter]:capitalize">{ difficulty }</span>
              </div>
            </div>
          </div>
          { !!plan.days && (
            <div className="flex flex-wrap text-[0.7rem] text-primary w-full gap-1">
              <span className="hidden sml:block">{ t("planDetailsDays", { days: plan.days }) }</span>
              <span className="sml:hidden">{ t("days", { days: plan.days }) }</span>
              <span>({ t("planDetailsSets", { sets: plan.sets_per_week }) })</span>
            </div>
          )}
          <span>{ t("workoutsDone", { workout_days_done: plan?.workouts_done ?? 1 }) }</span>
        </div>
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
  )
}