'use client'

import { selectExercise } from "@/lib/features/app";
import { useAppSelector } from "@/lib/hooks";
import { PAGES } from "@/lib/routes";
import { usePathname } from "@/navigation";
import {  useEffect, useState } from "react";

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const [ title, setTitle ] = useState<string>("")
  const [ countingTitle, setCountingTitle ] = useState<string>("")
  const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;
  const pathname = usePathname();
  const ids = Object.keys(titles);
  const total = ids.length;
  const currExercise = useAppSelector(selectExercise);

  useEffect(() => {
    setTitle(() => {
      if (pathname !== PAGES.EXERCISES && currExercise && titles?.[currExercise]) {
        setCountingTitle(`${ids.indexOf(currExercise) + 1}/${total}`);
        return capitalize(titles?.[currExercise]);
      }
      setCountingTitle(defaultTitle ? "" : `1/${total}`);
      return capitalize(defaultTitle ?? titles?.[ids[0]]);
    });
  }, [currExercise, ids, total, pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      { countingTitle }
      { " " }
      <span className="[&::first-letter]:capitalize ml-1">{ title }</span>
    </>
  )
}