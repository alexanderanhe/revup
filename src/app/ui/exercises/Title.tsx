'use client'

import { selectExercise } from "@/lib/features/app";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
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
  const currExercise = useAppSelector(selectExercise);

  // const pathname = usePathname();
  // const hash = typeof window !== "undefined" ? window?.location.hash : "";
  
  // const handleUrlChange = useCallback(() => {
  //   const hash = window.location.hash.replace(/^#slide/i, "");
  //   const findIndex = ids.indexOf(hash) + 1;
  //   const nTitle = titles?.[hash] || defaultTitle || titles?.[ids[0]];
  //   document.title = nTitle;
  //   setCountingTitle(hash && titles?.[hash] ? `${findIndex || 1}/${total}` : '');
  //   setTitle(nTitle);
  // }, [hash]);

  // useEffect(() => {
  //   handleUrlChange();
    
  //   window.addEventListener('hashchange', handleUrlChange);
  //   return () => {
  //     window.removeEventListener('hashchange', handleUrlChange);
  //   };
  // }, [ids, total, useCallback, pathname]);

  useEffect(() => {
    if (currExercise) {
      const nTitle = titles?.[currExercise] || defaultTitle || titles?.[ids[0]];
      document.title = nTitle;
      setCountingTitle(currExercise && titles?.[currExercise] ? `${ids.indexOf(currExercise) + 1}/${total}` : '');
      setTitle(nTitle);
    }
  }, [currExercise, ids, total]);

  return (
    <>
    { countingTitle }
    { " " }
    <span className="[&::first-letter]:uppercase ml-1">{ title }</span>
    </>
  )
}