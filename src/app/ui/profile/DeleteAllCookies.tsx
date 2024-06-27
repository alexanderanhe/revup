// handleDeleteCookies

'use client'

import { handleDeleteCookies } from "@/lib/actions"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../utils/SubmitButton";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";

type DeleteAllCookiesProps = {
  title: string;
}

export default function DeleteAllCookies({ title }: DeleteAllCookiesProps) {
  const [ formState, formAction ] = useFormState(handleDeleteCookies, null);

  useEffect(() => {
    if (formState === 'done') {
      redirect(PAGES.HOME)
    }
  }, [formState]);
  return (
    <form action={formAction}>
      <SubmitButton className="btn btn-ghost w-full">
        <TrashIcon className="size-5 text-primary" />
        <span className="grow flex justify-start">{ title }</span>
        <ArrowRightIcon className="size-5" />
      </SubmitButton>
    </form>
  )
}