'use client'

import { useCallback, useEffect, useState } from "react";

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const [ title, setTitle ] = useState<string>("")
  const [ countingTitle, setCountingTitle ] = useState<string>("")
  const ids = Object.keys(titles);
  const total = ids.length;
  
  const handleUrlChange = useCallback(() => {
    const hash = window.location.hash.replace(/^#slide/i, "");
    console.log(hash);
    const findIndex = ids.indexOf(hash) + 1;
    const nTitle = titles?.[hash] || defaultTitle || titles?.[ids[0]];
    document.title = nTitle;
    setCountingTitle(titles?.[hash] ? `${findIndex || 1}/${total}` : '');
    setTitle(nTitle);
  }, [window.location.hash]);

  useEffect(() => {
    handleUrlChange();
    
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [ids, total, useCallback]);

  return (
    <>
    { countingTitle }
    { " " }
    <span className="[&::first-letter]:uppercase ml-1">{ title }</span>
    </>
  )
}