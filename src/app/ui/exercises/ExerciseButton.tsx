'use client'

import { UUID } from "@/lib/definitions";
import { set_exercise } from "@/lib/features/app";
import { useAppDispatch } from "@/lib/hooks";
import { PAGES } from "@/lib/routes";
import { useRouter } from "@/navigation";

type ExerciseButtonProps = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  weight_unit?: string;
  time?: number;
  time_unit?: string;
  id: UUID;
}

export default function ExerciseButton({ name, sets, reps, weight, weight_unit, time, time_unit, id }: ExerciseButtonProps ) {
  const dispatch = useAppDispatch()
  const setExercise = (state: UUID) => dispatch(set_exercise(state));
  const router = useRouter();

  const handleSetExercise = (id: UUID) => () => {
    setExercise(id);
    router.push(`${PAGES.EXERCISES}/run`);
  }
  return (
    <button type="button" onClick={handleSetExercise(id)} className="grid items-end justify-start w-full h-full z-[1] font-semibold">
      { name }
      <span className="text-xs font-medium">
        { sets && reps && `${ sets }x${ reps }x${ weight } ${ weight_unit }`}
        { time && time_unit && `${ time } ${ time_unit }`}
      </span>
    </button>
  )
}