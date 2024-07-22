import clsx from "clsx"
import { LockClosedIcon } from "@heroicons/react/24/solid"

import ProgressCircle from "@/app/ui/utils/ProgressCircle"
import { jersey10 } from "@/app/ui/fonts"
import { WorkoutComplexParameters } from "@/lib/definitions"

type MetricsProps = WorkoutComplexParameters & {
  completed: boolean;
}

export default function Metrics({sets, sets_done, time, time_done, reps, weight, weight_unit, time_unit, completed}: MetricsProps) {
  const progress = Math.trunc((sets 
    ? (sets_done ?? 0) / sets
    : (time_done ?? 0) / time) * 100);
  const progressText = sets
    ? `${ sets_done ?? 0 } / ${ sets }`
    : `${ time_done ?? 0 } / ${ time }`;

  return (
    <div className="flex gap-4 w-fit">
      <Metric
        subtitle={<LockClosedIcon className="size-8" />}
        type="error"
        tooltip="Solo para usuarios premium"
        className="grow"
      />
      <Metric
        title={`${reps}`}
        subtitle={"reps"}
        type={"info"}
        className={clsx(!reps && "hidden")}
      />
      <Metric
        title={progressText}
        progress={progress}
        subtitle={!!reps ? "sets" : time_unit }
        type={completed ? "neutral" : ( progress > 0 ? "info" : "neutral" )}
      />
  </div>
  )
}

type MetricProps = {
  title?: string;
  subtitle?: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  progress?: number;
  tooltip?: string;
  className?: string;
}
const CIRCLE_SIZE = 70;

function Metric({ title, subtitle, type, progress, tooltip, className }: MetricProps) {
  return (
    <div className={`tooltip tooltip-top ${className}`} data-tip={tooltip}>
      <ProgressCircle
        progress={progress ?? 0}
        type={type}
        icon={
          <span className="grid grid-col-1 place-items-center gap-[1]">
            <strong className={`text-xl font-semibold ${jersey10.className}`}>{ title }</strong>
            <span>{ subtitle }</span>
          </span>
        }
        size={`${CIRCLE_SIZE}px`}
      />
    </div>
  )
}