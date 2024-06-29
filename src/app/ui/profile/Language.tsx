'use client'

import { PAGES } from "@/lib/routes";
import { Link } from "@/navigation";
import { LanguageIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type LanguageProps = {
  title: string;
  languages: {[key: string]: string};
  locale?: string;
};

type Flags = {
  [key: string]: string;
};

const FLAGS: Flags = {
  es: "🇪🇸",
  en: "🇺🇸",
}

export default function Language({ title, languages, locale }: LanguageProps) {

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <button className="btn btn-ghost w-full">
      <LanguageIcon className="size-5 text-primary" />
      <div className="grow flex items-center justify-start">
          { title }
          { ": " }
        <div className="dropdown flex justify-start">
          <div tabIndex={0} role="button" className="btn btn-sm m-1">
            { !!locale && (FLAGS[locale] ?? '') }
            { " " }
            { !!locale && (languages[locale] ?? '') }
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[2] w-52 p-2 shadow">
            {Object.keys(languages).map((lang: string) => (
              <li key={lang} onClick={handleClick}>
                <Link
                  href={`${PAGES.PROFILE}/settings`}
                  lang={lang}
                  replace
                >
                  { FLAGS[lang] ?? '' }
                  { " " }{ languages[lang] ?? '' }
                  ({ lang })
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ArrowRightIcon className="size-5" />
    </button>
  )
}