import Image from "next/image"
import Section from "@/components/templates/Section"

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
      <div className="flex items-center justify-center w-full">
        <Image
          className="w-auto h-[50vh] rounded-full object-cover shadow-lg"
          src={'/images/trainer_pngegg.webp'}
          style={{ maskImage: "linear-gradient(black 60%, transparent)"}}
          alt="Bienvenido"
          width={400}
          height={400}
        />
      </div>
      <p>Para poder recomendarte un programa de entrenamiento personalizado, necesitamos saber un poco más sobre ti.</p>
      <p>Por favor, responde las siguientes preguntas:</p>
    </Section>
  )
}

export default Welcome