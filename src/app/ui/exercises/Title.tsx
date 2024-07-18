'use client'

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const [ title, setTitle ] = useState<string>("")
  const [ countingTitle, setCountingTitle ] = useState<string>("")
  const pathname = usePathname();
  const ids = Object.keys(titles);
  const total = ids.length;
  const hash = typeof window !== "undefined" ? window?.location.hash : "";
  
  const handleUrlChange = useCallback(() => {
    console.log("hash", window.location.hash);
    const hash = window.location.hash.replace(/^#slide/i, "");
    const findIndex = ids.indexOf(hash) + 1;
    const nTitle = titles?.[hash] || defaultTitle || titles?.[ids[0]];
    document.title = nTitle;
    setCountingTitle(hash && titles?.[hash] ? `${findIndex || 1}/${total}` : '');
    setTitle(nTitle);
  }, [hash]);

  useEffect(() => {
    console.log("hash", window.location.hash);
    handleUrlChange();
    
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [ids, total, useCallback, pathname]);

  return (
    <>
    { countingTitle }
    { " " }
    <span className="[&::first-letter]:uppercase ml-1">{ title }</span>
    </>
  )
}