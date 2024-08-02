'use client'

import { Exercise, UUID } from "@/lib/definitions";
import { set_exercise } from "@/lib/features/app";
import { useAppDispatch } from "@/lib/hooks";
import { PAGES } from "@/lib/routes"
import { useRouter } from "@/navigation"
import { useEffect } from "react";

type StartButtonProps = {
  exercises: Exercise[];
  translate: {
    start?: string;
  };
}

export default function StartButton({ exercises, translate }: StartButtonProps) {
  const dispatch = useAppDispatch()
  const setExercise = (state: UUID) => dispatch(set_exercise(state));
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextExercise = exercises.find(({ completed }) => !completed);
    setExercise((nextExercise ?? exercises.at(-1))?.id as UUID);
    router.push(`${PAGES.EXERCISES}/run`);
  }

  useEffect(() => {
    router.prefetch(`${PAGES.EXERCISES}/run`);
  }, []);

  return (
    <button type="button" 
      onClick={handleClick}
      className="btn btn-primary w-full"
    >{ translate.start }</button>
  )
}