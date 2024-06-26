import { Question } from "@/lib/definitions";

type StepperProps = {
  steps: Question[],
  form: any,
  selected: number,
  setSelected: (selected: number) => void
}

const Stepper = ({ steps, form, selected, setSelected }: StepperProps) => {

  const handleClick = (index: number) => () => setSelected(index);
  return (
    <section className="flex items-center justify-center m-0">
      <ol className="flex items-center w-full">
        {steps.map(({key, title}: Question, index: number) => 
          <li
            key={`stepsheader-${index}${key}`}
            onClick={handleClick(index)}
            title={title}
            className={`flex w-full items-center [&:not(:last-child)]:after:content-[''] after:w-full after:h-1 [&:not(:last-child)]:after:border-b [&:not(:last-child)]:after:border-base-300 [&:not(:last-child)]:after:border-4 [&:not(:last-child)]:after:inline-block`}
          >
            <span className={`flex items-center justify-center size-8 text-sm ${selected === index ? 'bg-base-200 text-base-200-content font-bold' : (form[key] ? 'bg-base-300 text-base-300-content ' : 'bg-base-100 border-[1px] border-base-300')} rounded-full lg:h-12 lg:w-12 shrink-0`}>
              { index + 1}
            </span>
          </li>
        )}
      </ol>
    </section>
  )
}

export default Stepper