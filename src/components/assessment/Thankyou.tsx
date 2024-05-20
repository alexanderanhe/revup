import Link from 'next/link'
import Section from './Section'
import Image from 'next/image'

const Thankyou = () => {
  return (
    <Section title="Gracias por completar la evaluación" buttons={[
        <Link
          key={"nextConfirm"}
          href='/'
          className="btn btn-primary w-full"
        >
          Finalizar
        </Link>
      ]}>
      <p>En base a tus respuestas, te recomendamos el siguiente programa de entrenamiento:</p>
      <div className="card max-w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <Image
            width={430}
            height={253}
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
        /></figure>
        <div className="card-body [&>p]:text-white [&>h2]:text-white items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            
          </div>
        </div>
      </div>
  </Section>
  )
}

export default Thankyou