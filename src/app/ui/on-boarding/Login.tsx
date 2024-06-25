'use client'

import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import AuthPanel from "@/app/ui/auth/AuthPanel";
import { PAGES } from "@/lib/routes";

export default function Login() {
  const {data: session, status} = useSession();
  return (
    <Fragment>
      <section className="flex justify-start items-center [&>p]:text-center [&>p]:text-lg gap-4 p-4">
        <AuthPanel modal="signUp" />
      </section>
      <footer className="grid grid-cols-1 place-items-center gap-2 pb-10">
        { status !== "authenticated"
          && <Link href={PAGES.HOME} className="btn btn-info btn-outline w-full uppercase" replace>Skip</Link>
        }
        
      </footer>
    </Fragment>
  )
}