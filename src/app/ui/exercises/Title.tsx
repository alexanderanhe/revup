'use client'

import { useEffect, useState } from "react";

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const [ id, setId ] = useState<string>("")
  const ids = Object.keys(titles);
  const findIndex = ids.indexOf(id) + 1;
  const total = ids.length;

  useEffect(() => {
    setId(`${window.location.hash.substring(1)}`);
    document.title = titles?.[id] || defaultTitle || titles?.[ids[0]];
  }, [titles, defaultTitle, ids]);

  return (
    <>
    { `${findIndex || 1}/${total}`}
    { " " }
    <span className="[&::first-letter]:uppercase">{ titles?.[id] || defaultTitle || titles?.[ids[0]] }</span>
    </>
  )
}