import QuizzItem from "./QuizzItem"
import Section from "@/components/templates/Section"
import Stepper from "./Stepper"
import { Question } from '@/lib/definitions'
import { handleSetAssessment } from "@/lib/actions"
import { useFormStatus } from "react-dom"

type QuizzProps = {
  selected: number,
  quizz: Question[],
  formState: [any, (form: any) => void],
  setSelected: (selected: number) => void
}

const Quizz = ({ selected, quizz, formState, setSelected }: QuizzProps) => {
  const [ form ] = formState;
  const { pending } = useFormStatus();
  const header = <Stepper steps={quizz} selected={selected} form={form} setSelected={setSelected} />;

  // const handleSubmit = () => {
  //   setSelected(selected + 1);
  // }
  const handleChangeAnswers = () => {
    setSelected(0);
  }
  return (
    <>
      { quizz.map((question: Question, index: number) => 
        selected === index &&
          <QuizzItem
            key={`steps-${index}${question.title}`}
            q={question}
            formState={formState}
            selected={selected}
            setSelected={setSelected}
            header={header}
          />
      ) }
      { selected === quizz.length &&
        <Section title="Confirma tus respuestas" header={header} buttons={[
            <form key="nextConfirm" action={handleSetAssessment}>
              { Object.entries(form).map(([key, value]) => (
                <input key={`input-${key}`} type="hidden" name={key} value={String(value)} />
              ))}
              <button
                  type="submit"
                  disabled={pending}
                  // onClick={handleSubmit}
                  className="btn btn-primary w-full"
                >
                {pending ? '...' : 'Confirmar'}
              </button>
            </form>,
            <button
              key="nextChange"
              onClick={handleChangeAnswers}
              className="btn btn-ghost w-full"
            >
              Cambiar respuestas
            </button>
          ]}>
            { quizz.map(({ key, shortTitle }: Question) => 
              <div key={`results${key}`} className="[&>strong]:text-sm [&>strong]:uppercase [&>strong]:font-semibold">
                <strong>{shortTitle}</strong>
                <p>{form[key]}</p>
              </div>
            ) }
        </Section>
      }
    </>
  )
}

export default Quizz