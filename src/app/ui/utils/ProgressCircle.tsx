'use client'

import clsx from "clsx";

type ProgressCircleProps = {
  progress: number;
  type?: keyof typeof typeClasses;
  icon?: React.ReactNode;
  size?: string;
  className?: string;
}

export default function ProgressCircle({ progress, type, icon, size, className }: ProgressCircleProps) {
  const workoutProgressStyles = {
    "--value": progress,
    "--size": size ?? "3.2rem"
  } as React.CSSProperties;
  return (
    <div className={clsx(
      "radial-progress text-sm text-center font-semibold",
      typeClasses[type ?? 'neutral'],
      progress === 100 && 'after:hidden',
      !progress && 'before:hidden after:hidden',
      className,
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
  accent: 'bg-accent/10 before:text-accent',
}