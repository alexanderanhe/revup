'use client'

import SubmitButton from "@/app/ui/utils/SubmitButton";
import { handleSendNotification } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Info, CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function AdminPage() {
  const [ formState, formAction ] = useFormState(handleSendNotification, null);

  useEffect(() => {

  }, [formState])
  return (
    <form action={formAction} className="grid gap-2 w-full max-w-xs mx-auto">
      <input type="text" name="user_id" placeholder="user ID*" className="input input-bordered w-full" required />
      <input type="text" name="message" placeholder="Message*" className="input input-bordered w-full" required />
      <input type="text" name="icon" placeholder="Icon" className="input input-bordered w-full" />
      <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" />
      { ["success", "error"].includes(formState?.status ?? "") && (
        <div role="alert" className={cn(
          "alert shadow-lg",
          formState?.status === "error" && "alert-error",
        )}>
          { formState?.status === "error" ? <CircleXIcon className="size-6" /> : <Info className="size-6" />}
          <div>
            <h3 className="font-bold">{ formState?.status }</h3>
            <div className="text-xs">{ formState?.message }</div>
          </div>
        </div>
      )}
      <SubmitButton className="btn">Enviar</SubmitButton>
    </form>
  )
}