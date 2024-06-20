'use client'

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import AuthPanel from "../../../components/utils/AuthPanel";

type LoginProps = {
  buttonClass?: string;
  buttonText?: string;
  handleNext: () => void;
};

export default function Login({ buttonClass, buttonText, handleNext }: LoginProps) {
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
            <button type="button" onClick={handleNext} className={ buttonClass }>{ buttonText }</button>
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