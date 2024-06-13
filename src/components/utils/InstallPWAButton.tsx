'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<Event | null>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!promptInstall) {
      return;
    }
    (promptInstall as any).prompt();
  };

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

  if (!supportsPWA) {
    return null;
  }
  return (
    <div role="alert" className="alert">
      <Image
        src="/images/icons/icon-72x72.png"
        alt="Work out at home or at the gym"
        width={72}
        height={72}
        className="w-auto text-blue-500"
      />
      <div>
        <h3 className="font-bold">Progressive Web Application disponible!</h3>
        <div className="text-xs">Instala la aplicacion en tu dispositivo.</div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-sm" onClick={() => setSupportsPWA(!supportsPWA)}>Close</button>
        <button
          id="setup_button"
          className="btn btn-sm btn-primary"
          aria-label="Install app"
          title="Install app"
          onClick={onClick}
        >
          Install
        </button>
      </div>
    </div>
  );
};