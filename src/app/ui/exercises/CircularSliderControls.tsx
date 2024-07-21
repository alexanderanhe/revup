'use client'

import { WorkoutComplexParameters } from '@/lib/definitions';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('@/app/ui/utils/CustomCircularSlider'), { ssr: false })

type CircularSliderControlsProps = {
  workout_complex: WorkoutComplexParameters;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function CircularSliderControls({ workout_complex, disabled, children }: CircularSliderControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      { workout_complex.reps && (
        <>
          <NoSSR
            label="Reps"
            data={Array.from({ length: 10 }, (_, i) => `${i + 1}`)}
            dataIndex={~~(workout_complex?.reps ?? 1)}
            append="x"
            disabled={disabled}
            name="reps"
          />
          <NoSSR
            label="Weight"
            data={Array.from({ length: 5 }, (_, i) => `${(i + 1) * 5}`)}
            dataIndex={~~(workout_complex?.weight ?? 25) / 5}
            append={workout_complex?.weight_unit}
            disabled={disabled}
            name="weight"
          />
        </>
      )}
      { workout_complex.time && (
        <NoSSR
          label="Time"
          data={Array.from({ length: workout_complex?.time * 3 }, (_, i) => `${i + 1}`)}
          dataIndex={~~(workout_complex?.time ?? 1) / - 1}
          append={workout_complex?.time_unit}
          disabled={disabled}
          name="time"
        />
      )}
      { children }
    </div>
  )
}