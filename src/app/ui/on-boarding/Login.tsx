'use client'

import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { handleOnboarding } from "@/lib/actions";
import AuthPanel from "@/app/ui/auth/AuthPanel";

type LoginProps = {
  buttonClass?: string;
  buttonText?: string;
  submit?: boolean;
  handleNext: () => void;
};

export default function Login({ buttonClass, buttonText, submit, handleNext }: LoginProps) {
  const { pending } = useFormStatus();
  const {data: session, status} = useSession();

  return (
    <Fragment>
      <section className="flex justify-start items-center [&>p]:text-center [&>p]:text-lg gap-4 p-4">
        <AuthPanel modal="signIn" />
      </section>
      <footer className="grid grid-cols-1 place-items-center gap-2 pb-10">
        { status === "authenticated"
          ? <button type="button" onClick={handleNext} className="btn btn-success w-full">Continuar con {session?.user?.email}</button>
          : (
          <Fragment>
            { submit ? (
              <form action={handleOnboarding} className="w-full">
                <input type="hidden" name="onboarding" value="1" />
                <input type="hidden" name="next" value="/home" />
                <button type="submit" disabled={pending} className={ buttonClass }>{ buttonText }</button>
              </form>
            ) : (
              <button type="button" onClick={handleNext} className={ buttonClass }>{ buttonText }</button>
            )}
            <p className="text-center">
              {'Al continuar acepta los '}
              <Link href="/terms-of-service" className="text-center text-blue-500">Terminos y condiciones</Link>
              {' de la aplicación.'}
            </p>
          </Fragment>
        )}
        
      </footer>
    </Fragment>
  )
}