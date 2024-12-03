'use client'

// import { logOut } from "@/lib/actions"
import { ArrowLeftStartOnRectangleIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
// import { useEffect } from "react";
// import { useFormState } from "react-dom";
import SubmitButton from "../utils/SubmitButton";

type LogoutProps = {
  title: string;
}

export default function Logout({ title }: LogoutProps) {
  // const [ formState, formAction ] = useFormState(logOut, undefined);

  // useEffect(() => {
  //   if (formState === 'done') {
  //     // window.location.reload();
  //   }
  // }, [formState]);
  return (
    <form>
      <SubmitButton className="btn btn-ghost w-full">
        <ArrowLeftStartOnRectangleIcon className="size-5 text-primary" />
        <span className="grow flex justify-start">{ title }</span>
        <ArrowRightIcon className="size-5" />
      </SubmitButton>
    </form>
  )
}