'use client'

import clsx from "clsx";

type ProgressCircleProps = {
  progress: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
}

export default function ProgressCircle({ progress, type, icon }: ProgressCircleProps) {
  const workoutProgressStyles = {
    "--value": progress,
    "--size": "3.2rem"
  } as React.CSSProperties;
  return (
    <div className={clsx(
      "radial-progress bg-success/10 text-sm font-semibold",
      (!type || type === 'success') && "bg-success/10 before:text-success",
      type === 'success' && "bg-success/10 before:text-success",
      type === 'error' && "bg-error/10 before:text-error",
      type === 'warning' && "bg-warning/10 before:text-warning",
      type === 'info' && "bg-info/10 before:text-info",
      !progress && 'before:hidden after:hidden',
    )} style={workoutProgressStyles} role="progressbar">
      { icon ?? `${progress}%` }
    </div>
  )
}