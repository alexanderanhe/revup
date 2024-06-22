'use client'

import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { handleOnboarding } from "@/lib/actions";
import AuthPanel from "@/app/ui/auth/AuthPanel";
import { redirect } from "@/navigation";

type LoginProps = {
};

export default function Login() {
  const { pending } = useFormStatus();
  const {data: session, status} = useSession();
  return (
    <Fragment>
      <section className="flex justify-start items-center [&>p]:text-center [&>p]:text-lg gap-4 p-4">
        <AuthPanel modal="signIn" />
      </section>
      <footer className="grid grid-cols-1 place-items-center gap-2 pb-10">
        { status === "authenticated"
          ? <Link href="/home" className="btn btn-success w-full" replace>Continuar con {session?.user?.email}</Link>
          : (
          <Fragment>
            <Link href={'/home'} className="btn btn-info btn-outline w-full uppercase" replace>Skip</Link>
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