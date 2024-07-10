'use client'

type ProgressCircleProps = {
  progress: number;
}

export default function ProgressCircle({ progress }: ProgressCircleProps) {
  const workoutProgressStyles = {
    "--value": progress,
    "--size": "3.2rem"
  } as React.CSSProperties;
  return (
    <div className="radial-progress text-sm font-semibold before:text-success" style={workoutProgressStyles} role="progressbar">
      { progress }{ '%' }
    </div>
  )
}