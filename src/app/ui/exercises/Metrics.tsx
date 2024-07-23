'use client'

import clsx from "clsx"
import { ClockIcon, LockClosedIcon } from "@heroicons/react/24/solid"

import ProgressCircle from "@/app/ui/utils/ProgressCircle"
import { jersey10 } from "@/app/ui/fonts"
import { WorkoutComplexParameters } from "@/lib/definitions"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type MetricsProps = WorkoutComplexParameters & {
  completed: boolean;
  startRest?: boolean;
  setStartRest?: (value: boolean) => void
}

export default function Metrics({sets, sets_done, time, time_done, reps, rest, time_unit, completed, startRest, setStartRest}: MetricsProps) {
  const progress = Math.trunc((sets 
    ? (sets_done ?? 0) / sets
    : (time_done ?? 0) / time) * 100);
  const progressText = sets
    ? `${ sets_done ?? 0 } / ${ sets }`
    : `${ time_done ?? 0 } / ${ time }`;

  return (
    <div className="flex gap-4 w-fit">
      {!completed && <Timer time={rest ?? 60} startRest={startRest} setStartRest={setStartRest} />}
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
    <div className={clsx(!!tooltip && "tooltip tooltip-top", className)} data-tip={tooltip}>
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

function Timer({ time: startTime, disabled, startRest, setStartRest }: { time: number, disabled?: boolean, startRest?: boolean, setStartRest?: (value: boolean) => void }) {
  const [time, setTime] = useState<[number, number]>([3, startTime ?? 60]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = () => {
    toast('Esta seguro de empezar el descanso', {
      action: {
        label: 'Aceptar',
        onClick: () => {
          setTime([3, startTime ?? 60]);
          setIsRunning(true);
        },
      }
    });
  };

  useEffect(() => {
    if (startRest) {
      handleStart();
      setStartRest && setStartRest(false);
    }
  }, [startRest]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(([ start, custom ]) => {
          if (start) {
            start--;
          } else if (custom) {
            custom--
          } else {
            setIsRunning(false);
          }
          return [start, custom];
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isRunning]);
  return (
    <Metric
      title={isRunning ? `${time[0] || time[1]}` : ''}
      subtitle={disabled ? <LockClosedIcon className="size-8" /> : (
        isRunning ? "sec" :
        <button type="button" className="p-2 rounded-full" onClick={handleStart}>
          <ClockIcon className="size-8" />
        </button>
      )}
      type={time[0] ? "error": "info"}
      progress={isRunning ? Math.trunc((time[1]) / startTime * 100) : 0}
      tooltip={disabled ? "Solo para usuarios premium" : ""}
      className="grow"
    />
  )
}