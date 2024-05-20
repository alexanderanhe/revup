import Section from "./Section"

type WelcomeProps = {
  handleStart: () => void
}
const Welcome = ({ handleStart }: WelcomeProps) => {

  const buttons = [
    <button
      key="start"
      type="button"
      onClick={handleStart}
      className="btn btn-primary w-full"
    >
      Comenzar
    </button>
  ]

  return (
    <Section title="Bienvenido a la evaluación de entrenamiento" buttons={buttons}>
      <>
          <p>Para poder recomendarte un programa de entrenamiento personalizado, necesitamos saber un poco más sobre ti.</p>
          <p>Por favor, responde las siguientes preguntas:</p>
      </>
    </Section>
  )
}

export default Welcome