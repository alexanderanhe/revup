'use client'

import { WorkoutComplexParameters } from '@/lib/definitions';
import dynamic from 'next/dynamic';
import { jersey10 } from '@/app/ui/fonts';
import clsx from 'clsx';

const NoSSR = dynamic(() => import('@/app/ui/utils/CustomCircularSlider'), { ssr: false })

type CircularSliderControlsProps = {
  workout_complex: WorkoutComplexParameters;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function CircularSliderControls({ workout_complex, disabled, children }: CircularSliderControlsProps) {
  return (
    <div className={clsx(
      "flex items-center justify-center gap-4 w-full", 
      `[&>div>div:nth-child(2)>div:nth-child(2)>code]:${jersey10.className}`,
      `[&>div>svg>circle]:fill-primary/20`,
    )}>
      { workout_complex.reps && (
        <>
          <NoSSR
            label="Reps"
            data={Array.from({ length: Math.abs(workout_complex?.reps * 1.5) }, (_, i) => `${i + 1}`)}
            dataIndex={~~(workout_complex?.reps ?? 1) - 1}
            append="x"
            disabled={disabled}
            interval={1}
            name="reps"
          />
          <NoSSR
            label="Weight"
            data={Array.from({ length: Math.abs(workout_complex?.weight / 5 * 1.5) }, (_, i) => `${(i + 1) * 5}`)}
            dataIndex={~~(workout_complex?.weight ?? 25) / 5 - 1}
            append={workout_complex?.weight_unit}
            interval={5}
            disabled={disabled}
            name="weight"
          />
        </>
      )}
      { workout_complex.time && (
        <NoSSR
          label="Time"
          data={Array.from({ length: Math.abs(workout_complex?.time * 1.5) }, (_, i) => `${i + 1}`)}
          dataIndex={~~(workout_complex?.time ?? 1) - 1}
          append={workout_complex?.time_unit?.substring(0, 1)}
          disabled={disabled}
          interval={1}
          name="time"
        />
      )}
      { children }
    </div>
  )
}