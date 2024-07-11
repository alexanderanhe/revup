'use client'

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const id = window.location.hash.substring(1);
  const ids = Object.keys(titles);
  const findIndex = ids.indexOf(id) + 1;
  const total = ids.length;
  return (
    <>
    { `${findIndex || 1}/${total}`}
    { " " }
    <span className="[&::first-letter]:uppercase">{ titles?.[id] || defaultTitle || titles?.[ids[0]] }</span>
    </>
  )
}