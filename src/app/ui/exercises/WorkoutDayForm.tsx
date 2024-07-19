'use client'

import clsx from "clsx"

import Card from "@/app/ui/Card"
import SubmitButton from "../utils/SubmitButton"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { handleSetWorkoutItem } from "@/lib/actions"
import { UUID, WorkoutComplexParameters } from "@/lib/definitions"

type WorkoutDayFormProps = {
  workout_complex: WorkoutComplexParameters;
  completed: boolean;
  day: number;
  plan_id: string;
  workout_id: string;
  slide_id: string;
}

export default function WorkoutDayForm({ workout_complex, completed, day, plan_id, workout_id, slide_id }: WorkoutDayFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [ formStateWorkoutItem, formActionWorkoutItem ] = useFormState(handleSetWorkoutItem, null);

  useEffect(() => {
    if (formStateWorkoutItem === 'saved') {
      formRef.current?.reset();
    }
  }, [formStateWorkoutItem]);

  return (
    <>
    <section><p>
      { !!workout_complex.time && `${workout_complex.time} ${workout_complex.time_unit}` }
      { !!workout_complex.weight && `${workout_complex.weight} ${workout_complex.weight_unit}` }
      { !!workout_complex.recommendations && ` - ${workout_complex.recommendations}` }
      <span className="font-medium text-error">{ formStateWorkoutItem === 'error' && ' - Error saving data' }</span>
    </p></section>
    <section className="flex flex-row justify-between gap-4 w-full">
      <Metric
        title={`${!!workout_complex?.reps ? workout_complex.reps : "NO"}`}
        subtitle={!!workout_complex?.reps ? "reps" : ""}
        className={clsx(!workout_complex?.reps && "bg-base-200/60")}
      />
      <Metric
        title={`-`}
        subtitle={ workout_complex?.time_unit }
      />
      <Metric
        title={
          workout_complex?.sets ?
          `${ workout_complex?.sets_done ?? 0 } / ${ workout_complex?.sets }`
          : `${ workout_complex?.time_done ?? 0 } / ${ workout_complex?.time }`
        }
        subtitle={!!workout_complex.reps ? "reps" : ""}
        className={clsx(completed && "border-2 border-success bg-success/20 text-success")}
      />
    </section>
    <section>
      <form ref={formRef} action={formActionWorkoutItem} className="grid grid-cols-1 gap-2 w-full">
        <input type="hidden" name="day" value={ day } />
        <input type="hidden" name="workout_id" value={ workout_id } />
        <input type="hidden" name="workout_complex_id" value={ slide_id } />
        <input type="hidden" name="plan_id" value={ plan_id } />
        <div className="join w-full">
          { workout_complex.reps && (
            <div className="join-item grow grid grid-cols-2">
              <input className="input input-bordered rounded-r-none" name="reps" placeholder="reps" type="number" pattern="[0-9]*" inputMode="numeric" disabled={completed} required />
              <input className="input input-bordered rounded-none" name="weight" placeholder={ `${workout_complex.weight_unit}` } type="number" pattern="[0-9]*" inputMode="numeric" disabled={completed} required />
            </div>
          )}
          { workout_complex.time && (
            <div className="join-item grow grid grid-cols-1">
              <input className="input input-bordered rounded-r-none" name="time" placeholder={ `${workout_complex.time_unit}` } type="number" pattern="[0-9]*" inputMode="numeric" disabled={completed} required />
            </div>
          )}
          <SubmitButton disabled={completed} className="btn join-item rounded-r-full">
            <PlusIcon className="size-4" />
          </SubmitButton>
        </div>
      </form>
    </section>
        </>
  )
}
type MetricProps = {
  title?: string;
  subtitle?: string;
  className?: string;
}
const Metric = ({ title, subtitle, ...props }: MetricProps) => (
  <Card {...props}>
    <div className="flex gap-1 items-center justify-center size-24 w-full">
      <strong className="font-medium">{ title }</strong> { subtitle}
    </div>
  </Card>
)