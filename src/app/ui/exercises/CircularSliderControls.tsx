'use client'

import { WorkoutComplexParameters } from '@/lib/definitions';
import dynamic from 'next/dynamic';
import { jersey10 } from '@/app/ui/fonts';
import clsx from 'clsx';

const NoSSR = dynamic(() => import('@/app/ui/utils/CustomCircularSlider'), { ssr: false })

type CircularSliderControlsProps = {
  workout_complex: WorkoutComplexParameters;
  disabled?: boolean;
}

export default function CircularSliderControls({ workout_complex, disabled }: CircularSliderControlsProps) {
  return (
    <div className={clsx(
      "flex items-center justify-center gap-4", 
      `[&>div>div:nth-child(2)>div:nth-child(2)>code]:${jersey10.className}`,
      !disabled && `[&>div>svg>circle]:fill-primary/10`,
      disabled && `[&>div>svg>circle]:fill-neutral/10`
    )}>
      { workout_complex.reps && (
        <>
          <NoSSR
            name="reps"
            label="reps"
            data={Array.from({ length: Math.abs(workout_complex?.reps * 1.5) }, (_, i) => `${i + 1}`)}
            dataIndex={~~(workout_complex?.reps ?? 1) - 1}
            append="x"
            interval={1}
            disabled={disabled}
          />
          <NoSSR
            name="weight"
            label="weight"
            data={Array.from({ length: Math.abs(workout_complex?.weight / 5 * 1.8) }, (_, i) => `${(i + 1) * 5}`)}
            dataIndex={~~(workout_complex?.weight ?? 25) / 5 - 1}
            append={workout_complex?.weight_unit}
            interval={5}
            disabled={disabled}
          />
        </>
      )}
      { workout_complex.time && (
        <NoSSR
          name="time"
          label="time"
          data={Array.from({ length: Math.abs(workout_complex?.time * 2) }, (_, i) => `${i + 1}`)}
          dataIndex={~~(workout_complex?.time ?? 1) - 1}
          append={workout_complex?.time_unit}
          interval={1}
          disabled={disabled}
        />
      )}
    </div>
  )
}