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
      "radial-progress text-sm font-semibold",
      typeClasses[type ?? 'neutral'],
      !progress && 'before:hidden after:hidden',
    )} style={workoutProgressStyles} role="progressbar">
      { icon ?? `${progress}%` }
    </div>
  )
}

const typeClasses = {
  neutral: 'bg-neutral/10 before:text-neutral',
  success: 'bg-success/10 before:text-success',
  error: 'bg-error/10 before:text-error',
  warning: 'bg-warning/10 before:text-warning',
  info: 'bg-info/10 before:text-info',
}