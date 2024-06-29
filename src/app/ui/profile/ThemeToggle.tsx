'use client'

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ArrowRightIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";

import { handleSetTheme } from "@/lib/actions";
import { THEMES, User } from "@/lib/definitions";
import SubmitButton from "../utils/SubmitButton";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/solid";

type ThemeToggleProps = {
  title: string;
}

const ThemeToggle = ({ title }: ThemeToggleProps) => {
  const { data: session, update } = useSession();
  const user = session?.user as User;
  const theme = user?.info?.theme.trim();

  const [ selectedTheme, setSelectedTheme] = useState<string>(theme || 'default');
  const [ state, setState] = useState<string | null>(null);
  const [ formState, formAction ] = useFormState(handleSetTheme, null);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setSelectedTheme(target.value);

    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  const updateTheme = async () => {
    await update({
      info: {
        ...user?.info,
        theme: selectedTheme,
      },
    });
    setState(null);
  }

  useEffect(() => {
    setState(formState);
  }, [formState]);

  useEffect(() => {
    if (state === 'saved') {
      updateTheme()
    }
  }, [state]);

  useEffect(() => {
    setSelectedTheme(theme ?? 'default');
  }, [theme]);

  return (
    <form action={formAction}>
      <div className="btn btn-ghost w-full">
        <PuzzlePieceIcon className="size-5 text-primary" />
        <div className="grow flex items-center justify-start">
          { title }
          { ": " }
          <div className="dropdown flex justify-start">
            <button type="button" tabIndex={0} role="button" className="btn btn-sm m-1">
              { selectedTheme || 'default' }
              <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </button>
            <ul tabIndex={0} className="dropdown-content z-[2] p-2 shadow-2xl bg-base-300 rounded-box w-52">
              { THEMES.map((theme) => (
                <li key={theme}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    onClick={handleClick}
                    className={clsx(
                      'theme-controller btn btn-sm btn-block btn-ghost justify-start ', 
                      selectedTheme === theme && 'active'
                    )}
                    aria-label={theme}
                    value={theme}
                  /></li>
              ))}
            </ul>
          </div>
        </div>
        { theme === selectedTheme ? <ArrowRightIcon className="size-5" /> : (
          <SubmitButton className={clsx(
            "btn btn-sm",
            state === 'saved' && "btn-success"
          )}>
            { (state === 'saved' && <CheckIcon className="size-5" />) || 'Save'}
          </SubmitButton>
        )}
      </div>
    </form>
  )
}

export default ThemeToggle