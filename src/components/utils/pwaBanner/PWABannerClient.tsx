'use client'

import { handleHidePWABanner } from "@/lib/actions";
import { usePathname } from "@/navigation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type PWABannerClientProps = {
  title: string;
  description: string;
  installBtn: string;
  closeBtn: string;
};
export default function PWABannerClient({
  title,
  description,
  installBtn,
  closeBtn
}: PWABannerClientProps){
  const form = useRef<HTMLFormElement>();
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<Event | null>(null);
  const p = usePathname();
  const isHome = ['/home'].includes(p);

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
        className="w-auto text-blue-500"
      />
      <div>
        <h3 className="font-bold">{ title }</h3>
        <div className="text-xs">{ description }</div>
      </div>
      <form action={handleHidePWABanner} className="flex gap-2">
        <button type="button" name="close" className="btn btn-sm" onClick={handleClose}>{ closeBtn }</button>
        <button
          id="setup_button"
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