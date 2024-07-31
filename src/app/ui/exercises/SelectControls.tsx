'use client'

import { FormState, WorkoutComplexParameters } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { jersey10 } from '../fonts';

type SelectControlsProps = {
  workout_complex: WorkoutComplexParameters;
  disabled: boolean;
} & FormState

export default function SelectControls({ workout_complex, disabled, ...form }: SelectControlsProps) {
  const hasReps = workout_complex.reps;
  const hasWeight = workout_complex.weight;
  const hasTime = workout_complex.time;

  return (
    <div className={cn(
      "grid place-items-center w-full",
      hasReps && hasWeight && !hasTime && "grid-cols-2 gap-3",
    )}>
      { hasReps && (
        <RepsControl
          reps={workout_complex.reps}
          weight={workout_complex.weight}
          weight_unit={workout_complex.weight_unit}
          disabled={disabled}
          {...form}
        />
      )}
      { hasTime && (
        <TimeControl
          time={workout_complex.time}
          time_unit={workout_complex.time_unit}
          disabled={disabled}
          {...form}
        />
      )}
    </div>
  )
}

function RepsControl({ reps, weight, weight_unit, disabled, ...formState }: { reps: number, weight: number, weight_unit: string, disabled: boolean } & FormState) {
  const dataReps = Array.from({ length: Math.abs(reps * 2) }, (_, i) => `${i + 1}`);
  // const dataIndexReps = ~~(reps ?? 1) - 1;
  const dataWeight = Array.from({ length: Math.abs(weight / 5 * 3) }, (_, i) => `${(i + 1) * 5}`);
  // const dataIndexWeight = ~~(weight ?? 25) / 5 - 1;

  return (
    <>
      <Select
        name="reps"
        data={dataReps}
        unit={"x"}
        disabled={disabled}
        {...formState}
      />
      { weight && (
        <Select
          name="weight"
          data={dataWeight}
          unit={weight_unit}
          disabled={disabled}
          {...formState}
        />
      )}
    </>
  )
}

function TimeControl({ time, time_unit, disabled, ...formState }: { time: number, time_unit: string, disabled: boolean } & FormState) {
  const data = Array.from({ length: Math.abs(time * 2) }, (_, i) => `${i + 1}`);
  // const dataIndex = ~~(time ?? 1) - 1;
  return (
    <Select
      name="time"
      data={data}
      unit={time_unit}
      disabled={disabled}
      {...formState}
    />
  )
}

type SelectProps = {
  name: string;
  data: string[];
  unit?: string;
  disabled: boolean;
} & FormState;

function Select({name, data, unit, form, handleForm, ...props}: SelectProps) {
  return (
    <select
      name={name}
      value={form[name]}
      defaultValue={form[name]?? ""}
      onChange={(e) => handleForm(name, e.target.value)()}
      className={`select select-ghost focus:select-primary w-full text-2xl max-w-xs ${jersey10.className}`}
      required
      {...props}
    >
      <option disabled value="">{name} ({ unit })</option>
      { data.map((value, index) => (
        <option key={index} value={value}>{value} {unit}</option>
      ))}
    </select>
  )
}