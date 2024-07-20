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

  useEffect(() => {
    const nTitle = (currExercise ? titles?.[currExercise] : null) || defaultTitle || titles?.[ids[0]];
    document.title = nTitle;
    setCountingTitle(currExercise && titles?.[currExercise] ? `${ids.indexOf(currExercise) + 1}/${total}` : '');
    setTitle(nTitle);
  }, [currExercise, ids, total]);

  return (
    <>
    { countingTitle }
    { " " }
    <span className="[&::first-letter]:uppercase ml-1">{ title }</span>
    </>
  )
}