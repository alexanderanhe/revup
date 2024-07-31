'use client'

import { cn } from "@/lib/utils"
import { ClockIcon, LockClosedIcon } from "@heroicons/react/24/solid"
import { toast } from "sonner"
import CheckIcon from '@/components/utils/icons/CheckIcon';

import ProgressCircle from "@/app/ui/utils/ProgressCircle"
import { jersey10 } from "@/app/ui/fonts"
import { FormState, WorkoutComplexParameters } from "@/lib/definitions"
import { useEffect, useState } from "react"

type MetricsProps = WorkoutComplexParameters & {
  completed: boolean;
  startRest?: boolean;
  setStartRest?: (value: boolean) => void;
} & Omit<FormState, 'form'>

export default function Metrics({sets, sets_done, time, time_done, reps, rest, time_unit, weight, weight_unit, completed, startRest, setStartRest, handleForm}: MetricsProps) {
  const progress = Math.trunc((sets 
    ? (sets_done ?? 0) / sets
    : (time_done ?? 0) / time) * 100);
  const progressText = sets
    ? `${ sets_done ?? 0 } / ${ sets }`
    : `${ time_done ?? 0 } / ${ time }`;

  return (
    <div className="full-width bg-gradient-to-t from-base-100 w-full">
      <div className="flex flex-wrap xs:gap-2 w-full max-w-screen-sm mx-auto">
        {!completed && <Timer time={rest ?? 60} startRest={startRest} setStartRest={setStartRest} />}
        <button
          disabled={completed}
          onClick={handleForm('reps', reps)}
          className={cn("btn btn-ghost size-[70px] rounded-full p-0", !reps && "hidden")}
        >
          <Metric
            title={`${reps}`}
            subtitle={"reps"}
            type={"info"}
            className={cn(!reps && "hidden")}
          />
        </button>
        <button
          disabled={completed}
          onClick={handleForm('weight', weight)}
          className={cn("btn btn-ghost size-[70px] rounded-full p-0", !weight && "hidden")}
        >
          <Metric
            title={`${weight}`}
            subtitle={weight_unit}
            type={"info"}
          />
        </button>
        <Metric
          title={progressText}
          progress={progress}
          subtitle={!!reps ? "sets" : time_unit }
          type={completed ? "neutral" : ( progress > 0 ? "info" : "neutral" )}
        />
        { completed && <div className="flex grow justify-end size-[70px] rounded-full">
          <CheckIcon className="size-20 drop-shadow-xl text-success" />
        </div>}
      </div>
    </div>
  )
}

type MetricProps = {
  title?: string;
  subtitle?: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'accent';
  progress?: number;
  tooltip?: string;
  className?: string;
}
const CIRCLE_SIZE = 70;

function Metric({ title, subtitle, type, progress, tooltip, className }: MetricProps) {
  return (
    <div className={cn(!!tooltip && "tooltip tooltip-top", className)} data-tip={tooltip}>
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
      setTime([0, startTime ?? 60]);
      setIsRunning(true);
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
      type={time[0] ? "error": "accent"}
      progress={isRunning ? Math.trunc((time[1]) / startTime * 100) : 0}
      tooltip={disabled ? "Solo para usuarios premium" : ""}
      className="grow"
    />
  )
}