'use client'

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Info, CircleXIcon } from "lucide-react";

import SubmitButton from "@/app/ui/utils/SubmitButton";
import { handleSendNotification } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function SendNotification() {
  const [ formState, formAction ] = useFormState(handleSendNotification, null);
  const defaultIcon = `${window.location.origin}/images/icons/icon-152x152.png`;

  useEffect(() => {
  }, [formState]);

  return (
    <form action={formAction} className="grid gap-2 w-full max-w-xs mx-auto">
      <input type="text" name="user_id" placeholder="user ID*" className="input input-bordered w-full" required />
      <input type="text" name="name" placeholder="Title*" className="input input-bordered w-full" />
      <input type="text" name="message" placeholder="Message*" className="input input-bordered w-full" required />
      <input type="text" name="icon" placeholder="Icon" className="input input-bordered w-full" defaultValue={defaultIcon} />
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