import QuizzItem from "./QuizzItem"
import Section from "@/components/templates/Section"
import Stepper from "./Stepper"
import { Question } from '@/lib/definitions'
import { handleSetAssessment } from "@/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import SubmitButton from "@/app/ui/utils/SubmitButton"
import { useEffect } from "react"

type QuizzProps = {
  selected: number,
  quizz: Question[],
  formState: [any, (form: any) => void],
  setSelected: (selected: number) => void,
  translations: Record<string, string>
}

export default function Quizz ({ selected, quizz, formState: formData, setSelected, translations }: QuizzProps) {
  const [ form ] = formData;
  const [ formState, formAction ] = useFormState(handleSetAssessment, null);
  const header = <Stepper steps={quizz} selected={selected} form={form} setSelected={setSelected} />;

  // const handleSubmit = () => {
  //   setSelected(selected + 1);
  // }
  const handleChangeAnswers = () => {
    setSelected(0);
  }

  useEffect(() => {
    if (formState === 'saved') {
      setSelected(selected + 1);
    }
  }, [formState]);

  return (
    <>
      { quizz.map((question: Question, index: number) => 
        selected === index &&
          <QuizzItem
            key={`steps-${index}${question.title}`}
            q={question}
            formState={formData}
            selected={selected}
            setSelected={setSelected}
            header={header}
            translations={translations}
          />
      ) }
      { selected === quizz.length &&
        <Section title="Confirma tus respuestas" header={header} buttons={[
            <form key="nextConfirm" action={formAction}>
              { Object.entries(form).map(([key, value]) => (
                <input key={`input-${key}`} type="hidden" name={key} value={String(value)} />
              ))}
              { formState ?? ''}
              <SubmitButton className="btn btn-primary w-full">
                Confirmar
              </SubmitButton>
            </form>,
            <button
              key="nextChange"
              onClick={handleChangeAnswers}
              className="btn btn-ghost w-full"
            >
              Cambiar respuestas
            </button>
          ]}>
            { quizz.map(({ key, shortTitle, options, multiple }: Question) => 
              <div key={`results${key}`} className="[&>strong]:text-sm [&>strong]:uppercase [&>strong]:font-semibold">
                <strong>{shortTitle}</strong>
                <p>{options || multiple ? translations[`${key}:${form[key]}`] ?? 'X' : form[key]}</p>
              </div>
            ) }
        </Section>
      }
    </>
  )
}