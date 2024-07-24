import clsx from "clsx";
import { Link } from "@/navigation";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import ProgressCircle from "@/app/ui/utils/ProgressCircle";
import Card from "@/app/ui/Card";

import { PlanDay } from "@/lib/definitions";

type NextWorkoutProps = {
  body_zones: string[][];
  workingDay: PlanDay;
  t: any;
  noLink?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function NextWorkout({body_zones, workingDay: { day, completed, percentage, current_day}, t, noLink, ...props}: NextWorkoutProps) {
  const [body_zone] = body_zones?.[(day - 1) % body_zones.length];
  const exists = typeof completed !== 'undefined';
  console.log('NextWorkout', { day, completed, percentage, current_day, exists, noLink });

  return (
    <Card {...props}>
      { exists && !noLink ? (
        <Link
          href={`/exercises${!current_day ? '/' + day : ''}`}
          className={clsx(
            "flex gap-3 w-full",
            !current_day && 'opacity-40'
          )}
        >
          <Day
            title={t("planDetailsDay", { day })}
            type={ percentage > 80 ? 'success' : 'error' }
            body_zone={body_zone}
            progress={percentage}
          />
          { current_day && <span className="indicator-item indicator-middle badge badge-primary opacity-40 badge-xs right-4"></span>}
        </Link>
      ) : (
        <div className="flex gap-3">
          <Day
          title={t("planDetailsDay", { day })}
          type={exists && percentage > 80 ? 'success' : 'error'}
          body_zone={body_zone}
          progress={percentage}
          icon={!exists ? <LockClosedIcon className="size-5" /> : null}
        />
        </div>
      )}
    </Card>
  )
}

type DayProps = {
  title: string;
  body_zone?: string;
  progress?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
}
const Day = ({ title, body_zone, progress, ...rest}: DayProps) => {
  const progressVal = progress ?? 0;

  return (
    <>
      <ProgressCircle progress={progressVal} {...rest} />
      <div className="flex flex-col justify-center font-medium w-full">
        <span className="text-xs">{ title }</span>
        <span className="font-semibold [&::first-letter]:uppercase">
          { body_zone ?? '-'}
        </span>
      </div>
    </>
  )
}