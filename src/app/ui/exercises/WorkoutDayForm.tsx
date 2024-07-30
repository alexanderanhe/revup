'use client'

import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import { handleSetWorkoutItem } from "@/lib/actions"
import SubmitButton from "@/app/ui/utils/SubmitButton"

import { FormState, WorkoutComplexParameters } from "@/lib/definitions"
import SelectControls from "./SelectControls"

type WorkoutDayFormProps = {
  workout_complex: WorkoutComplexParameters;
  completed: boolean;
  day: number;
  plan_id: string;
  workout_id: string;
  slide_id: string;
  setStartRest?: (value: boolean) => void;
} & FormState;

export default function WorkoutDayForm({ workout_complex, completed, setStartRest, form, handleForm }: WorkoutDayFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [ formStateWorkoutItem, formActionWorkoutItem ] = useFormState(handleSetWorkoutItem, null);

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

        { Object.entries(form).filter(([name]) => !['reps', 'weight', 'time'].includes(name))
          .map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={ value } />
        ))}

        <SelectControls workout_complex={workout_complex} disabled={completed} form={form} handleForm={handleForm} />

        <SubmitButton disabled={completed} className={clsx("btn btn-primary btn-wide", completed && "hidden")}>
          Guardar <ChevronRightIcon className="size-4" />
        </SubmitButton>
      </form>
    </section>
  )
}