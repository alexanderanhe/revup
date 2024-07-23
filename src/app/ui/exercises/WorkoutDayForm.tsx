'use client'

import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import { handleSetWorkoutItem } from "@/lib/actions"
import SubmitButton from "@/app/ui/utils/SubmitButton"

import { WorkoutComplexParameters } from "@/lib/definitions"
import CircularSliderControls from "@/app/ui/exercises/CircularSliderControls"

type WorkoutDayFormProps = {
  workout_complex: WorkoutComplexParameters;
  completed: boolean;
  day: number;
  plan_id: string;
  workout_id: string;
  slide_id: string;
  setStartRest?: (value: boolean) => void;
}

export default function WorkoutDayForm({ workout_complex, completed, day, plan_id, workout_id, slide_id, setStartRest }: WorkoutDayFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [ formStateWorkoutItem, formActionWorkoutItem ] = useFormState(handleSetWorkoutItem, null);

  const progress = Math.trunc((workout_complex.sets 
    ? (workout_complex?.sets_done ?? 0) / workout_complex.sets
    : (workout_complex?.time_done ?? 0) / workout_complex.time) * 100);
  const progressText = workout_complex?.sets
    ? `${ workout_complex?.sets_done ?? 0 } / ${ workout_complex?.sets }`
    : `${ workout_complex?.time_done ?? 0 } / ${ workout_complex?.time }`;

  useEffect(() => {
    if (formStateWorkoutItem === 'saved') {
      setStartRest && setStartRest(true);
      formRef.current?.reset();
    }
  }, [formStateWorkoutItem]);

  return (
    <section style={{ margin: 0 }}>
      <span className="font-medium text-error">{ formStateWorkoutItem === 'error' && ' - Error saving data' }</span>
      <form ref={formRef} action={formActionWorkoutItem} className="flex flex-row flex-wrap items-center justify-center gap-4 w-full">
        {/* <Metrics {...workout_complex} completed={completed} /> */}
        <input type="hidden" name="day" value={ day } />
        <input type="hidden" name="workout_id" value={ workout_id } />
        <input type="hidden" name="workout_complex_id" value={ slide_id } />
        <input type="hidden" name="plan_id" value={ plan_id } />

        <CircularSliderControls workout_complex={workout_complex} disabled={completed} />

        <SubmitButton disabled={completed} className={clsx("btn btn-primary btn-circle btn-lg", completed && "hidden")}>
          <ChevronRightIcon className="size-4" />
        </SubmitButton>
      </form>
    </section>
  )
}