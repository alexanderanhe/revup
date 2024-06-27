'use client'

import SubmitButton from "@/app/ui/utils/SubmitButton";
import { handleHidePWABanner } from "@/lib/actions";
import { PAGES } from "@/lib/routes";
import { usePathname } from "@/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

type PWABannerProps = {
  title: string;
  description: string;
  installBtn: string;
  closeBtn: string;
};
export default function PWABanner({
  title,
  description,
  installBtn,
  closeBtn
}: PWABannerProps){
  const form = useRef<HTMLFormElement>();
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<Event | null>(null);
  const [ formState, formAction ] = useFormState(handleHidePWABanner, null);
  const p = usePathname();
  const isHome = [PAGES.HOME, PAGES.ROOT].includes(p);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!promptInstall) {
      return;
    }
    (promptInstall as any).prompt();
    handleClose();
  };

  const handleClose = () => {
    setSupportsPWA((prev) => {
      if (form.current) form.current.submit();
      return !prev;
    })
  }

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(event);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  if (!supportsPWA || !isHome) {
    return null;
  }
  return (
    <div role="alert" className="alert rounded-none">
      <Image
        src="/images/icons/icon-72x72.png"
        alt="Work out at home or at the gym"
        width={72}
        height={72}
        className="w-auto rounded-xl border-2 text-blue-500"
      />
      <div>
        <h3 className="font-bold">{ title }</h3>
        <div className="text-xs">{ description }</div>
        { formState ?? '' }
      </div>
      <form action={formAction} className="flex gap-2">
        <SubmitButton className="btn btn-sm">{ closeBtn }</SubmitButton>
        <button
          name="install"
          className="btn btn-sm btn-primary"
          aria-label="Install app"
          title="Install app"
          onClick={onClick}
        >
          { installBtn }
        </button>
      </form>
    </div>
  );
};