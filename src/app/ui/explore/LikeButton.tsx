'use client'

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import clsx from "clsx";

import { handleSetWorkoutLiked } from "@/lib/actions";
import { BookmarkIcon } from "@heroicons/react/24/solid"
import SubmitButton from "@/app/ui/utils/SubmitButton";
import { Link } from "@/navigation";

type LikeButtonProps = {
  workoutId: string;
  enabled: boolean;
}

export function LikeButton({ workoutId, enabled }: LikeButtonProps) {
  const [ formState, formAction ] = useFormState(handleSetWorkoutLiked, null);
  const [ liked, setLiked ] = useState<boolean>(enabled);

  useEffect(() => {
    if (typeof formState === 'boolean') {
      setLiked(formState);
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <input type="hidden" name="workoutId" value={ workoutId } />
      <input type="hidden" name="enabled" value={ !liked ? '1' : '0' } />
      <SubmitButton className={clsx(
        "btn btn-square rounded-lg",
        liked ? "text-primary" : ""
      )}>
        <BookmarkIcon className="size-4" />
      </SubmitButton>
    </form>
  )
}


export function UnauthLikeButton() {
  return (
    <Link href="/login" className="btn btn-square rounded-lg">
      <BookmarkIcon className="size-4" />
    </Link>
  )
}