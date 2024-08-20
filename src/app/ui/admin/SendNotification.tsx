'use client'

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { CircleCheckBigIcon, CircleXIcon, Send } from "lucide-react";

import SubmitButton from "@/app/ui/utils/SubmitButton";
import { handleSendNotification } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { User } from "@/lib/definitions";

export default function SendNotification({ users }: { users: User[] }) {
  const [ formState, formAction ] = useFormState(handleSendNotification, null);
  const origin = typeof window !== 'undefined' ? window.location.origin : "";
  const defaultIcon = `${origin}/images/icons/icon-152x152.png`;

  useEffect(() => {
  }, [formState]);

  return (
    <form action={formAction} className="grid gap-2 w-full">
      <select name="user_id" className="select select-bordered w-full" required>
        <option value="">Select user</option>
        { users.map(user => (
          <option
            key={user.id}
            value={user.id as string}
          >{ user.name?.substring(0, 20) }({ user.email })</option>
        ))}
      </select>
      <input type="text" name="name" placeholder="Title*" className="input input-bordered w-full" />
      <input type="text" name="message" placeholder="Message*" className="input input-bordered w-full" required />
      <input type="text" name="icon" placeholder="Icon" className="input input-bordered w-full" defaultValue={defaultIcon} />
      { ["success", "error"].includes(formState?.status ?? "") && (
        <div role="alert" className={cn(
          "alert shadow-lg",
          formState?.status === "success" && "alert-success",
          formState?.status === "error" && "alert-error",
        )}>
          { formState?.status === "error" ? <CircleXIcon className="size-6" /> : <CircleCheckBigIcon className="size-6" />}
          <div>
            <h3 className="font-bold">{ formState?.status }</h3>
            <div className="text-xs">{ formState?.message }</div>
          </div>
        </div>
      )}
      <SubmitButton className="btn">Enviar <Send className="size-4" /></SubmitButton>
    </form>
  )
}