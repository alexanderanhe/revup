'use client'

// import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Link, useRouter } from "@/navigation";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { MultipleLoginModal } from "@/app/ui/auth/AuthPanel";
import { useEffect } from "react";
import Welcome from './images/welcome';

type WelcomeBackProps = {
  setModal: (modal: MultipleLoginModal) => void;
}

export default function WelcomeBack({ setModal }: WelcomeBackProps) {
  // const { data: session } = useSession();
  const t = useTranslations("auth");

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 h-full pb-4">
      <div className="flex flex-col items-center justify-between gap-4">
        <Welcome className="text-primary w-full max-w-64" />
        <div className="flex flex-col grow gap-1 text-center">
          <h4 className="text-lg font-black">{ t("welcome", { firstname: ''/*session?.user?.name */ }) }</h4>
          <p>{ t("welcomeSubtitle") }</p>
        </div>
        <p className="text-center">{ t("welcomeAlreadyAuth", { email: ''/*session?.user?.email */ }) }</p>
      </div>
      <div className="flex gap-2 text-center text-sm justify-center">
        <Link href={DEFAULT_REDIRECT} className="btn btn-primary w-full">{ t("welcomeBtn") }</Link>
      </div>
    </div>
  )
}