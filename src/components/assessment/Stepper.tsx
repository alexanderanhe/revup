import { Question } from "../../pages/Assessment"

type StepperProps = {
  steps: Question[],
  form: any,
  selected: number,
  setSelected: (selected: number) => void
}

const Stepper = ({ steps, form, selected, setSelected }: StepperProps) => {

  const handleClick = (index: number) => () => setSelected(index);
  return (
    <section className="flex items-center justify-center min-h-0 m-0">
      <ol className="flex items-center w-full">
        {steps.map(({key, title}: Question, index: number) => 
          <li
            key={`stepsheader-${index}${key}`}
            onClick={handleClick(index)}
            title={title}
            className={`flex w-full items-center [&:not(:last-child)]:after:content-[''] after:w-full after:h-1 [&:not(:last-child)]:after:border-b [&:not(:last-child)]:after:border-base-400 [&:not(:last-child)]:after:border-4 [&:not(:last-child)]:after:inline-block`}
          >
            <span className={`flex items-center justify-center w-10 h-10 ${selected === index ? 'bg-secondary' : (form[key] ? 'bg-primary' : 'bg-gray-100')} rounded-full lg:h-12 lg:w-12 shrink-0`}>
              { index + 1}
            </span>
          </li>
        )}
      </ol>
    </section>
  )
}

export default Stepper