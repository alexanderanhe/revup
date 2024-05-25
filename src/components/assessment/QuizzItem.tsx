import { Question } from '@/lib/definitions';
import Section from '../templates/Section';
import { useState } from 'react';

type ItemProps = {
  q: Question,
  formState: [any, (form: any) => void],
  selected: number,
  setSelected: (selected: number) => void,
  header: JSX.Element
}

const QuizzItem = ({q, formState, selected, setSelected, header }: ItemProps) => {
  const [form, setForm] = formState;
  const { key, title, description, options, multiple, inputs }: Question = q;
  const [multipleOpts, setMultipleOpts] = useState<string[]>(multiple ? form[key]?.split(',') ?? [] : []);
  const [inputsOpts, setInputsOpts] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (multiple) {
      setForm({...form, [key]: multipleOpts.join(', ')})
    } else if (inputs) {
      console.log(inputsOpts)
      setForm({...form, [key]: Object.values(inputsOpts).join(', ')})
    }
    setSelected(selected + 1);
  }
  const handleClickMultiple = (value: string) => () => {
    setMultipleOpts((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : prev.concat(value));
  }
  const handleClickOption = (value: string) => () => {
    setForm({...form, [key]: value})
    handleNext();
  }
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsOpts({...inputsOpts, [name]: event.target.value})
  }
  return <Section title={title} header={header} buttons={
      multiple || inputs ? [
        <button
          key="next"
          onClick={handleNext}
          className="btn btn-primary w-full"
        >
          Siguiente
        </button>
      ] : []
    }>
      <p>{ description }</p>
      { options && (
        <div className="grid grid-cols-1 gap-4">
          { options.map((option, index) => 
            <button
              key={`option-${title}${index}`}
              onClick={handleClickOption(option)}
              className={`btn btn-ghost ${form[key] === option && 'btn-outline'} shadow rounded-box w-full justify-start text-left`}
            >
              { option }
            </button>
          )}
        </div>
      )}
      { multiple && (
        <div className="flex flex-wrap gap-4">
          { multiple.map((option) => 
            <button
              key={`option-${option}`}
              onClick={handleClickMultiple(option)}
              className={`btn shadow rounded ${multipleOpts?.includes(option) && 'btn-outline'}`}
            >
              { option }
            </button>
          )}
        </div>
      )}
      {inputs && inputs.map(({name, title, type, placeholder}) => 
        <label key={name} className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{title}</span>
          </div>
          <input
            type={type}
            onChange={handleChange(name)}
            placeholder={placeholder}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">(optional)</span>
          </div>
        </label>
      )}
    </Section>
}

export default QuizzItem