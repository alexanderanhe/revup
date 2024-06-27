'use client'

import { DEFAULT_REDIRECT } from "@/lib/routes";
import { Link } from "@/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { MultipleLoginModal } from "@/app/ui/auth/AuthPanel";

type WelcomeBackProps = {
  setModal: (modal: MultipleLoginModal) => void;
}

export default function WelcomeBack({ setModal }: WelcomeBackProps) {
  const { data: session } = useSession();

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 h-full pb-4">
      <div className="flex flex-col items-center justify-between gap-4">
        <Image className="w-full max-w-64" src="/images/welcome_user.svg" width={200} height={200} alt="Welcome back" />
        <div className="flex flex-col grow gap-1 text-center">
          <h4 className="text-lg font-black">Welcome, {session?.user?.name}</h4>
          <p>You are all set now, let’s reach your goals together with us</p>
        </div>
        <p className="text-center">Te has autenticado con el usuario {session?.user?.email}</p>
      </div>
      <div className="flex gap-2 text-center text-sm justify-center">
        <Link href={DEFAULT_REDIRECT} className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full">Go To Home</Link>
      </div>
    </div>
  )
}