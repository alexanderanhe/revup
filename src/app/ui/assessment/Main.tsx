
'use client'

import { useState } from "react";
import Quizz from "./Quizz";
import Thankyou from "./Thankyou";
import Welcome from "./Welcome";
import { Question } from "@/lib/definitions";

type MainProps = {
  quizz: Question[];
  translations: Record<string, string>;
}

export default function Main({ quizz, translations }: MainProps) {
  const [selected, setSelected] = useState<number>(-1);
  const [form, setForm] = useState({});

  const handleClick = () => {
    setSelected(selected + 1);
  }
  return (
    <>
      {selected < 0 && <Welcome handleStart={handleClick} /> }
      {selected >= 0 && selected <= quizz.length && <Quizz quizz={quizz} selected={selected} formState={[form, setForm]} setSelected={setSelected} translations={translations} /> }
      {selected === quizz.length + 1 && <Thankyou /> }
    </>
  )
}