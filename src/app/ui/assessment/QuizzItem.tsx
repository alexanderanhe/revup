import { useState } from 'react';

import Section from '@/components/templates/Section';

import { Question } from '@/lib/definitions';
import clsx from 'clsx';

type ItemProps = {
  q: Question,
  formState: [any, (form: any) => void],
  selected: number,
  setSelected: (selected: number) => void,
  header: JSX.Element,
  translations: Record<string, string>
}

const QuizzItem = ({q, formState, selected, setSelected, header, translations }: ItemProps) => {
  const [form, setForm] = formState;
  const { key, title, description, options, multiple, inputs }: Question = q;
  const [multipleOpts, setMultipleOpts] = useState<[string[], boolean]>([multiple ? form[key]?.split(',') ?? [] : [], false]);
  const [inputsOpts, setInputsOpts] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (multiple) {
      const [opts] = multipleOpts;
      setForm({...form, [key]: opts.join(', ')})
    } else if (inputs) {
      setForm({...form, [key]: Object.values(inputsOpts).join(',')})
    }
    setSelected(selected + 1);
  }
  const handleClickMultiple = (value: string, unique: boolean) => () => {
    setMultipleOpts(([prev, flag]) => {
      return [prev.includes(value) ? prev.filter((v) => v !== value)
        : (unique || flag ? [value] : prev.concat(value)), unique]
    });
  }
  const handleClickOption = (value: string) => () => {
    setForm({...form, [key]: value})
    handleNext();
  }
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsOpts({...inputsOpts, [name]: event.target.value})
  }
  return <Section title={title ?? ''} header={header} buttons={
      multiple || inputs ? [
        <button
          key="next"
          onClick={handleNext}
          className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full"
        >
          Siguiente
        </button>
      ] : []
    }>
      <p>{ description }</p>
      { options && (
        <div className="grid grid-cols-1 gap-4 w-full">
          { options.map((option: string) => 
            <button
              key={`option-${title}${option}`}
              onClick={handleClickOption(option)}
              className={clsx(
                'btn btn-ghost btn-lg shadow rounded-box w-full justify-start text-left',
                form[key] === option && 'btn-outline'
              )}
            >
              { translations[`${key}:${option}`] ?? 'X' }
            </button>
          )}
        </div>
      )}
      { multiple && (
        <div className="flex flex-wrap gap-4">
          { multiple.map(([option, unique]: [string, boolean]) => 
            <button
              key={`option-${option}`}
              onClick={handleClickMultiple(option, unique)}
              className={`btn shadow rounded ${multipleOpts[0]?.includes(option) && 'btn-outline'} uppercase`}
            >
              { translations[`${key}:${option}`] }
            </button>
          )}
        </div>
      )}
      {inputs && inputs.map(({ optional, ...props}) => 
        <label key={props.name} className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{translations[`${key}:${props.name}:title`]}</span>
          </div>
          <input
            onChange={handleChange(props.name)}
            className="input input-bordered w-full max-w-xs"
            {...props}
          />
          {optional && <div className="label">
            <span className="label-text-alt">({translations["optional"]})</span>
          </div>}
        </label>
      )}
    </Section>
}

export default QuizzItem