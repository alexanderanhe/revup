'use client'

import { useEffect } from "react";
import { handleAcceptCookies } from "@/lib/actions";
import { PAGES } from "@/lib/routes";
import { Link, usePathname } from "@/navigation";
import { useFormState, useFormStatus } from "react-dom";
import HeartIcon from "@/components/utils/icons/HeartIcon";
import CookiesIcon from "@/components/utils/icons/CookiesIcon";
import SubmitButton from "@/app/ui/utils/SubmitButton";

type CookiesModalProps = {
  message: string;
  privacyPolicyBtn: string;
  aceptBtn: string;
}

export default function CookiesModal({message, privacyPolicyBtn, aceptBtn}: CookiesModalProps) {
  const [ formState, formAction ] = useFormState(handleAcceptCookies, null);
  const pathname = usePathname()

  useEffect(() => {
    const cookiesModal = document.getElementById('cookiesModal')
    cookiesModal && (cookiesModal as any).showModal()
  }, [])

  if (pathname === PAGES.COOKIES) {
    return
  }

  return (
    <dialog className="modal modal-bottom" id="cookiesModal">
      <div className="modal-box card w-full max-w-96 mx-auto bg-base-200 overflow-visible p-0 pb-4">
        <div className="absolute top-0 left-[50%] -translate-x-1/2 -translate-y-1/2 text-4xl">
          <CookiesIcon className="w-16 h-16 text-primary" />
        </div>
        <div className="card-body pb-0">
          <p>
            { message }
            <HeartIcon className="w-6 h-6 text-primary inline" />
          </p>
          { formState ?? '' }
        </div>
        <div className="modal-action flex flex-row-reverse grow items-center justify-between m-0 p-4">
          <form action={formAction} method="dialog">
            <SubmitButton className="btn btn btn-primary btn-sm w-24">
              { aceptBtn }
            </SubmitButton>
          </form>
          <Link href={PAGES.COOKIES} className="btn btn-ghost">{ privacyPolicyBtn }</Link>
        </div>
      </div>
    </dialog>
  )
}