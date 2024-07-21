'use client'

import CustomCircularSlider from '@/app/ui/utils/CustomCircularSlider';
import { WorkoutComplexParameters } from '@/lib/definitions';

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
          <CustomCircularSlider
            label="Reps"
            data={Array.from({ length: 10 }, (_, i) => `${i + 1}x`)}
            dataIndex={~~(workout_complex?.reps ?? 1)}
            disabled={disabled}
            name="reps"
          />
          <CustomCircularSlider
            label="Weight"
            data={Array.from({ length: 5 }, (_, i) => `${(i + 1) * 5}${workout_complex?.weight_unit}`)}
            dataIndex={~~(workout_complex?.weight ?? 25) / 5}
            disabled={disabled}
            name="weight"
          />
        </>
      )}
      { workout_complex.time && (
        <CustomCircularSlider
          label="Time"
          data={Array.from({ length: workout_complex?.time * 3 }, (_, i) => `${i + 1}${workout_complex?.time_unit}`)}
          dataIndex={~~(workout_complex?.time ?? 1) / - 1}
          disabled={disabled}
          name="time"
        />
      )}
      { children }
    </div>
  )
}