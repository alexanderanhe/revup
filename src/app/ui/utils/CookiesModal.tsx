'use client'

import { useEffect } from "react";
import { handleAcceptCookies } from "@/lib/actions";
import { PAGES } from "@/lib/routes";
import { Link, usePathname } from "@/navigation";
import { useFormState } from "react-dom";
import HeartIcon from "@/components/utils/icons/HeartIcon";
import CookiesIcon from "@/components/utils/icons/CookiesIcon";
import SubmitButton from "@/app/ui/utils/SubmitButton";
import { XMarkIcon } from "@heroicons/react/24/solid";

type CookiesModalProps = {
  message: string;
  privacyPolicyBtn: string;
  aceptBtn: string;
}

export default function CookiesModal({message, privacyPolicyBtn, aceptBtn}: CookiesModalProps) {
  const [ formState, formAction ] = useFormState(handleAcceptCookies, null);
  const pathname = usePathname()

  const handleClose = () => {
    const cookiesModal = document.getElementById('cookiesModal')
    cookiesModal && (cookiesModal as any).close()
  }

  useEffect(() => {
    const cookiesModal = document.getElementById('cookiesModal')
    cookiesModal && (cookiesModal as any).showModal()
  }, [])

  useEffect(() => {
    formState === 'done' && handleClose()
  }, [formState])

  if (pathname === PAGES.COOKIES) {
    return
  }

  return (
    <dialog className="modal modal-bottom" id="cookiesModal">
      <div className="modal-box card w-full max-w-3xl mx-auto bg-base-200 overflow-visible p-0 pb-4">
        <div className="absolute top-0 left-[50%] -translate-x-1/2 -translate-y-1/2 text-4xl">
          <CookiesIcon className="w-16 h-16 text-primary" />
        </div>
        <div className="card-body p-10 pb-0">
          <p>
            { message }
            { ' ' }
            <HeartIcon className="w-6 h-6 text-primary inline opacity-80" />
          </p>
          { formState ?? '' }
          <button type="button" className="btn btn-ghost absolute top-0 right-0" onClick={handleClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form action={formAction} className="modal-action flex flex-row-reverse grow items-center justify-between m-0 p-4">
          <SubmitButton className="btn btn btn-primary btn-sm w-24">
            { aceptBtn }
          </SubmitButton>
          <Link href={PAGES.COOKIES} className="btn btn-ghost">{ privacyPolicyBtn }</Link>
        </form>
      </div>
    </dialog>
  )
}