'use client'

import { handleSetTheme } from "@/lib/actions";
import { THEMES } from "@/lib/definitions";
import { useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

const ThemeToggle = () => {
  const [ formState, formAction ] = useFormState(handleSetTheme, null);
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <form action={formAction}>
      <div className="dropdown">
        <button tabIndex={0} role="button" className="btn btn-sm m-1">
          Theme
          <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
        </button>
        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
          { THEMES.map((theme) => (
            <li key={theme}>
              <input
                type="radio"
                name="theme-dropdown"
                onClick={handleClick}
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme}
                value={theme}
              /></li>
          ))}
        </ul>
      </div>
      <SubmitButton className="btn btn-primary btn-sm w-24">
        Guardar
      </SubmitButton>
      <p>{ formState }</p>
    </form>
  )
}

export default ThemeToggle